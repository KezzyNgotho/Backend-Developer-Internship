const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventory",
  password: "1234",
  port: 5432,
});

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Authorization middleware
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};

// Validation middleware
const validateInput = (req, res, next) => {
  if (req.path.startsWith("/inventory") && req.method !== "GET") {
    const requiredFields = ["name", "price", "quantity"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
  }
  next();
};

// Login route to get JWT token (for demonstration purposes only, replace with real authentication)
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Replace this with real authentication logic (e.g., querying user from database)
    const hashedPassword = await bcrypt.hash("password", 10);
    if (username === "admin" && bcrypt.compareSync(password, hashedPassword)) {
      const token = jwt.sign({ username: "admin", role: "admin" }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get all inventory items
const getAllInventory = async () => {
  try {
    const query = "SELECT * FROM inventory";
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error("Error fetching inventory items: " + error.message);
  }
};

// Function to get an inventory item by ID
const getInventoryById = async (id) => {
  try {
    const query = "SELECT * FROM inventory WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error("Error fetching inventory item: " + error.message);
  }
};

// Function to create a new inventory item
const createInventoryItem = async (name, price, quantity) => {
  try {
    const query = "INSERT INTO inventory (name, price, quantity) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await pool.query(query, [name, price, quantity]);
    return rows[0];
  } catch (error) {
    throw new Error("Error creating inventory item: " + error.message);
  }
};

// Function to update an existing inventory item
const updateInventoryItem = async (id, name, price, quantity) => {
  try {
    const query = "UPDATE inventory SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *";
    const { rows } = await pool.query(query, [name, price, quantity, id]);
    return rows[0];
  } catch (error) {
    throw new Error("Error updating inventory item: " + error.message);
  }
};

// Function to delete an existing inventory item
const deleteInventoryItem = async (id) => {
  try {
    const query = "DELETE FROM inventory WHERE id = $1";
    await pool.query(query, [id]);
    return { message: "Inventory item deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting inventory item: " + error.message);
  }
};

module.exports = {
  authenticateJWT,
  authorizeAdmin,
  errorHandler,
  validateInput,
  login,
  getAllInventory,
  updateInventoryItem,
  createInventoryItem,
  getInventoryById,
  deleteInventoryItem
};
