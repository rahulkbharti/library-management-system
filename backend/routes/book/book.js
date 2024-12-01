import express from 'express';
import db from '../../config/db.js';
import BookModel from '../../models/book/book_model.js';
import book_categories from './book_category.js';
import book_copies from './book_copy.js';

const router = express.Router();
const bookModel = new BookModel(db);

router.get('/getAllBooks', async (req, res) => {
    const books = await bookModel.getAllBooks();
    res.json({ message: 'All books', list: books });
});

// authenticated user and user is admin can access this
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.type === 'admin') {
        // User is authenticated, proceed to the next middleware or routes
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
        res.json({ message: 'Bad Credentials', code: 401 }); // You can redirect to a login page, for example
    }
};

router.post('/addBook', async (req, res) => {
    const { book_id, title, author, isbn, identifier, category_id } = req.body;

    if (!book_id || !title || !author || !isbn || !identifier || !category_id) {
        return res.status(400).json({ error: 'All fields are required', required_fields: ['book_id', 'title', 'author', 'isbn', 'identifier', 'category_id'] });
    }

    try {
        const book = await bookModel.addBook(book_id, title, author, isbn, identifier, category_id);
        if (book.error) {
            return res.status(400).json({ error: book.error });
        }
        res.json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add the book', error });
    }
});

router.get('/getBook', async (req, res) => {
    const { book_id } = req.query; // Accessing the book_id from query parameters

    if (!book_id) {
        return res.status(400).json({ error: 'book_id is required' });
    }

    try {
        const book = await bookModel.getBook(book_id);
        res.json({ message: 'Got book', book });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve the book' });
    }
});

router.put('/updateBook', async (req, res) => {
    const { book_id, title, author, isbn, identifier, category_id } = req.body;

    if (!book_id || !title || !author || !isbn || !identifier || !category_id) {
        return res.status(400).json({ error: 'All fields are required', required_fields: ['book_id', 'title', 'author', 'isbn', 'identifier', 'category_id'] });
    }

    try {
        const book = await bookModel.updateBook(book_id, title, author, isbn, identifier, category_id);
        if (book.error) {
            return res.status(400).json({ error: book.error });
        }
        res.json({ message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the book', error });
    }
});

router.delete('/deleteBook', async (req, res) => {
    const { book_id } = req.body;

    if (!book_id) {
        return res.status(400).json({ error: 'book_id is required' });
    }

    const book = await bookModel.getBook(book_id);
    // console.log("Deleting", book);
    if (book.issued === 1) {
        return res.status(400).json({ error: 'Book is issued, cannot delete' });
    }
    try {
        const book = await bookModel.deleteBook(book_id);
        if (book.error) {
            return res.status(400).json({ error: book.error });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the book', error });
    }
});


router.post('/getBookByTitle', async (req, res) => {
    const { book_title } = req.body;
    const books = await bookModel.getBookByTitle(book_title);
    res.json({ message: 'goted books', books });
});

// using the categories and copy
router.use('/categories', book_categories);
router.use('/copies', book_copies);

export default router;
