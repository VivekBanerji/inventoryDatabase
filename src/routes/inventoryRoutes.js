
const express = require("express");
const router = express.Router();

const {
    addItem,
    getAllItems,
    getItemById,
    updateItem,
    patchItem,
    deleteItem,
    searchItems
} = require("../controllers/inventoryController");

const validateItem = require("../middleware/validation");


// Add item
router.post("/", validateItem(true), addItem);

// Search and filter
router.get("/search", searchItems);

// Get all items
router.get("/", getAllItems);

// Get item by ID
router.get("/:id", getItemById);

// Update complete item
router.put("/:id", validateItem(true), updateItem);

// Update partial item
router.patch("/:id", validateItem(false), patchItem);

// Delete item
router.delete("/:id", deleteItem);


module.exports = router;
