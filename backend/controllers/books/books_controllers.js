import util from 'util';

class BooksControllers {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    // Get all books
    async getAllBooks() {
        try {
            const sql = "SELECT * FROM books";
            const results = await this.query(sql);
            return results;
        } catch (error) {
            return {
                success: false,
                message: "Failed to fetch all books",
                error: error.message
            };
        }
    }

    // Get one book by ID
    async getBookById(bookId) {
        try {
            const sql = "SELECT * FROM books WHERE book_id = ?";
            const results = await this.query(sql, [bookId]);
            if (results.length === 0) {
                throw new Error(`Book with ID ${bookId} not found`);
            }
            return results[0];
        } catch (error) {
            return {
                success: false,
                message: `Failed to fetch book with ID ${bookId}`,
                error: error.message
            };
        }
    }

    // Create a new book
    async createBook(bookData) {
        try {
            const sql = "INSERT INTO books (book_id, title, author, isbn, identifier, category_id) VALUES (?, ?, ?, ?, ?, ?)";
            const { book_id, title, author, isbn, identifier, category_id } = bookData;
            const result = await this.query(sql, [book_id, title, author, isbn, identifier, category_id]);
            return {
                success: true,
                message: "Book created successfully",
                data: { id: result.insertId, ...bookData }
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to create a new book",
                error: error.message
            };
        }
    }

    // Update a book by ID
    async updateBook(bookId, bookData) {
        try {
            const sql = "UPDATE books SET  title = ?, author = ?, isbn = ?, identifier = ?, category_id = ? WHERE book_id = ?";
            const { title, author, isbn, identifier, category_id } = bookData;
            const result = await this.query(sql, [title, author, isbn, identifier, category_id, bookId]);
            if (result.affectedRows === 0) {
                throw new Error(`Book with ID ${bookId} not found`);
            }
            return {
                success: true,
                message: "Book updated successfully",
                data: { ...bookData }
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to update book with ID ${bookId}`,
                error: error.message
            };
        }
    }

    // Delete a book by ID
    async deleteBook(bookId) {
        try {
            const sql = "DELETE FROM books WHERE book_id = ?";
            const result = await this.query(sql, [bookId]);
            if (result.affectedRows === 0) {
                throw new Error(`Book with ID ${bookId} not found`);
            }
            return {
                success: true,
                message: `Book with ID ${bookId} deleted successfully`
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to delete book with ID ${bookId}`,
                error: error.message
            };
        }
    }
}

export default BooksControllers;
