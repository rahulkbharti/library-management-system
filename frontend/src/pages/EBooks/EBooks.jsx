import React, { useState } from "react";
import styles from "./EBooks.module.css";

const EBooks = () => {
    // Sample EBooks data
    const [ebooks, setEbooks] = useState([
        { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", file_path: "/ebooks/intro_to_algorithms.pdf", department_id: 2 },
        { id: 2, title: "Artificial Intelligence", author: "Stuart Russell", file_path: "/ebooks/ai_russell.pdf", department_id: 3 },
    ]);

    const [newEbook, setNewEbook] = useState({ title: "", author: "", file_path: "", department_id: "" });
    const [editingEbook, setEditingEbook] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEbook({ ...newEbook, [name]: value });
    };

    // Add EBook
    const addEbook = () => {
        if (!newEbook.title || !newEbook.author || !newEbook.file_path || !newEbook.department_id) return;
        setEbooks([...ebooks, { id: Date.now(), ...newEbook }]);
        setNewEbook({ title: "", author: "", file_path: "", department_id: "" });
    };

    // Edit EBook
    const editEbook = (ebook) => {
        setEditingEbook(ebook);
        setNewEbook(ebook);
    };

    // Update EBook
    const updateEbook = () => {
        setEbooks(ebooks.map((e) => (e.id === editingEbook.id ? newEbook : e)));
        setEditingEbook(null);
        setNewEbook({ title: "", author: "", file_path: "", department_id: "" });
    };

    // Delete EBook
    const deleteEbook = (id) => {
        setEbooks(ebooks.filter((ebook) => ebook.id !== id));
    };

    return (
        <div className={styles.container}>
            <h2>📚 EBooks Management</h2>

            {/* Add/Edit EBook Form */}
            <div className={styles.form}>
                <input type="text" name="title" placeholder="Title" value={newEbook.title} onChange={handleChange} />
                <input type="text" name="author" placeholder="Author" value={newEbook.author} onChange={handleChange} />
                <input type="text" name="file_path" placeholder="File Path" value={newEbook.file_path} onChange={handleChange} />
                <input type="number" name="department_id" placeholder="Department ID" value={newEbook.department_id} onChange={handleChange} />

                {editingEbook ? (
                    <button className={styles.updateBtn} onClick={updateEbook}>Update EBook</button>
                ) : (
                    <button className={styles.addBtn} onClick={addEbook}>Add EBook</button>
                )}
            </div>

            {/* EBooks Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>File</th>
                        <th>Department ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ebooks.map((ebook) => (
                        <tr key={ebook.id}>
                            <td>{ebook.title}</td>
                            <td>{ebook.author}</td>
                            <td>
                                <a href={ebook.file_path} target="_blank" rel="noopener noreferrer">View PDF</a>
                            </td>
                            <td>{ebook.department_id}</td>
                            <td>
                                <button className={styles.editBtn} onClick={() => editEbook(ebook)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => deleteEbook(ebook.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EBooks;
