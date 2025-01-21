import util from 'util';

class TransactionsModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async createTransaction({ user_id, copy_id, issue_date, due_date }) {
        try {
            const query = `
        INSERT INTO Transactions (user_id, copy_id, issue_date, due_date)
        VALUES (?, ?, ?, ?)
      `;
            const result = await this.query(query, [user_id, copy_id, issue_date, due_date]);
            return { success: true, transactionId: result.insertId };
        } catch (error) {
            console.error('Error in createTransaction:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllTransactions() {
        try {
            const query = `
        SELECT t.transaction_id, t.user_id, u.name AS user_name, t.copy_id, bc.book_id, b.title AS book_title,
               t.issue_date, t.due_date, t.return_date, t.status, t.created_at, t.updated_at
        FROM Transactions t
        INNER JOIN Users u ON t.user_id = u.user_id
        INNER JOIN BookCopies bc ON t.copy_id = bc.copy_id
        INNER JOIN Books b ON bc.book_id = b.book_id
      `;
            const rows = await this.query(query);
            return { success: true, transactions: rows };
        } catch (error) {
            console.error('Error in getAllTransactions:', error);
            return { success: false, error: error.message };
        }
    }

    async getTransactionById(transaction_id) {
        try {
            const query = `
        SELECT t.transaction_id, t.user_id, u.name AS user_name, t.copy_id, bc.book_id, b.title AS book_title,
               t.issue_date, t.due_date, t.return_date, t.status, t.created_at, t.updated_at
        FROM Transactions t
        INNER JOIN Users u ON t.user_id = u.user_id
        INNER JOIN BookCopies bc ON t.copy_id = bc.copy_id
        INNER JOIN Books b ON bc.book_id = b.book_id
        WHERE t.transaction_id = ?
      `;
            const rows = await this.query(query, [transaction_id]);
            return { success: true, transaction: rows[0] || null };
        } catch (error) {
            console.error('Error in getTransactionById:', error);
            return { success: false, error: error.message };
        }
    }

    async updateTransaction(transaction_id, updates) {
        try {
            const fields = [];
            const params = [];

            for (const [key, value] of Object.entries(updates)) {
                fields.push(`${key} = ?`);
                params.push(value);
            }

            params.push(transaction_id);

            const query = `
        UPDATE Transactions
        SET ${fields.join(', ')}
        WHERE transaction_id = ?
      `;
            const result = await this.query(query, params);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in updateTransaction:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteTransaction(transaction_id) {
        try {
            const query = `
        DELETE FROM Transactions
        WHERE transaction_id = ?
      `;
            const result = await this.query(query, [transaction_id]);
            return { success: true, affectedRows: result.affectedRows };
        } catch (error) {
            console.error('Error in deleteTransaction:', error);
            return { success: false, error: error.message };
        }
    }
}

export default TransactionsModel;
