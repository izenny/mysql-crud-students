import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => {
        setStudentData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

 
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteuser/${id}`)
      .then((res) => {
        console.log(res.data);
        
        fetchStudents();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div>
         <div>
        <Link to={"/create"}>
          <button>Create User</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentData.length > 0 ? (
            studentData.map((student) => (
              <tr key={student.idstudents}>
                <td>{student.idstudents}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <Link to={`/read/${student.idstudents}`}>
                    <button>View</button>
                  </Link>
                  <Link to={`/edit/${student.idstudents}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(student.idstudents)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No students available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
