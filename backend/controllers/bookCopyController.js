import BookCopiesModel from '../models/bookCopiesModel.js';
import db from '../config/db.js';

const bookCopiesModel = new BookCopiesModel(db);

export default class BookCopiesController {
    static async createCopy(req, res) {
        const { book_id, status } = req.body;

        try {
            const result = await bookCopiesModel.createCopy(book_id, status || 'available');

            if (result.success) {
                return res.status(201).json({ message: 'Book copy created successfully', copyId: result.copyId });
            }

            res.status(500).json({ message: 'Failed to create book copy', error: result.error });
        } catch (error) {
            console.error('Error in createCopy:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllCopies(req, res) {
        try {
            const result = await bookCopiesModel.getAllCopies();

            if (result.success) {
                return res.status(200).json(result.copies);
            }

            res.status(500).json({ message: 'Failed to fetch book copies', error: result.error });
        } catch (error) {
            console.error('Error in getAllCopies:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getCopiesByBookId(req, res) {
        const { book_id } = req.params;

        try {
            const result = await bookCopiesModel.getCopiesByBookId(book_id);

            if (result.success) {
                return res.status(200).json(result.copies);
            }

            res.status(500).json({ message: 'Failed to fetch copies for the book', error: result.error });
        } catch (error) {
            console.error('Error in getCopiesByBookId:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateCopyStatus(req, res) {
        const { copy_id } = req.params;
        const { status } = req.body;

        try {
            const result = await bookCopiesModel.updateCopyStatus(copy_id, status);

            if (result.success) {
                return res.status(200).json({ message: 'Book copy status updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update book copy status', error: result.error });
        } catch (error) {
            console.error('Error in updateCopyStatus:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteCopy(req, res) {
        const { copy_id } = req.params;

        try {
            const result = await bookCopiesModel.deleteCopy(copy_id);

            if (result.success) {
                return res.status(200).json({ message: 'Book copy deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete book copy', error: result.error });
        } catch (error) {
            console.error('Error in deleteCopy:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
