import express from 'express';
import BookCopiesController from '../controllers/bookCopyController.js';

const router = express.Router();

// Routes for book copies
router.post('/', BookCopiesController.createCopy);
router.get('/', BookCopiesController.getAllCopies);
router.get('/book/:book_id', BookCopiesController.getCopiesByBookId);
router.put('/:copy_id', BookCopiesController.updateCopyStatus);
router.delete('/:copy_id', BookCopiesController.deleteCopy);

export default router;
