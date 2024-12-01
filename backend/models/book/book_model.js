// BookModel.js
import util from 'util';

class BookModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async addBook(book_id, title, author, isbn, identifier, category_id) {
        try {
            const result = await this.query('INSERT INTO books (book_id, title, author, isbn, identifier, category_id) VALUES (?, ?, ?, ?, ?, ?)', [book_id, title, author, isbn, identifier, category_id]);
            console.log(result);
            const [book] = await this.query('SELECT * FROM books WHERE book_id = ?', [result.insertId]);
            return book;
        } catch (error) {
            console.error('Error Adding Book:', error.message);
            return { error: error.message };
        }
    }

    async getBook(book_id) {
        try {
            const [book] = await this.query('SELECT * FROM books WHERE book_id = ?', [book_id]);
            return book;
        } catch (error) {
            console.error('Error getting Book:', error.message);
            return;
        }
    }

    async getBookByTitle(book_title) {
        try {
            const books = await this.query(`
              SELECT
                books.identifier,
                COUNT(*) as book_count,
                books.*,
                categories.name as category
              FROM
                books
                JOIN categories ON books.category_id = categories.category_id
              WHERE
                title LIKE ? 
              GROUP BY
                books.identifier;
            `, [`%${book_title}%`]);
            return books;
        } catch (error) {
            console.error('Error getting Book:', error.message);
            return;
        }
    }

    async getAllBooks() {
        try {
            const books = await this.query('SELECT * FROM books');
            return books;
        } catch (error) {
            console.error('Error getting all Books:', error.message);
            return;
        }
    }

    async updateBook(book_id, title, author, isbn, identifier, category_id) {
        try {
            const query = `UPDATE books
            SET
              title = "${title}",
              author = "${author}",
              isbn = "${isbn}",
              identifier = "${identifier}",
              category_id = "${category_id}"
            WHERE
              book_id = ${book_id};`;
            await this.query(query);
            const [book] = await this.query('SELECT * FROM books WHERE book_id = ?', [book_id]);
            return book;
        } catch (error) {
            console.error('Error updating Book:', error.message);
            return error;
        }
    }

    async deleteBook(book_id) {
        try {
            await this.query('DELETE FROM books WHERE book_id = ?', [book_id]);
            return { message: 'Book deleted successfully' };
        } catch (error) {
            console.error('Error deleting Book:', error.message);
            return { error: error.message };
        }
    }
}

export default BookModel;
