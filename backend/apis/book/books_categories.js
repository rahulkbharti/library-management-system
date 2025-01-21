import express from 'express';
import BooksCategories from '../../controllers/books/books_categories_controllers.js'; // Assuming the controller is in the specified path
import db from '../../config/db.js'; // Assuming the database connection is exported from here

const router = express.Router();
const booksCategoriesController = new BooksCategories(db);

// Middleware for authentication (if required)
const isAuthenticated = (req, res, next) => {
    if (true) {
        return next();
    } else {
        res.status(401).json({
            error: "Unauthorized Access",
            message: "You need to log in to access this route",
            statusCode: 401,
        });
    }
};

// Route to get all categories
router.get('/', async (req, res) => {
    const result = await booksCategoriesController.getAllCategories();
    if (result.success === false) {
        delete result.success;
        res.status(400).json({ statusCode: 400, ...result });
    } else {
        res.status(200).json({ statusCode: 200, message: "Success", data: result });
    }
});

// Route to get a specific category by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await booksCategoriesController.getCategoryById(id);
    if (result.success === false) {
        delete result.success;
        res.status(404).json({ statusCode: 404, ...result });
    } else {
        res.status(200).json({ statusCode: 200, message: "Success", data: result });
    }
});

// Route to add a new category
router.post('/create', isAuthenticated, async (req, res) => {
    const categoryData = req.body;
    const result = await booksCategoriesController.addCategory(categoryData);
    if (result.success === false) {
        delete result.success;
        res.status(400).json({ statusCode: 400, ...result });
    } else {
        delete result.success;
        res.status(201).json({ statusCode: 201, ...result });
    }
});

// Route to update a category by ID
router.put('/update/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const categoryData = req.body;
    const result = await booksCategoriesController.updateCategory(id, categoryData);
    if (result.success === false) {
        delete result.success;
        res.status(400).json({ statusCode: 400, ...result });
    } else {
        delete result.success;
        res.status(201).json({ statusCode: 201, ...result });
    }
});

// Route to delete a category by ID
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const result = await booksCategoriesController.deleteCategory(id);
    if (result.success === false) {
        delete result.success;
        res.status(400).json({ statusCode: 400, ...result });
    } else {
        delete result.success;
        res.status(201).json({ statusCode: 201, ...result });
    }
});

export default router;
