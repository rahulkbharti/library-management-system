import React, { useState } from "react";
import styles from "./Transactions.module.css";

const Transactions = () => {
    // Sample transactions data
    const [transactions, setTransactions] = useState([
        {
            transaction_id: 1,
            user_id: 8,
            user_name: "Rahul Kumar Bharti",
            copy_id: 2,
            book_id: 2,
            book_title: "Physics",
            issue_date: "2025-01-20",
            due_date: "2025-01-31",
            return_date: null,
            status: "issued",
        },
    ]);

    const [newTransaction, setNewTransaction] = useState({
        user_id: "",
        copy_id: "",
        issue_date: "",
        due_date: "",
    });

    const [editingTransaction, setEditingTransaction] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction({ ...newTransaction, [name]: value });
    };

    // Add Transaction
    const addTransaction = () => {
        if (!newTransaction.user_id || !newTransaction.copy_id || !newTransaction.issue_date || !newTransaction.due_date) return;
        setTransactions([
            ...transactions,
            { transaction_id: Date.now(), ...newTransaction, status: "issued", return_date: null },
        ]);
        setNewTransaction({ user_id: "", copy_id: "", issue_date: "", due_date: "" });
    };

    // Edit Transaction
    const editTransaction = (transaction) => {
        setEditingTransaction(transaction);
        setNewTransaction(transaction);
    };

    // Update Transaction
    const updateTransaction = () => {
        setTransactions(transactions.map((t) => (t.transaction_id === editingTransaction.transaction_id ? newTransaction : t)));
        setEditingTransaction(null);
        setNewTransaction({ user_id: "", copy_id: "", issue_date: "", due_date: "" });
    };

    // Delete Transaction
    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((transaction) => transaction.transaction_id !== id));
    };

    // Return Book (Update Return Date & Status)
    const returnBook = (id) => {
        setTransactions(
            transactions.map((transaction) =>
                transaction.transaction_id === id
                    ? { ...transaction, return_date: new Date().toISOString().split("T")[0], status: "returned" }
                    : transaction
            )
        );
    };

    return (
        <div className={styles.container}>
            <h2>🔄 Transactions Management</h2>

            {/* Add/Edit Transaction Form */}
            <div className={styles.form}>
                <input type="number" name="user_id" placeholder="User ID" value={newTransaction.user_id} onChange={handleChange} />
                <input type="number" name="copy_id" placeholder="Copy ID" value={newTransaction.copy_id} onChange={handleChange} />
                <input type="date" name="issue_date" value={newTransaction.issue_date} onChange={handleChange} />
                <input type="date" name="due_date" value={newTransaction.due_date} onChange={handleChange} />

                {editingTransaction ? (
                    <button className={styles.updateBtn} onClick={updateTransaction}>Update Transaction</button>
                ) : (
                    <button className={styles.addBtn} onClick={addTransaction}>Add Transaction</button>
                )}
            </div>

            {/* Transactions Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Book</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transaction_id}>
                            <td>{transaction.user_name} (ID: {transaction.user_id})</td>
                            <td>{transaction.book_title} (Book ID: {transaction.book_id})</td>
                            <td>{transaction.issue_date}</td>
                            <td>{transaction.due_date}</td>
                            <td>{transaction.return_date ? transaction.return_date : "Not Returned"}</td>
                            <td>{transaction.status}</td>
                            <td>
                                {transaction.status === "issued" && (
                                    <button className={styles.returnBtn} onClick={() => returnBook(transaction.transaction_id)}>Return</button>
                                )}
                                <button className={styles.editBtn} onClick={() => editTransaction(transaction)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => deleteTransaction(transaction.transaction_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
