import util from 'util';

class ReviewsModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createReview({ user_id, book_id, rating, review_text }) {
        try {
            const query = `
        INSERT INTO Reviews (user_id, book_id, rating, review_text)
        VALUES (?, ?, ?, ?)
      `;
            const result = await this.query(query, [user_id, book_id, rating, review_text]);
            return { success: true, reviewId: result.insertId };
        } catch (error) {
            console.error('Error in createReview:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllReviews() {
        try {
            const query = `
        SELECT r.review_id, r.user_id, u.name AS user_name, r.book_id, b.title AS book_title,
               r.rating, r.review_text, r.created_at
        FROM Reviews r
        INNER JOIN Users u ON r.user_id = u.user_id
        INNER JOIN Books b ON r.book_id = b.book_id
      `;
            const rows = await this.query(query);
            return { success: true, reviews: rows };
        } catch (error) {
            console.error('Error in getAllReviews:', error);
            return { success: false, error: error.message };
        }
    }

    async getReviewsByBook(book_id) {
        try {
            const query = `
        SELECT r.review_id, r.user_id, u.name AS user_name, r.book_id, b.title AS book_title,
               r.rating, r.review_text, r.created_at
        FROM Reviews r
        INNER JOIN Users u ON r.user_id = u.user_id
        INNER JOIN Books b ON r.book_id = b.book_id
        WHERE r.book_id = ?
      `;
            const rows = await this.query(query, [book_id]);
            return { success: true, reviews: rows };
        } catch (error) {
            console.error('Error in getReviewsByBook:', error);
            return { success: false, error: error.message };
        }
    }

    async updateReview(review_id, updates) {
        try {
            const fields = [];
            const params = [];

            for (const [key, value] of Object.entries(updates)) {
                fields.push(`${key} = ?`);
                params.push(value);
            }

            params.push(review_id);

            const query = `
        UPDATE Reviews
        SET ${fields.join(', ')}
        WHERE review_id = ?
      `;
            const result = await this.query(query, params);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateReview:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteReview(review_id) {
        try {
            const query = `
        DELETE FROM Reviews
        WHERE review_id = ?
      `;
            const result = await this.query(query, [review_id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteReview:', error);
            return { success: false, error: error.message };
        }
    }
}

export default ReviewsModel;
