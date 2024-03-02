const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllInventory,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("./queries"); // Import database queries

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// Define routes using imported database query functions
app.get("/inventory",  getAllInventory);
app.get("/inventory/:id",  getInventoryById);
app.post("/inventory",  createInventoryItem);
app.put("/inventory/:id", updateInventoryItem);
app.delete("/inventory/:id",  deleteInventoryItem);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
