import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((res) => {
        setStudent(res.data); 
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/edituser/${id}`, student)
      .then((res) => {
        navigate("/");
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Edit User </h1>
      <div>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            value={student.name}
            type="text"
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            value={student.email}
            type="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <input
            value={student.gender}
            type="text"
            name="gender"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            value={student.age}
            type="number"
            name="age"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
