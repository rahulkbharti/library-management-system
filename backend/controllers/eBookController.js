import EBooksModel from '../models/eBookModel.js';
import db from '../config/db.js';

const ebooksModel = new EBooksModel(db);

export default class EBooksController {
    static async createEBook(req, res) {
        const { title, author, file_path, department_id } = req.body;

        try {
            const result = await ebooksModel.createEBook({ title, author, file_path, department_id });

            if (result.success) {
                return res.status(201).json({ message: 'EBook created successfully', ebookId: result.ebookId });
            }

            res.status(500).json({ message: 'Failed to create eBook', error: result.error });
        } catch (error) {
            console.error('Error in createEBook:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllEBooks(req, res) {
        try {
            const result = await ebooksModel.getAllEBooks();

            if (result.success) {
                return res.status(200).json(result.ebooks);
            }

            res.status(500).json({ message: 'Failed to fetch eBooks', error: result.error });
        } catch (error) {
            console.error('Error in getAllEBooks:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getEBookById(req, res) {
        const { ebook_id } = req.params;

        try {
            const result = await ebooksModel.getEBookById(ebook_id);

            if (result.success) {
                return res.status(200).json(result.ebook);
            }

            res.status(404).json({ message: 'EBook not found', error: result.error });
        } catch (error) {
            console.error('Error in getEBookById:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateEBook(req, res) {
        const { ebook_id } = req.params;
        const updates = req.body;

        try {
            const result = await ebooksModel.updateEBook(ebook_id, updates);

            if (result.success) {
                return res.status(200).json({ message: 'EBook updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update eBook', error: result.error });
        } catch (error) {
            console.error('Error in updateEBook:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteEBook(req, res) {
        const { ebook_id } = req.params;

        try {
            const result = await ebooksModel.deleteEBook(ebook_id);

            if (result.success) {
                return res.status(200).json({ message: 'EBook deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete eBook', error: result.error });
        } catch (error) {
            console.error('Error in deleteEBook:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
