import { open, Database } from "sqlite";
import express, { Request, Response } from "express";
import * as sqlite3 from "sqlite3";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import cors from "cors";
import { User, Role, App, UserRole, RoleApp } from "../common";

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

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
  console.log("Connected to the sqlite database");
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

    const sqlUserRole = "DELETE FROM user_role WHERE UserGUID = ?";
    await db.run(sqlUserRole, [guid]);

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
app.delete("/roles/:guid", async (req: Request, res: Response) => {
  const { guid } = req.params;

  if (!guid) {
    return res.status(400).json({ error: "Request missing role GUID." });
  }

  try {
    const role = await db.get("SELECT * FROM roles WHERE GUID = ?", [guid]);

    if (!role) {
      return res.status(404).json({ error: "Role not found." });
    }

    const sqlUserRole = "DELETE FROM user_role WHERE RoleGUID = ?";
    await db.run(sqlUserRole, [guid]);

    const sqlRoleApp = "DELETE FROM role_app WHERE RoleGUID = ?";
    await db.run(sqlRoleApp, [guid]);

    const sql = "DELETE FROM roles WHERE GUID = ?";
    await db.run(sql, [guid]);

    res.status(200).json({ message: "Role deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the role." });
  }
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

app.post("/apps", (req: Request, res: Response) => {
  // Add a new application
});

app.get("/apps/:guid", (req: Request, res: Response) => {
  // Fetch a specific application
});

app.put("/apps/:guid", (req: Request, res: Response) => {
  // Update a specific application
});

app.delete("/apps/:guid", async (req: Request, res: Response) => {
  const { guid } = req.params;

  if (!guid) {
    return res.status(400).json({ error: "Request missing app GUID." });
  }

  try {
    const app = await db.get("SELECT * FROM apps WHERE GUID = ?", [guid]);

    if (!app) {
      return res.status(404).json({ error: "App not found." });
    }

    const sqlRoleApp = "DELETE FROM role_app WHERE AppGUID = ?";
    await db.run(sqlRoleApp, [guid]);

    const sql = "DELETE FROM apps WHERE GUID = ?";
    await db.run(sql, [guid]);

    res.status(200).json({ message: "App deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the app." });
  }
});

//  User Role Pairs APIs
app.get("/user_role", async (req: Request, res: Response) => {
  try {
    const userRoles: UserRole[] = await db.all("SELECT * FROM User_Role");
    res.json(userRoles);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user-role pairs." });
  }
});

app.post("/user_role", async (req: Request, res: Response) => {
  const userRolePairs: UserRole[] = req.body;

  let successfulInserts = 0;

  for (const pair of userRolePairs) {
    const result = await db.run(
      `INSERT OR IGNORE INTO User_Role (UserGUID, RoleGUID) VALUES (?, ?)`,
      [pair.UserGUID, pair.RoleGUID]
    );
    if (result && result.changes !== undefined && result.changes > 0) {
      successfulInserts++;
    }
  }
  res.json({ successfulInserts });
});

app.delete("/user_role", async (req: Request, res: Response) => {
  const { UserGUID, RoleGUID } = req.body;

  if (!UserGUID || !RoleGUID) {
    return res
      .status(400)
      .json({ error: "Request missing UserGUID or RoleGUID." });
  }

  try {
    const userRole = await db.get(
      "SELECT * FROM User_Role WHERE UserGUID = ? AND RoleGUID = ?",
      [UserGUID, RoleGUID]
    );

    if (!userRole) {
      return res.status(404).json({ error: "User-Role pair not found." });
    }

    const sql = "DELETE FROM User_Role WHERE UserGUID = ? AND RoleGUID = ?";
    await db.run(sql, [UserGUID, RoleGUID]);

    res.status(200).json({ message: "User-Role pair deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user-role pair." });
  }
});

//  Role App Pairs APIs
app.get("/role_app", async (req: Request, res: Response) => {
  try {
    const roleApp: RoleApp[] = await db.all("SELECT * FROM Role_App");
    res.json(roleApp);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching role-app pairs." });
  }
});

app.delete("/role_app", async (req: Request, res: Response) => {
  const { RoleGUID, AppGUID } = req.body;

  if (!RoleGUID || !AppGUID) {
    return res
      .status(400)
      .json({ error: "Request missing RoleGUID or AppGUID." });
  }

  try {
    const roleApp = await db.get(
      "SELECT * FROM Role_App WHERE RoleGUID = ? AND AppGUID = ?",
      [RoleGUID, AppGUID]
    );

    if (!roleApp) {
      return res.status(404).json({ error: "Role-App pair not found." });
    }

    const sql = "DELETE FROM Role_App WHERE RoleGUID = ? AND AppGUID = ?";
    await db.run(sql, [RoleGUID, AppGUID]);

    res.status(200).json({ message: "Role-App pair deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the role-app pair." });
  }
});

app.post("/role_app", async (req: Request, res: Response) => {
  const roleAppPairs: RoleApp[] = req.body;

  let successfulInserts = 0;

  for (const pair of roleAppPairs) {
    const result = await db.run(
      `INSERT OR IGNORE INTO Role_App (RoleGUID, AppGUID) VALUES (?, ?)`,
      [pair.RoleGUID, pair.AppGUID]
    );
    if (result && result.changes !== undefined && result.changes > 0) {
      successfulInserts++;
    }
  }
  res.json({ successfulInserts });
});

app.listen(config.port.be, () =>
  console.log(`Server running on port ${config.port.be}`)
);
