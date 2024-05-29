import { open, Database } from "sqlite";
import express, { Request, Response } from "express";
import * as sqlite3 from "sqlite3";
interface User {
  id: number;
  name: string;
  email: string;
}

// Open the database
const dbPath = "./be/sqlite/data.db";
let db: Database;
open({
  filename: dbPath,
  driver: sqlite3.Database,
}).then((database) => {
  db = database;
  console.log("Connected to the users database.");
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
app.post("/users", (req: Request, res: Response) => {
  // Add a new user
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
app.get("/roles", (req: Request, res: Response) => {
  // Fetch all roles
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

//  Application APIs
app.get("/applications", (req: Request, res: Response) => {
  // Fetch all applications
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
