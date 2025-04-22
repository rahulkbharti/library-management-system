import React, { useState } from "react";
import styles from "./Books.module.css";

const Books = () => {
    // Sample book data
    const [books, setBooks] = useState([
        { id: 1, title: "Chemistry", author: "Unknown", publisher: "Nageen Prakashan", isbn: 124, department_id: 2, language: "English" },
        { id: 2, title: "Physics", author: "HC Verma", publisher: "Bharati Bhawan", isbn: 567, department_id: 1, language: "English" },
    ]);

    const [newBook, setNewBook] = useState({ title: "", author: "", publisher: "", isbn: "", department_id: "", language: "" });
    const [editingBook, setEditingBook] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    // Add Book
    const addBook = () => {
        if (!newBook.title || !newBook.author || !newBook.publisher || !newBook.isbn || !newBook.department_id || !newBook.language) return;
        setBooks([...books, { id: Date.now(), ...newBook }]);
        setNewBook({ title: "", author: "", publisher: "", isbn: "", department_id: "", language: "" });
    };

    // Edit Book
    const editBook = (book) => {
        setEditingBook(book);
        setNewBook(book);
    };

    // Update Book
    const updateBook = () => {
        setBooks(books.map((b) => (b.id === editingBook.id ? newBook : b)));
        setEditingBook(null);
        setNewBook({ title: "", author: "", publisher: "", isbn: "", department_id: "", language: "" });
    };

    // Delete Book
    const deleteBook = (id) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    return (
        <div className={styles.container}>
            <h2>📚 Library Books</h2>

            {/* Add/Edit Book Form */}
            <div className={styles.form}>
                <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleChange} />
                <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleChange} />
                <input type="text" name="publisher" placeholder="Publisher" value={newBook.publisher} onChange={handleChange} />
                <input type="number" name="isbn" placeholder="ISBN" value={newBook.isbn} onChange={handleChange} />
                <input type="number" name="department_id" placeholder="Department ID" value={newBook.department_id} onChange={handleChange} />
                <input type="text" name="language" placeholder="Language" value={newBook.language} onChange={handleChange} />

                {editingBook ? (
                    <button className={styles.updateBtn} onClick={updateBook}>Update Book</button>
                ) : (
                    <button className={styles.addBtn} onClick={addBook}>Add Book</button>
                )}
            </div>

            {/* Books Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Department ID</th>
                        <th>Language</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.department_id}</td>
                            <td>{book.language}</td>
                            <td>
                                <button className={styles.editBtn} onClick={() => editBook(book)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => deleteBook(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
