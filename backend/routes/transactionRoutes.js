import express from 'express';
import TransactionsController from '../controllers/transactionController.js';

const router = express.Router();

// Routes for transactions
router.post('/', TransactionsController.createTransaction);
router.get('/', TransactionsController.getAllTransactions);
router.get('/:transaction_id', TransactionsController.getTransactionById);
router.put('/:transaction_id', TransactionsController.updateTransaction);
router.delete('/:transaction_id', TransactionsController.deleteTransaction);

export default router;
