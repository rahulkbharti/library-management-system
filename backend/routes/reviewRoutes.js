import express from 'express';
import ReviewsController from '../controllers/reviewController.js';

const router = express.Router();

// Routes for reviews
router.post('/', ReviewsController.createReview);
router.get('/', ReviewsController.getAllReviews);
router.get('/book/:book_id', ReviewsController.getReviewsByBook);
router.put('/:review_id', ReviewsController.updateReview);
router.delete('/:review_id', ReviewsController.deleteReview);

export default router;
