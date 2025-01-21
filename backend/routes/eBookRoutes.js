import express from 'express';
import EBooksController from '../controllers/eBookController.js';

const router = express.Router();

// Routes for eBooks
router.post('/', EBooksController.createEBook);
router.get('/', EBooksController.getAllEBooks);
router.get('/:ebook_id', EBooksController.getEBookById);
router.put('/:ebook_id', EBooksController.updateEBook);
router.delete('/:ebook_id', EBooksController.deleteEBook);

export default router;
