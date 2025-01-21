import util from 'util';

class EBooksModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createEBook({ title, author, file_path, department_id }) {
        try {
            const query = `
        INSERT INTO EBooks (title, author, file_path, department_id)
        VALUES (?, ?, ?, ?)
      `;
            const result = await this.query(query, [title, author, file_path, department_id]);
            return { success: true, ebookId: result.insertId };
        } catch (error) {
            console.error('Error in createEBook:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllEBooks() {
        try {
            const query = `
        SELECT e.ebook_id, e.title, e.author, e.file_path, e.department_id, d.name AS department_name
        FROM EBooks e
        LEFT JOIN Departments d ON e.department_id = d.department_id
      `;
            const rows = await this.query(query);
            return { success: true, ebooks: rows };
        } catch (error) {
            console.error('Error in getAllEBooks:', error);
            return { success: false, error: error.message };
        }
    }

    async getEBookById(ebook_id) {
        try {
            const query = `
        SELECT e.ebook_id, e.title, e.author, e.file_path, e.department_id, d.name AS department_name
        FROM EBooks e
        LEFT JOIN Departments d ON e.department_id = d.department_id
        WHERE e.ebook_id = ?
      `;
            const rows = await this.query(query, [ebook_id]);
            return { success: true, ebook: rows[0] || null };
        } catch (error) {
            console.error('Error in getEBookById:', error);
            return { success: false, error: error.message };
        }
    }

    async updateEBook(ebook_id, updates) {
        try {
            const fields = [];
            const params = [];

            for (const [key, value] of Object.entries(updates)) {
                fields.push(`${key} = ?`);
                params.push(value);
            }

            params.push(ebook_id);

            const query = `
        UPDATE EBooks
        SET ${fields.join(', ')}
        WHERE ebook_id = ?
      `;
            const result = await this.query(query, params);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateEBook:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteEBook(ebook_id) {
        try {
            const query = `
        DELETE FROM EBooks
        WHERE ebook_id = ?
      `;
            const result = await this.query(query, [ebook_id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteEBook:', error);
            return { success: false, error: error.message };
        }
    }
}

export default EBooksModel;
