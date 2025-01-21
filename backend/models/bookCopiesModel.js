import util from 'util';

class BookCopiesModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createCopy(book_id, status = 'available') {
        try {
            const query = `
        INSERT INTO BookCopies (book_id, status)
        VALUES (?, ?)
      `;
            const result = await this.query(query, [book_id, status]);
            return { success: true, copyId: result.insertId };
        } catch (error) {
            console.error('Error in createCopy:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllCopies() {
        try {
            const query = `
        SELECT bc.copy_id, bc.book_id, b.title, b.author, bc.status, bc.created_at, bc.updated_at
        FROM BookCopies bc
        INNER JOIN Books b ON bc.book_id = b.book_id
      `;
            const rows = await this.query(query);
            return { success: true, copies: rows };
        } catch (error) {
            console.error('Error in getAllCopies:', error);
            return { success: false, error: error.message };
        }
    }

    async getCopiesByBookId(book_id) {
        try {
            const query = `
        SELECT bc.copy_id, bc.status, bc.created_at, bc.updated_at
        FROM BookCopies bc
        WHERE bc.book_id = ?
      `;
            const rows = await this.query(query, [book_id]);
            return { success: true, copies: rows };
        } catch (error) {
            console.error('Error in getCopiesByBookId:', error);
            return { success: false, error: error.message };
        }
    }

    async updateCopyStatus(copy_id, status) {
        try {
            const query = `
        UPDATE BookCopies
        SET status = ?
        WHERE copy_id = ?
      `;
            const result = await this.query(query, [status, copy_id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateCopyStatus:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteCopy(copy_id) {
        try {
            const query = `
        DELETE FROM BookCopies
        WHERE copy_id = ?
      `;
            const result = await this.query(query, [copy_id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteCopy:', error);
            return { success: false, error: error.message };
        }
    }
}

export default BookCopiesModel;
