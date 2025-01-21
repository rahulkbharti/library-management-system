import express from 'express';
import BooksCopies from '../../controllers/books/books_copies_controllers.js'; // Assuming the controller is in the specified path
import db from '../../config/db.js'; // Assuming the database connection is exported from here

const router = express.Router();
const booksCopiesController = new BooksCopies(db);

// Middleware for authentication (if required)
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        return next();
    } else {
        res.status(401).json({
            error: "Unauthorized Access",
            message: "You need to log in to access this route",
            statusCode: 401,
        });
    }
};

// Route to get all book copies
router.get('/', async (req, res) => {
    const result = await booksCopiesController.getAllCopies();
    if (result.success === false) {
        res.status(500).json(result);
    } else {
        res.status(200).json(result);
    }
});

// Route to get a specific copy by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await booksCopiesController.getCopyById(id);
    if (result.success === false) {
        res.status(404).json(result);
    } else {
        res.status(200).json(result);
    }
});

// Route to add a new book copy
router.post('/create', isAuthenticated, async (req, res) => {
    const copyData = req.body;
    const result = await booksCopiesController.addCopy(copyData);
    if (result.success === false) {
        res.status(500).json(result);
    } else {
        res.status(201).json(result);
    }
});

// Route to update a book copy by ID
router.put('/update/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const copyData = req.body;
    const result = await booksCopiesController.updateCopy(id, copyData);
    if (result.success === false) {
        res.status(404).json(result);
    } else {
        res.status(200).json(result);
    }
});

// Route to delete a book copy by ID
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const result = await booksCopiesController.deleteCopy(id);
    if (result.success === false) {
        res.status(404).json(result);
    } else {
        res.status(200).json(result);
    }
});

export default router;
