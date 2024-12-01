import React, { useState } from 'react';
import BookList from './BookList';
import BookDetail from './BookDetail';
import BookAddForm from './BookAddForm';
import BookUpdateForm from './BookUpdateForm';
import BookDeleteForm from './BookDeleteForm';
import CustomizedDialogs from './Test';
import { Link, Outlet } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

const BookManagement = () => {

  return (
    <div>
       <Stack direction={"row"} spacing={2} sx={{ justifyContent: "space-between", p: 1 }}>
        <h2>Book Management</h2>
        <Stack direction={"row"} spacing={2} sx={{ justifyContent: "flex-end", }}>
          <Link to="add">
            <Button size="small" variant="contained">Add A Book</Button>
          </Link>
        </Stack>
      </Stack>
      <hr />
      <Outlet/>
    </div>
  );
};

export default BookManagement;
