import util from 'util';

class BooksModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createBook({ title, author, publisher, isbn, department_id, language }) {
        try {
            const query = `
        INSERT INTO Books (title, author, publisher, isbn, department_id, language)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
            const params = [title, author, publisher, isbn, department_id, language];
            const result = await this.query(query, params);
            return { success: true, bookId: result.insertId };
        } catch (error) {
            console.error('Error in createBook:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllBooks() {
        try {
            const query = `
        SELECT b.book_id, b.title, b.author, b.publisher, b.isbn, b.language, d.name AS department_name,
               b.created_at, b.updated_at
        FROM Books b
        LEFT JOIN Departments d ON b.department_id = d.department_id
      `;
            const rows = await this.query(query);
            return { success: true, books: rows };
        } catch (error) {
            console.error('Error in getAllBooks:', error);
            return { success: false, error: error.message };
        }
    }

    async getBookById(bookId) {
        try {
            const query = `
        SELECT b.book_id, b.title, b.author, b.publisher, b.isbn, b.language, d.name AS department_name,
               b.created_at, b.updated_at
        FROM Books b
        LEFT JOIN Departments d ON b.department_id = d.department_id
        WHERE b.book_id = ?
      `;
            const rows = await this.query(query, [bookId]);
            return { success: true, book: rows[0] || null };
        } catch (error) {
            console.error('Error in getBookById:', error);
            return { success: false, error: error.message };
        }
    }

    async updateBook(bookId, updates) {
        try {
            const fields = [];
            const params = [];

            for (const [key, value] of Object.entries(updates)) {
                fields.push(`${key} = ?`);
                params.push(value);
            }

            params.push(bookId);

            const query = `
        UPDATE Books
        SET ${fields.join(', ')}
        WHERE book_id = ?
      `;
            const result = await this.query(query, params);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateBook:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteBook(bookId) {
        try {
            const query = `
        DELETE FROM Books
        WHERE book_id = ?
      `;
            const result = await this.query(query, [bookId]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteBook:', error);
            return { success: false, error: error.message };
        }
    }
}

export default BooksModel;
