import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
  roll_number: Yup.string().required('Roll Number is required'),
  full_name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  username: Yup.string().required('Username is required'),
  hashed_password: Yup.string().required('Password is required'),
  branch: Yup.string().required('Branch is required'),
  year: Yup.number().required('Year is required'),
  address: Yup.string().required('Address is required'),
});

const StudentAdd = () => {
  const initialValues = {
    roll_number: '',
    full_name: '',
    email: '',
    username: '',
    hashed_password: '',
    branch: '',
    year: '',
    address: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate submitting data to an API or handle logic accordingly
    console.log('Submitted:', values);
    // After handling submission logic, you may want to redirect the user or perform other actions
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
      <h3>Add Student | <Link to="/librarian/students/">Back</Link></h3>
        <div>
          <label htmlFor="roll_number">Roll Number</label>
          <Field type="text" id="roll_number" name="roll_number" />
          <ErrorMessage name="roll_number" component="div" />
        </div>

        <div>
          <label htmlFor="full_name">Full Name</label>
          <Field type="text" id="full_name" name="full_name" />
          <ErrorMessage name="full_name" component="div" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <Field type="text" id="username" name="username" />
          <ErrorMessage name="username" component="div" />
        </div>

        <div>
          <label htmlFor="hashed_password">Password</label>
          <Field type="password" id="hashed_password" name="hashed_password" />
          <ErrorMessage name="hashed_password" component="div" />
        </div>

        <div>
          <label htmlFor="branch">Branch</label>
          <Field type="text" id="branch" name="branch" />
          <ErrorMessage name="branch" component="div" />
        </div>

        <div>
          <label htmlFor="year">Year</label>
          <Field type="number" id="year" name="year" />
          <ErrorMessage name="year" component="div" />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <Field type="text" id="address" name="address" />
          <ErrorMessage name="address" component="div" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default StudentAdd;
