import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axios/AxiosInstance';

const StudentList = () => {
    // const students =[
    //     // {
    //     //   "id": 1,
    //     //   "roll_number": "S001",
    //     //   "full_name": "John Doe",
    //     //   "email": "john.doe@example.com",
    //     //   "username": "john_doe",
    //     //   "hashed_password": "hashedpassword123",
    //     //   "branch": "Computer Science",
    //     //   "year": 2,
    //     //   "address": "123 Main Street, Cityville"
    //     // },
    //     // {
    //     //   "id": 2,
    //     //   "roll_number": "S002",
    //     //   "full_name": "Jane Smith",
    //     //   "email": "jane.smith@example.com",
    //     //   "username": "jane_smith",
    //     //   "hashed_password": "hashedpassword456",
    //     //   "branch": "Electrical Engineering",
    //     //   "year": 3,
    //     //   "address": "456 Oak Avenue, Townsville"
    //     // },
    //     // {
    //     //   "id": 3,
    //     //   "roll_number": "S003",
    //     //   "full_name": "Bob Johnson",
    //     //   "email": "bob.johnson@example.com",
    //     //   "username": "bob_johnson",
    //     //   "hashed_password": "hashedpassword789",
    //     //   "branch": "Mechanical Engineering",
    //     //   "year": 1,
    //     //   "address": "789 Pine Road, Villagetown"
    //     // }
    //   ]

    const [students, setStudents] = useState([]);

    useEffect(() => {
      async function myFn() {
        try {
          let response = await axiosInstance.get("/auth/admin/getAllStudents");
          console.log(response);
          setStudents(response.data.list);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    
      myFn();
    }, []);
      
  return (
    <div>
      <h2>Student List</h2>
      {/* <Link to="add">Add Student</Link> */}
      <table border="1">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Full Name</th>
            {/* <th>Email</th> */}
            {/* <th>Username</th> */}
            <th>Branch</th>
            <th>Year</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {students?.map((student) => (
            <tr key={student?.roll_number}>
              <td>{student?.roll_number}</td>
              <td>{student?.full_name}</td>
              {/* <td>{student.email}</td> */}
              {/* <td>{student.username}</td> */}
              <td>{student?.branch}</td>
              <td>{student?.year}</td>
              {/* <td>
                <Link to={`view/${student.id}`}>View</Link>{' '}
                <Link to={`edit/${student.id}`}>Edit</Link>{' '}
                <Link to={`delete/${student.id}`}>Delete</Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
