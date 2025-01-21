import express from 'express';
import BooksController from '../controllers/bookController.js';

const router = express.Router();

// Routes for books
router.post('/', BooksController.createBook);
router.get('/', BooksController.getAllBooks);
router.get('/:bookId', BooksController.getBookById);
router.put('/:bookId', BooksController.updateBook);
router.delete('/:bookId', BooksController.deleteBook);

export default router;
