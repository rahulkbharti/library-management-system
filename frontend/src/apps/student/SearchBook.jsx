import React, { useState } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import { Button } from '@mui/material';


const SearchBookByTitle = () => {
  const [bookId, setBookId] = useState('');
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);

  const handleBookIdChange = (event) => {
    setBookId(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Assuming there's a function to search for a book by book_id
      const response = await axiosInstance.post('/book/getBookByTitle', { "book_title": bookId });
      // Check if a book is found
      if (response.data && response.data.books) {
        setBooks(response.data.books);
        setError(null);
      } else {
        setBooks(null);
        setError('Book not found');
      }
    } catch (error) {
      console.error('Error searching for book:', error);
      setBooks(null);
      setError('Error searching for book');
    }
  };

  return (
    <div>
      <h2>Search Book</h2>

      <div>
        <label htmlFor="bookId">Book Name </label>
        <input
          type="search"
          id="bookId"
          value={bookId}
          onChange={handleBookIdChange}
        />
      </div>
      <Button onClick={handleSearch} type="submit" variant="contained" color="primary" size="small">
        Seach
      </Button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {books ? (
        <ul>
          {books.map((book) => (
            <li key={book.book_id}>
              <b>{book.title}</b> | author: <i>{book.author}</i> | category: <u>{book.category}</u>
            </li>
          ))}
        </ul>
      ) : (
        <h1>
          No Book Found!
        </h1>
      )}


    </div>
  );
};

export default SearchBookByTitle;
