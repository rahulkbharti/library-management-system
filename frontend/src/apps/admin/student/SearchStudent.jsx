import React, { useState } from 'react';
import axiosInstance from '../../../axios/AxiosInstance';


const SearchStudentByRollNumber = ({ setStudent }) => {
  const [rollNumber, setRollNumber] = useState('');
  // const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Assuming there's a function to search for a student by roll number
      const response = await axiosInstance.get('/auth/admin/getStudent', { "roll_number": rollNumber });
      //console.log(response);
      // Check if a student is found
      if (response.data && response.data.student) {
        setStudent(response.data.student);
        setError(null);
      } else {
        setStudent(null);
        setError('Student not found');
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setStudent(null);
      setError('Error searching for student');
    }
  };

  return (
    <div>
      <div>s
        <label htmlFor="rollNumber">Roll Number:</label>
        <input
          type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={handleRollNumberChange}
        />
      </div>

      <button onClick={handleSearch}>Search</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* {student && (
        <div>
          <h3>Student Details</h3>
          <p>Name: {student.name}</p>
          <p>Roll Number: {student.rollNumber}</p>
        
        </div>
      )} */}
    </div>
  );
};

export default SearchStudentByRollNumber;
