const Stock = require("../models/stock"); // Import the Stock model

// Function to get all stocks
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll(); // Retrieve all records from the `stocks` table
    res.json(stocks);
  } catch (err) {
    console.error("Error fetching stocks:", err); // Log detailed error message
    res.status(500).json({ error: err.message }); // Send the error message in response
  }
};

// Function to get a single stock by ID
exports.getStockById = async (req, res) => {
  const stockId = req.params.id;
  try {
    const stock = await Stock.findByPk(stockId); // Fetch a single stock by primary key
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json(stock);
  } catch (err) {
    console.error("Error fetching stock by ID:", err); // Log detailed error message
    res.status(500).json({ error: err.message }); // Send the error message in response
  }
};

// Function to create a new stock
exports.createStock = async (req, res) => {
  try {
    const newStock = await Stock.create(req.body); // Use the body data to create a new stock entry
    res.status(201).json(newStock); // Respond with the newly created stock
  } catch (err) {
    console.error("Error creating stock:", err); // Log detailed error message
    res.status(500).json({ error: err.message }); // Send the error message in response
  }
};

// Function to update an existing stock by ID
exports.updateStock = async (req, res) => {
  const stockId = req.params.id; // Get the stock ID from the URL parameters
  try {
    const stock = await Stock.findByPk(stockId); // Find the stock by primary key
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" }); // If the stock does not exist, respond with 404
    }
    await stock.update(req.body); // Update the stock with new data from the request body
    res.json(stock); // Respond with the updated stock data
  } catch (err) {
    console.error("Error updating stock:", err); // Log detailed error message
    res.status(500).json({ error: err.message }); // Send the error message in response
  }
};

// Function to delete an existing stock by ID
exports.deleteStock = async (req, res) => {
  const stockId = req.params.id; // Get the stock ID from the URL parameters
  try {
    const stock = await Stock.findByPk(stockId); // Find the stock by primary key
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" }); // If the stock does not exist, respond with 404
    }
    await stock.destroy(); // Delete the stock from the database
    res.status(204).send(); // Respond with 204 No Content to indicate successful deletion
  } catch (err) {
    console.error("Error deleting stock:", err); // Log detailed error message
    res.status(500).json({ error: err.message }); // Send the error message in response
  }
};
