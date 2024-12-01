import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SearchStudentByRollNumber from '../student/SearchStudent';
import SearchBookByBookId from '../book/SeachBook';
import axiosInstance from '../../../axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  student_id: Yup.number().required('Student ID is required'),
  book_id: Yup.number().required('Book ID is required'),
  admin_id: Yup.number().required('Admin ID is required'),
  issue_date: Yup.date().required('Issue Date is required'),
  return_date: Yup.date().required('Return Date is required'),
  status: Yup.string().required('Status is required'),
});

const TransactionForm = ({student,book}) => {
  const navigate = useNavigate();
  const today = new Date();
  const initialValues = {
    student_id: student?.student_id,
    student_name : student?.full_name,
    book_id: book?.book_id,
    book_name : book?.title,
    admin_id: '',
    admin_name:"admin",// replace when use authentication
    issue_date: today.toISOString().split("T")[0],
    return_date: '',
    status: 'issued',
  };

  const handleSubmit = async (values) => {
    // Handle issue transaction logic here
    console.log('Issued Transaction:', values);
    let x = await axiosInstance.post("/transaction/addTransaction",values);
    console.log(x);
    navigate("/librarian/transactions/");
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="student_id">Student ID</label>
          <Field type="number" id="student_id" name="student_id" disabled/>
          <ErrorMessage name="student_id" component="div" />
        </div>

        <div>
          <label htmlFor="book_id">Book ID</label>
          <Field type="number" id="book_id" name="book_id" disabled/>
          <ErrorMessage name="book_id" component="div" />
        </div>

        <div>
          <label htmlFor="admin_id">Admin ID</label>
          <Field type="number" id="admin_id" name="admin_id" />
          <ErrorMessage name="admin_id" component="div" />
        </div>

        <div>
          <label htmlFor="issue_date">Issue Date</label>
          <Field type="date" id="issue_date" name="issue_date" disabled/>
          <ErrorMessage name="issue_date" component="div" />
        </div>

        <div>
          <label htmlFor="return_date">Return Date</label>
          <Field type="date" id="return_date" name="return_date" />
          <ErrorMessage name="return_date" component="div" />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <Field type="text" id="status" name="status" />
          <ErrorMessage name="status" component="div" />
        </div>

        <button type="submit">Issue Book</button>
      </Form>
    </Formik>
    </>
  );
};

export default TransactionForm;
