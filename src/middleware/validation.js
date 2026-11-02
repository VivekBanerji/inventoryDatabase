const validateItem = (requireAll = false) => {
    return (req, res, next) => {
        const { name, category, quantity } = req.body;

        const allowedFields = ["name", "category", "quantity"];

        const invalidFields = Object.keys(req.body).filter(
            field => !allowedFields.includes(field)
        );

        if (invalidFields.length > 0) {
            const error = new Error("Invalid fields provided");
            error.status = 400;
            return next(error);
        }

        if (requireAll) {
            if (
                !name ||
                !category ||
                quantity === undefined
            ) {
                const error = new Error(
                    "Name, category and quantity are required"
                );
                error.status = 400;
                return next(error);
            }
        } else {
            if (Object.keys(req.body).length === 0) {
                const error = new Error("Please provide data to update");
                error.status = 400;
                return next(error);
            }
        }

        if (
            name !== undefined &&
            (typeof name !== "string" || !name.trim())
        ) {
            const error = new Error("Name must be a valid string");
            error.status = 400;
            return next(error);
        }

        if (
            category !== undefined &&
            (typeof category !== "string" || !category.trim())
        ) {
            const error = new Error("Category must be a valid string");
            error.status = 400;
            return next(error);
        }

        if (
            quantity !== undefined &&
            (!Number.isInteger(quantity) || quantity < 0)
        ) {
            const error = new Error(
                "Quantity must be a non-negative integer"
            );
            error.status = 400;
            return next(error);
        }

        next();
    };
};

module.exports = validateItem;
