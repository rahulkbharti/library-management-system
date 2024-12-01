import React, { useState } from 'react';
import SearchStudentByRollNumber from '../student/SearchStudent';
import SearchBookByBookId from '../book/SeachBook';
import { Grid } from '@mui/material';
import TransactionForm from './TransactionForm';

const TransactionIssue = () => {

  const [student, setStudent] = useState(null);
  const [book, setBook] = useState(null);

  console.log(student,book);

  return (
    <>
    <h2>Issuing Book</h2>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12} sm={6} md={6}>
       
          <SearchStudentByRollNumber setStudent={setStudent} />
          {student && (
            <div>
              <h3>Student Details</h3>
              <p>Name: {student?.full_name}</p>
              <p>Email: {student?.email}</p>
              <p>Branch: {student?.branch}</p>
              <p>Year: {student?.year}</p>

            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <SearchBookByBookId setBook={setBook} />
          {book && (
            <div>
              <h3>Book Details</h3>
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Issued : {book?.issued ? "NOT Available":"Available"}  </p>
              {/* Add more details as needed */}
            </div>
          )}
        </Grid>
      </Grid>
      {(book  && !book.issued ) && student && (
         <TransactionForm student={student} book={book}/>
      )}


    </>
  );
};

export default TransactionIssue;
