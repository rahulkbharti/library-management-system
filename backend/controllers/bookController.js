import BooksModel from '../models/bookModel.js';
import db from '../config/db.js';

const booksModel = new BooksModel(db);

export default class BooksController {
    static async createBook(req, res) {
        const { title, author, publisher, isbn, department_id, language } = req.body;

        try {
            const result = await booksModel.createBook({ title, author, publisher, isbn, department_id, language });

            if (result.success) {
                return res.status(201).json({ message: 'Book created successfully', bookId: result.bookId });
            }

            res.status(500).json({ message: 'Failed to create book', error: result.error });
        } catch (error) {
            console.error('Error in createBook:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllBooks(req, res) {
        try {
            const result = await booksModel.getAllBooks();

            if (result.success) {
                return res.status(200).json(result.books);
            }

            res.status(500).json({ message: 'Failed to fetch books', error: result.error });
        } catch (error) {
            console.error('Error in getAllBooks:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getBookById(req, res) {
        const { bookId } = req.params;

        try {
            const result = await booksModel.getBookById(bookId);

            if (result.success) {
                if (result.book) {
                    return res.status(200).json(result.book);
                }
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(500).json({ message: 'Failed to fetch book', error: result.error });
        } catch (error) {
            console.error('Error in getBookById:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateBook(req, res) {
        const { bookId } = req.params;
        const updates = req.body;

        try {
            const result = await booksModel.updateBook(bookId, updates);

            if (result.success) {
                return res.status(200).json({ message: 'Book updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update book', error: result.error });
        } catch (error) {
            console.error('Error in updateBook:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteBook(req, res) {
        const { bookId } = req.params;

        try {
            const result = await booksModel.deleteBook(bookId);

            if (result.success) {
                return res.status(200).json({ message: 'Book deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete book', error: result.error });
        } catch (error) {
            console.error('Error in deleteBook:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
