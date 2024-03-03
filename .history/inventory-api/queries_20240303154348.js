
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventory",
  password: "1234",
  port: 5432,
});



// Function to get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const query = "SELECT * FROM inventory";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory items: " + error.message });
  }
};

// Function to get an inventory item by ID
const getInventoryById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const query = "SELECT * FROM inventory WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory item: " + error.message });
  }
};

// Function to create a new inventory item
const createInventoryItem = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const query = "INSERT INTO inventory (name, price, quantity) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await pool.query(query, [name, price, quantity]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error creating inventory item: " + error.message });
  }
};

// Function to update an existing inventory item
const updateInventoryItem = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, quantity } = req.body;
  try {
    const query = "UPDATE inventory SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *";
    const { rows } = await pool.query(query, [name, price, quantity, id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating inventory item: " + error.message });
  }
};

// Function to delete an existing inventory item
const deleteInventoryItem = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const query = "DELETE FROM inventory WHERE id = $1";
    await pool.query(query, [id]);
    res.json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting inventory item: " + error.message });
  }
};


//imports
module.exports = {

  getAllInventory,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
