import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

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

const StudentEdit = () => {
    const { id } = useParams(); 
  const [initialValues, setInitialValues] = useState({
    roll_number: '',
    full_name: '',
    email: '',
    username: '',
    hashed_password: '',
    branch: '',
    year: '',
    address: '',
  });

//   useEffect(() => {
//     // Simulate fetching student data from an API based on the student ID
//     const fetchStudentData = async () => {
//       try {
//         const studentId =  id;
//         const response = await fetch(`API_ENDPOINT/students/${studentId}`);
//         const data = await response.json();
//         setInitialValues(data);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       }
//     };

//     fetchStudentData();
//   }, []); // Make sure to include any dependencies like studentId if needed

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

        <button type="submit">Update</button>
      </Form>
    </Formik>
  );
};

export default StudentEdit;
