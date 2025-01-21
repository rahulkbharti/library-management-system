import util from 'util';

class BooksCopies {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    // Get all book copies
    async getAllCopies() {
        try {
            const sql = "SELECT * FROM book_copies";
            const results = await this.query(sql);
            return results;
        } catch (error) {
            return {
                success: false,
                message: "Failed to fetch all book copies",
                error: error.message
            };
        }
    }

    // Get details of a specific copy by ID
    async getCopyById(copyId) {
        try {
            const sql = "SELECT * FROM book_copies WHERE id = ?";
            const results = await this.query(sql, [copyId]);
            if (results.length === 0) {
                throw new Error(`Copy with ID ${copyId} not found`);
            }
            return results[0];
        } catch (error) {
            return {
                success: false,
                message: `Failed to fetch copy with ID ${copyId}`,
                error: error.message
            };
        }
    }

    // Add a new copy of a book
    async addCopy(copyData) {
        try {
            const sql = "INSERT INTO book_copies (book_id, status, location) VALUES (?, ?, ?)";
            const { bookId, status, location } = copyData;
            const result = await this.query(sql, [bookId, status, location]);
            return {
                success: true,
                message: "Copy added successfully",
                data: { id: result.insertId, ...copyData }
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to add a new copy",
                error: error.message
            };
        }
    }

    // Update an existing copy
    async updateCopy(copyId, copyData) {
        try {
            const sql = "UPDATE book_copies SET book_id = ?, status = ?, location = ? WHERE id = ?";
            const { bookId, status, location } = copyData;
            const result = await this.query(sql, [bookId, status, location, copyId]);
            if (result.affectedRows === 0) {
                throw new Error(`Copy with ID ${copyId} not found`);
            }
            return {
                success: true,
                message: "Copy updated successfully",
                data: { id: copyId, ...copyData }
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to update copy with ID ${copyId}`,
                error: error.message
            };
        }
    }

    // Delete a copy
    async deleteCopy(copyId) {
        try {
            const sql = "DELETE FROM book_copies WHERE id = ?";
            const result = await this.query(sql, [copyId]);
            if (result.affectedRows === 0) {
                throw new Error(`Copy with ID ${copyId} not found`);
            }
            return {
                success: true,
                message: `Copy with ID ${copyId} deleted successfully`
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to delete copy with ID ${copyId}`,
                error: error.message
            };
        }
    }
}

export default BooksCopies;
