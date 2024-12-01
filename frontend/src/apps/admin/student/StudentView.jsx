import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StudentView = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    "id": 1,
    "roll_number": "S001",
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "username": "john_doe",
    "hashed_password": "hashedpassword123",
    "branch": "Computer Science",
    "year": 2,
    "address": "123 Main Street, Cityville"
  });

//   useEffect(() => {
//     // Simulate fetching student data from an API
//     const fetchStudentData = async () => {
//       try {
//         const response = await fetch(`API_ENDPOINT/students/${id}`);
//         const data = await response.json();
//         setStudent(data);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       }
//     };

//     fetchStudentData();
//   }, [id]);

  return (
    <div>
      <h2>Student View - ID: {id}</h2>
      {student ? (
        <div>
          <p>Roll Number: {student.roll_number}</p>
          <p>Full Name: {student.full_name}</p>
          <p>Email: {student.email}</p>
          <p>Username: {student.username}</p>
          <p>Branch: {student.branch}</p>
          <p>Year: {student.year}</p>
          <p>Address: {student.address}</p>
        </div>
      ) : (
        <p>Loading student data...</p>
      )}
    </div>
  );
};

export default StudentView;
