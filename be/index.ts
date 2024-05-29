import express, { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

const app = express();
app.use(express.json());

// User APIs
app.get("/users", (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Robert Johnson", email: "robert.johnson@example.com" },
    { id: 4, name: "Michael Brown", email: "michael.brown@example.com" },
    { id: 5, name: "Emily Davis", email: "emily.davis@example.com" },
    { id: 6, name: "Sarah Miller", email: "sarah.miller@example.com" },
    { id: 7, name: "Jessica Wilson", email: "jessica.wilson@example.com" },
    { id: 8, name: "Thomas Moore", email: "thomas.moore@example.com" },
    { id: 9, name: "Daniel Taylor", email: "daniel.taylor@example.com" },
    { id: 10, name: "Susan Anderson", email: "susan.anderson@example.com" },
  ];
  res.json(users);
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
