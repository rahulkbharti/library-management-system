import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios/AxiosInstance';
import { Button, Stack } from '@mui/material';

const StudentissueBook = () => {
  // Assume transactions is an array of transaction objects fetched from an API
  const [transactions, setTransaction] = useState(null);


  useEffect(() => {
    async function myFn() {
      let x = await axiosInstance.get("/transaction/getAllTransactions")
      setTransaction(x.data.list);
    }
    myFn();
  }, []);

  return (
    <>
      {transactions && transactions.lenght > 0 && (
        <>
          <Stack direction={"row"} spacing={2} sx={{ justifyContent: "space-between", p: 1 }}>
            <h2>Book Issues History</h2>
          </Stack>
          <hr />
          <table border="1" width="600px">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name </th>
                <th>Book Name</th>
                <th>Admin Name</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_id}</td>
                  <td>{transaction.student_name}</td>
                  <td>{transaction.book_name}|{transaction.book_id}</td>
                  <td>{transaction.admin_name}</td>
                  <td>{transaction.issue_date.split("T")[0]}</td>
                  <td>{transaction.return_date.split("T")[0]}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default StudentissueBook;
