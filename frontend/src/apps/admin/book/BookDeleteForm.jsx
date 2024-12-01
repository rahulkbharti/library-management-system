import React from 'react';
import { Formik, Form } from 'formik';

const BookDeleteForm = ({ initialValues, onSubmit }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission, for example, call an API to delete the book
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <p>Are you sure you want to delete this book?</p>
        <div>
          <button type="submit">Delete Book</button>
        </div>
      </Form>
    </Formik>
  );
};

export default BookDeleteForm;
