import { open, Database } from "sqlite";
import express, { Request, Response } from "express";
import * as sqlite3 from "sqlite3";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import fs from 'fs';
import cors from 'cors';
import { User, Role, App } from "../common";

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Open the database
const dbPath = "./be/sqlite/data.db";
if (!existsSync(dbPath)) {
  throw new Error(
    `Database file not found at "${dbPath}". Please run 'yarn seed' to create.`
  );
}

let db: Database;
open({
  filename: dbPath,
  driver: sqlite3.Database,
}).then((database) => {
  db = database;
  console.log("Connected to the sqlite database.");
});

const app = express();
app.use(cors());
app.use(express.json());

// User APIs
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users: User[] = await db.all("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

app.post("/users", async (req: Request, res: Response) => {
  const { FullName, PicturePath } = req.body;

  if (!FullName || !PicturePath) {
    return res
      .status(400)
      .json({ error: "Request missing FullName or PicturePath." });
  }

  try {
    const sql = `INSERT INTO users (GUID, FullName, PicturePath) VALUES (?, ?, ?)`;
    await db.run(sql, [uuidv4(), FullName, PicturePath]);
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
      // TODO: for simplicity GUID collision is not handled.
  }
});

app.get("/users/:guid", async (req: Request, res: Response) => {
  const { guid } = req.params;

  if (!guid) {
    return res.status(400).json({ error: "Request missing user GUID." });
  }

  try {
    const sql = "SELECT * FROM users WHERE GUID = ?";
    const user = await db.get(sql, [guid]);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
});

app.put("/users/:guid", async (req: Request, res: Response) => {
  const { guid } = req.params;
  const { FullName, PicturePath } = req.body;

  console.log(req.body);

  if (!guid || !FullName || !PicturePath) {
    return res
      .status(400)
      .json({ error: "Request missing user GUID or update fields." });
  }

  try {
    const sql = "UPDATE users SET FullName = ?, PicturePath = ? WHERE GUID = ?";
    await db.run(sql, [FullName, PicturePath, guid]);

    res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});

app.delete("/users/:guid", async (req: Request, res: Response) => {
  const { guid } = req.params;

  if (!guid) {
    return res.status(400).json({ error: "Request missing user GUID." });
  }

  try {
    const user = await db.get("SELECT * FROM users WHERE GUID = ?", [guid]);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const sql = "DELETE FROM users WHERE GUID = ?";
    await db.run(sql, [guid]);

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
});

//  Role APIs
app.get("/roles", async (req: Request, res: Response) => {
  try {
    const users: User[] = await db.all("SELECT * FROM roles");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching roles." });
  }
});
app.post("/roles", (req: Request, res: Response) => {
  // Add a new role
});
app.get("/roles/:guid", (req: Request, res: Response) => {
  // Fetch a specific role
});
app.put("/roles/:guid", (req: Request, res: Response) => {
  // Update a specific role
});
app.delete("/roles/:guid", (req: Request, res: Response) => {
  // Delete a specific role
});

//  App APIs
app.get("/apps", async (req: Request, res: Response) => {
  try {
    const users: User[] = await db.all("SELECT * FROM apps");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching apps." });
  }
});
app.post("/applications", (req: Request, res: Response) => {
  // Add a new application
});
app.get("/applications/:guid", (req: Request, res: Response) => {
  // Fetch a specific application
});
app.put("/applications/:guid", (req: Request, res: Response) => {
  // Update a specific application
});
app.delete("/applications/:guid", (req: Request, res: Response) => {
  // Delete a specific application
});

app.listen(config.port.be, () => console.log(`Server running on port ${config.port.be}`));
