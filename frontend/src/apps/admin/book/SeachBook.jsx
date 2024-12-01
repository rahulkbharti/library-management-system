import React, { useState } from 'react';
import axiosInstance from '../../../axios/AxiosInstance';


const SearchBookByBookId = ({ setBook }) => {
  const [bookId, setBookId] = useState('');

  const [error, setError] = useState(null);

  const handleBookIdChange = (event) => {
    setBookId(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Assuming there's a function to search for a book by book_id
      const response = await axiosInstance.get('/book/getBook', { "book_id": bookId });

      // Check if a book is found
      if (response.data && response.data.book) {
        setBook(response.data.book);
        setError(null);
      } else {
        setBook(null);
        setError('Book not found');
      }
    } catch (error) {
      console.error('Error searching for book:', error);
      setBook(null);
      setError('Error searching for book');
    }
  };

  return (
    <div>

      <div>
        <label htmlFor="bookId">Book ID:</label>
        <input
          type="text"
          id="bookId"
          value={bookId}
          onChange={handleBookIdChange}
        />
      </div>

      <button onClick={handleSearch}>Search</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

    </div>
  );
};

export default SearchBookByBookId;
