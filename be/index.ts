import { open, Database } from "sqlite";
import express, { Request, Response } from "express";
import * as sqlite3 from "sqlite3";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";
interface User {
  GUID: number;
  name: string;
  email: string;
}

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
    return res.status(400).json({ error: "Request missing FullName or PicturePath." });
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
  }
});
app.get("/users/:guid", (req: Request, res: Response) => {
  // Fetch a specific user
});
app.put("/users/:guid", (req: Request, res: Response) => {
  // Update a specific user
});
app.delete("/users/:guid", (req: Request, res: Response) => {
  // Delete a specific user
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

app.listen(3080, () => console.log("Server running on port 3080"));
