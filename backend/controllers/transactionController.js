import TransactionsModel from '../models/transactionModel.js';
import db from '../config/db.js';

const transactionsModel = new TransactionsModel(db);

export default class TransactionsController {
    static async createTransaction(req, res) {
        const { user_id, copy_id, issue_date, due_date } = req.body;

        try {
            const result = await transactionsModel.createTransaction({ user_id, copy_id, issue_date, due_date });

            if (result.success) {
                return res.status(201).json({ message: 'Transaction created successfully', transactionId: result.transactionId });
            }

            res.status(500).json({ message: 'Failed to create transaction', error: result.error });
        } catch (error) {
            console.error('Error in createTransaction:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllTransactions(req, res) {
        try {
            const result = await transactionsModel.getAllTransactions();

            if (result.success) {
                return res.status(200).json(result.transactions);
            }

            res.status(500).json({ message: 'Failed to fetch transactions', error: result.error });
        } catch (error) {
            console.error('Error in getAllTransactions:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getTransactionById(req, res) {
        const { transaction_id } = req.params;

        try {
            const result = await transactionsModel.getTransactionById(transaction_id);

            if (result.success) {
                if (result.transaction) {
                    return res.status(200).json(result.transaction);
                }
                return res.status(404).json({ message: 'Transaction not found' });
            }

            res.status(500).json({ message: 'Failed to fetch transaction', error: result.error });
        } catch (error) {
            console.error('Error in getTransactionById:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateTransaction(req, res) {
        const { transaction_id } = req.params;
        const updates = req.body;

        try {
            const result = await transactionsModel.updateTransaction(transaction_id, updates);

            if (result.success) {
                return res.status(200).json({ message: 'Transaction updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update transaction', error: result.error });
        } catch (error) {
            console.error('Error in updateTransaction:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteTransaction(req, res) {
        const { transaction_id } = req.params;

        try {
            const result = await transactionsModel.deleteTransaction(transaction_id);

            if (result.success) {
                return res.status(200).json({ message: 'Transaction deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete transaction', error: result.error });
        } catch (error) {
            console.error('Error in deleteTransaction:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
