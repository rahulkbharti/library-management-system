import { Alert, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axios/AxiosInstance';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const BookList = () => {
  const [books, setBooks] = useState([]);
  // Simulate fetching student data from an API based on the student ID
  const BookList = async () => {
    try {
      let x = await axiosInstance.get("/book/getAllBooks");
      console.log(x.data.list);
      setBooks(x.data.list);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  useEffect(() => {
    BookList();
  }, []); // Make sure to include any dependencies like studentId if needed

  const handleDelete = async (book_id) => {
    // Implement delete action
    let x = window.confirm("Do you really want to delete this book");
    if (x) {
      const s = await axiosInstance.delete('/book/deleteBook', { data: { book_id } });
      if (s.status === 200) {
        BookList();
      }
      else {
        alert(s.response.data.error);
      }
    }

  };

  return (
    <>
      <table border="1" width={"600px"}>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book?.book_id}>
              <td>{book?.book_id}</td>
              <td>{book?.title}</td>
              <td>{book?.author}</td>
              <td>{book.issued ? "Issued" : "Not Issued"}</td>
              <td>
                <Link to={`view/${book?.book_id}`}><IconButton aria-label="view" color="primary">
                  <RemoveRedEyeIcon />
                </IconButton></Link>

                <Link to={`edit/${book?.book_id}`}><IconButton aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton></Link>

                <IconButton onClick={() => handleDelete(book?.book_id)} aria-label="edit" color="error">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BookList;
