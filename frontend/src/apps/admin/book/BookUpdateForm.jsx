import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../axios/AxiosInstance';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

const BookUpdateForm = ({ onSubmit }) => {
  // book_id, title, author, isbn, identifier, category_id

  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(id);

    async function fetchData() {
      try {
        const response = await axiosInstance.get(`/book/getBook`, { params: { id } });
        const bookData = response.data.book;
        console.log(bookData);
        //Update the initial values with the data from the API
        setInitialValues({
          book_id: bookData.book_id,
          title: bookData.title,
          author: bookData.author,
          isbn: bookData.isbn,
          identifier: bookData.identifier,
          category_id: bookData.category_id,
        });
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    }

    // fetchData();
  }, []);


  useEffect(() => {
    async function myFn() {
      let x = await axiosInstance.get("/book/categories/getAllCategories");
      console.log(x.data.categories);
      setCategories(x.data.categories);
    }
    myFn();
  }, []);

  console.log("Intial values", initialValues);

  const validationSchema = Yup.object({
    book_id: Yup.string().required('Book ID is required'),
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    identifier: Yup.string().required('Identifier is required'),
    // quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    // available_quantity: Yup.number().required('Available Quantity is required').positive('Available Quantity must be positive'),
    category_id: Yup.string().required('Category ID is required'),
  });

  const handleSubmit = async (values) => {
    // Handle form submission, for example, call an API to add the book
    console.log(values);
    let x = await axiosInstance.post("/book/updateBook", values);
    console.log(x);
    navigate("/librarian/books");
  };

  if (!initialValues.book_id) {
    return (
      <>
        Loading
      </>
    )
  }
  else {
    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>

          <Typography variant="h6">
            Update Book |{' '}
            <Link to="/librarian/books/" component={Link}>
              Back
            </Link>
          </Typography>
          <div>
            <FormControl variant="outlined" fullWidth margin="normal" size="small">
              <InputLabel htmlFor="book_id">Book ID</InputLabel>
              <Field
                as={OutlinedInput}
                id="book_id"
                name="book_id"
                label="Book ID"
                type="text"
                fullWidth
              />
            </FormControl>
            <ErrorMessage name="book_id" component="div" />
          </div>

          <div>
            <FormControl variant="outlined" fullWidth margin="normal" size="small">
              <InputLabel htmlFor="title">Title</InputLabel>
              <Field
                as={OutlinedInput}
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
              />
            </FormControl>
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <FormControl variant="outlined" fullWidth margin="normal" size="small">
              <InputLabel htmlFor="author">Author</InputLabel>
              <Field
                as={OutlinedInput}
                id="author"
                name="author"
                label="Author"
                type="text"
                fullWidth
              />
            </FormControl>
            <ErrorMessage name="author" component="div" />
          </div>

          <div>
            <FormControl variant="outlined" fullWidth margin="normal" size="small">
              <InputLabel htmlFor="isbn">ISBN</InputLabel>
              <Field
                as={OutlinedInput}
                id="isbn"
                name="isbn"
                label="ISBN"
                type="text"
                fullWidth
              />
            </FormControl>
            <ErrorMessage name="isbn" component="div" />
          </div>

          <div>
            <FormControl variant="outlined" fullWidth margin="normal" size="small">
              <InputLabel htmlFor="identifier">Identifier</InputLabel>
              <Field
                as={OutlinedInput}
                id="identifier"
                name="identifier"
                label="Identifier"
                type="text"
                fullWidth
              />
            </FormControl>
            <ErrorMessage name="identifier" component="div" />
          </div>

          <div>
            <FormControl variant="outlined" fullWidth margin="normal" size="small">
              <InputLabel htmlFor="category_id">Category ID</InputLabel>
              <Field as={Select} id="category_id" name="category_id">
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <ErrorMessage name="category_id" component="div" />
          </div>

          <div>
            <Button type="submit" variant="contained" color="primary" size="small">
              Update Book
            </Button>
          </div>

        </Form>
      </Formik>
    );
  };
}
export default BookUpdateForm;
