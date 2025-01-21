import ReviewsModel from '../models/reviewModel.js';
import db from '../config/db.js';

const reviewsModel = new ReviewsModel(db);

export default class ReviewsController {
    static async createReview(req, res) {
        const { user_id, book_id, rating, review_text } = req.body;

        try {
            const result = await reviewsModel.createReview({ user_id, book_id, rating, review_text });

            if (result.success) {
                return res.status(201).json({ message: 'Review created successfully', reviewId: result.reviewId });
            }

            res.status(500).json({ message: 'Failed to create review', error: result.error });
        } catch (error) {
            console.error('Error in createReview:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllReviews(req, res) {
        try {
            const result = await reviewsModel.getAllReviews();

            if (result.success) {
                return res.status(200).json(result.reviews);
            }

            res.status(500).json({ message: 'Failed to fetch reviews', error: result.error });
        } catch (error) {
            console.error('Error in getAllReviews:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getReviewsByBook(req, res) {
        const { book_id } = req.params;

        try {
            const result = await reviewsModel.getReviewsByBook(book_id);

            if (result.success) {
                return res.status(200).json(result.reviews);
            }

            res.status(500).json({ message: 'Failed to fetch reviews for the book', error: result.error });
        } catch (error) {
            console.error('Error in getReviewsByBook:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateReview(req, res) {
        const { review_id } = req.params;
        const updates = req.body;

        try {
            const result = await reviewsModel.updateReview(review_id, updates);

            if (result.success) {
                return res.status(200).json({ message: 'Review updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update review', error: result.error });
        } catch (error) {
            console.error('Error in updateReview:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteReview(req, res) {
        const { review_id } = req.params;

        try {
            const result = await reviewsModel.deleteReview(review_id);

            if (result.success) {
                return res.status(200).json({ message: 'Review deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete review', error: result.error });
        } catch (error) {
            console.error('Error in deleteReview:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
