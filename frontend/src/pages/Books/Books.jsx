import React, { useEffect, useState } from "react";
import styles from "./Books.module.css";
import { deleteRequest, getRequest, postRequest } from "../../utils/axiosInstance";

const Books = () => {
  const [departments, setDepartments] = useState([]);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    isbn: 0,
    department_id: 0,
    language: "",
  });
  const [editingBook, setEditingBook] = useState(null);

  // Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await getRequest("/departments");
        console.log("Departments fetched:", result);
        setDepartments(result);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);


  // Fetch Books
  const fetchBooks = async () => {
    try {
      const result = await getRequest("/books");
      console.log("Books fetched:", result);
      setBooks(result);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add New Book
  const addBook = async () => {
    console.log("Adding book:", newBook);
    // if (Object.values(newBook).some((field) => !field)) return;

    try {
      const response = await postRequest("/books", newBook);
      console.log("Book added:", response);
      setBooks([...books, response]);
      resetForm();
      fetchBooks(); // Refresh the book list after adding a new book
    } catch (error) {
      console.error("Error adding book:", error);
      alert(error.error || "Failed to add book. Please try again.");
    }
  };

  // Edit Book (populate form)
  const editBook = (book) => {
    setEditingBook(book);
    setNewBook(book);
  };

  // Update Book
  const updateBook = () => {
    setBooks(
      books.map((b) => (b.book_id === editingBook.book_id ? newBook : b))
    );
    setEditingBook(null);
    resetForm();
  };

  // Delete Book
  const deleteBook = (id) => {
    const x = confirm(
      "Are you sure you want to delete this book? This action cannot be undone.");
    if (!x) return;
    console.log("Deleting book:", id);
    deleteRequest(`/books/${id}`)
    .then(() => {
        console.log("Book deleted:", id);
        setBooks(books.filter((book) => book.book_id !== id));
        }
    ).catch((error) => {
        console.error("Error deleting book:", error);
        alert(error.error || "Failed to delete book. Please try again.");
    }
    );
    // setBooks(books.filter((book) => book.book_id !== id));
  };

  // Reset form to initial state
  const resetForm = () => {
    setNewBook({
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      department_id: "",
      language: "",
    });
  };

  return (
    <div className={styles.container}>
      <h2>📚 Library Books</h2>

      {/* Add/Edit Book Form */}
      <div className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={newBook.publisher}
          onChange={handleChange}
        />
        <input
          type="number"
          name="isbn"
          placeholder="ISBN"
          value={newBook.isbn}
          onChange={handleChange}
        />

        <select
          name="department_id"
          value={newBook.department_id}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.department_id} value={dept.department_id}>
              {dept.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="language"
          placeholder="Language"
          value={newBook.language}
          onChange={handleChange}
        />

        {editingBook ? (
          <button className={styles.updateBtn} onClick={updateBook}>
            Update Book
          </button>
        ) : (
          <button className={styles.addBtn} onClick={addBook}>
            Add Book
          </button>
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
            <th>Department</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={book.book_id || idx}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>
                {departments.find((d) => d.department_id == book.department_id)
                  ?.name || "Unknown"}
              </td>
              <td>{book.language}</td>
              <td>
                <button
                  className={styles.editBtn}
                  onClick={() => editBook(book)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteBook(book.book_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
