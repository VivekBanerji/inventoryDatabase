const { inventory, getNextId } = require("../model/inventoryData");

// POST - Add new item
const addItem = (req, res) => {
    const { name, category, quantity } = req.body;

    const newItem = {
        id: getNextId(),
        name,
        category,
        quantity
    };

    inventory.push(newItem);

    res.status(201).json({
        message: "Item added successfully",
        item: newItem
    });
};


// GET - Get all items
const getAllItems = (req, res) => {
    res.json({
        message: "Inventory list",
        items: inventory
    });
};


// GET - Get item by ID
const getItemById = (req, res, next) => {
    const id = Number(req.params.id);

    const item = inventory.find(item => item.id === id);

    if (!item) {
        const error = new Error("Item not found");
        error.status = 404;
        return next(error);
    }

    res.json({
        message: "Item found",
        item
    });
};


// PUT - Update complete item
const updateItem = (req, res, next) => {
    const id = Number(req.params.id);

    const index = inventory.findIndex(item => item.id === id);

    if (index === -1) {
        const error = new Error("Item not found");
        error.status = 404;
        return next(error);
    }

    inventory[index] = {
        id,
        ...req.body
    };

    res.json({
        message: "Item updated successfully",
        item: inventory[index]
    });
};


// PATCH - Update partial item
const patchItem = (req, res, next) => {
    const id = Number(req.params.id);

    const item = inventory.find(item => item.id === id);

    if (!item) {
        const error = new Error("Item not found");
        error.status = 404;
        return next(error);
    }

    Object.assign(item, req.body);

    res.json({
        message: "Item partially updated",
        item
    });
};


// DELETE - Delete item
const deleteItem = (req, res, next) => {
    const id = Number(req.params.id);

    const index = inventory.findIndex(item => item.id === id);

    if (index === -1) {
        const error = new Error("Item not found");
        error.status = 404;
        return next(error);
    }

    const deletedItem = inventory.splice(index, 1);

    res.json({
        message: "Item deleted successfully",
        item: deletedItem[0]
    });
};


// GET - Search and filter items
const searchItems = (req, res) => {
    let result = [...inventory];

    const { name, category, minQuantity, maxQuantity } = req.query;

    if (name) {
        result = result.filter(item =>
            item.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (category) {
        result = result.filter(item =>
            item.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (minQuantity !== undefined) {
        result = result.filter(item =>
            item.quantity >= Number(minQuantity)
        );
    }

    if (maxQuantity !== undefined) {
        result = result.filter(item =>
            item.quantity <= Number(maxQuantity)
        );
    }

    res.json({
        message: "Search results",
        items: result
    });
};


module.exports = {
    addItem,
    getAllItems,
    getItemById,
    updateItem,
    patchItem,
    deleteItem,
    searchItems
};
