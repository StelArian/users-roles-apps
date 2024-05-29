import express from "express";
const app = express();
app.use(express.json());

//  User APIs
app.get("/users", (req, res) => {
  // Fetch all users
});
app.post("/users", (req, res) => {
  // Add a new user
});
app.get("/users/:guid", (req, res) => {
  // Fetch a specific user
});
app.put("/users/:guid", (req, res) => {
  // Update a specific user
});
app.delete("/users/:guid", (req, res) => {
  // Delete a specific user
});

//  Role APIs
app.get("/roles", (req, res) => {
  // Fetch all roles
});
app.post("/roles", (req, res) => {
  // Add a new role
});
app.get("/roles/:guid", (req, res) => {
  // Fetch a specific role
});
app.put("/roles/:guid", (req, res) => {
  // Update a specific role
});
app.delete("/roles/:guid", (req, res) => {
  // Delete a specific role
});

//  Application APIs
app.get("/applications", (req, res) => {
  // Fetch all applications
});
app.post("/applications", (req, res) => {
  // Add a new application
});
app.get("/applications/:guid", (req, res) => {
  // Fetch a specific application
});
app.put("/applications/:guid", (req, res) => {
  // Update a specific application
});
app.delete("/applications/:guid", (req, res) => {
  // Delete a specific application
});

app.listen(3000, () => console.log("Server running on port 3000"));
