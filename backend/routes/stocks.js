const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

// GET all stocks
router.get("/", stockController.getAllStocks);

// GET a single stock by ID
router.get("/:id", stockController.getStockById);

// POST a new stock
router.post("/", stockController.createStock);

// PUT (or PATCH) to update an existing stock by ID
router.put("/:id", stockController.updateStock);

// DELETE an existing stock by ID
router.delete("/:id", stockController.deleteStock);

module.exports = router;
