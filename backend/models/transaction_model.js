// TransactionModel.js
import util from 'util';

class TransactionModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }

    async addTransaction(student_id, book_id, admin_id, issue_date, return_date, status) {
        try {
            await this.query('START TRANSACTION');
            // Insert into transactions table
            const result1 = await this.query(`
              INSERT INTO transactions (student_id, book_id, admin_id, issue_date, return_date, status) 
              VALUES (?, ?, ?, ?, ?, ?);
            `, [student_id, book_id, admin_id, issue_date, return_date, status]);

            // Update books table
            const result2 = await this.query(`
              UPDATE books
              SET issued = TRUE
              WHERE book_id = ?;
            `, [book_id]);

            await this.query('COMMIT');

            // Handle the results if needed
            console.log('Transaction successful:', result1, result2);
            return result1;
        } catch (error) {
            await this.query('ROLLBACK');
            console.error('Transaction failed:', error);
            return;
        }
    }

    async getTransaction(transaction_id) {
        try {
            const [transaction] = await this.query('SELECT * FROM transactions WHERE transaction_id = ?', [transaction_id]);
            return transaction;
        } catch (error) {
            console.error('Error getting Transaction:', error.message);
            return;
        }
    }

    async getAllTransactions() {
        try {
            const transactions = await this.query(`
            SELECT transactions.*, books.title as book_name, students.full_name as student_name, admins.full_name as admin_name 
            FROM transactions 
            JOIN books ON transactions.book_id = books.book_id 
            JOIN students ON transactions.student_id = students.student_id 
            JOIN admins ON transactions.admin_id = admins.admin_id;
            `);
            return transactions;
        } catch (error) {
            console.error('Error getting all Transactions:', error.message);
            return;
        }
    }

    async updateTransaction(transaction_id, newData) {
        try {
            await this.query('UPDATE transactions SET ? WHERE transaction_id = ?', [newData, transaction_id]);
        } catch (error) {
            console.error('Error updating Transaction:', error.message);
            throw error;
        }
    }

    async deleteTransaction(transaction_id) {
        try {
            await this.query('DELETE FROM transactions WHERE transaction_id = ?', [transaction_id]);
        } catch (error) {
            console.error('Error deleting Transaction:', error.message);
            throw error;
        }
    }

    async getStudentAllTransactions(student_id) {
        try {
            const transactions = await this.query('SELECT * FROM transactions WHERE student_id = ?', [student_id]);
            return transactions;
        } catch (error) {
            console.error('Error getting all Transactions:', error.message);
            return;
        }
    }
}

export default TransactionModel;
