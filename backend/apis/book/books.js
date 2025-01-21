import express from 'express';

import bookCopies from "./books_copies.js";
import bookCategories from "./books_categories.js";

// import test from "./tes.js"

import BooksControllers from '../../controllers/books/books_controllers.js';
import db from '../../config/db.js'; // Assuming your DB connection is in this path

const router = express.Router();
const booksController = new BooksControllers(db);

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (true) {
        return next();
    } else {
        return res.status(401).json({
            error: "Unauthorized Access",
            message: "You need to log in with admin credentials to access this route"
        });
    }
};


// Fetch all books
router.get("/", async (req, res) => {
    try {
        const result = await booksController.getAllBooks();
        if (!result.length) {
            return res.status(404).json({
                error: "No Books Found",
                message: "There are no books available in the database",
                statusCode: 404
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: "Books fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while fetching books",
            details: error.message,
            statusCode: 500
        });
    }
});

// Fetch a single book by ID
router.get("/get/:id", async (req, res) => {
    const { id } = req.params;
    // console.log("get Id", id);
    try {
        const result = await booksController.getBookById(id);

        if (!result) {
            return res.status(404).json({
                error: "Book Not Found",
                message: `No book found with ID: ${id}`,
                statusCode: 404
            });
        }
        if (result.success == false) {
            return res.status(404).json({
                statusCode: 404,
                error: result.error,
                message: result.message
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: "Book fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while fetching the book",
            details: error.message,
            statusCode: 500
        });
    }
});

// Create a new book (Admin only)
router.post("/create", isAuthenticated, async (req, res) => {
    const bookData = req.body;
    try {
        const result = await booksController.createBook(bookData);

        if (result.success == false) {
            return res.status(400).json({
                statusCode: 400,
                error: result.error,
                message: result.message
            });
        }
        delete result.success;

        res.status(201).json({ statusCode: 201, ...result });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while creating the book",
            details: error.message,
            statusCode: 500
        });
    }
});

// Update an existing book (Admin only)
router.put("/update/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const bookData = req.body;
    try {
        const result = await booksController.updateBook(id, bookData);
        if (!result) {
            return res.status(404).json({
                error: "Book Not Found",
                message: `No book found with ID: ${id}`,
                statusCode: 404
            });
        }
        if (result.success == false) {
            return res.status(400).json({
                statusCode: 400,
                error: result.error,
                message: result.message
            });
        }
        delete result.success;

        res.status(201).json({ statusCode: 201, ...result });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while updating the book",
            details: error.message,
            statusCode: 500
        });
    }
});

// Delete a book (Admin only)
router.delete("/delete/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await booksController.deleteBook(id);
        if (!result) {
            return res.status(404).json({
                error: "Book Not Found",
                message: `No book found with ID: ${id}`,
                statusCode: 404
            });
        }
        if (result.success == false) {
            return res.status(400).json({
                statusCode: 400,
                error: result.error,
                message: result.message
            });
        }
        delete result.success;

        res.status(201).json({ statusCode: 201, ...result });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while deleting the book",
            details: error.message,
            statusCode: 500
        });
    }
});

// Nested Routes 
router.use("/categories", bookCategories);
router.use("/copies", bookCopies);

export default router;
