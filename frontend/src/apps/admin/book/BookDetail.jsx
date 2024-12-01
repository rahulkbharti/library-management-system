import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../../axios/AxiosInstance';

const BookDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function Fn() {
      let x = await axiosInstance.get("/book/getBook", { params: { book_id: id } });
      console.log(x.data.book);
      setBook(x.data.book);
    }
    Fn();
  }, []);

  return (
    <div>
      <h3>Book Detail | <Link to="/librarian/books/">Back</Link></h3>
      book id is {id}

      <div>
        <p>Title: {book?.title} </p>
        <p>Author: {book?.author} </p>
        <p>ISBN: {book?.isbn}</p>
        <p>Category ID: {book?.category_id}</p>
      </div>
    </div>
  );
};

export default BookDetail;
