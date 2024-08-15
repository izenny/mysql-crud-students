import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("Error fetching student data:", err));
  }, [id]);

  return (
    <div>
      <div>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
      {data ? (
        <div>
          <h1>Student Details</h1>
          <p>
            <strong>ID:</strong> {data.idstudents}
          </p>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Age:</strong> {data.age}
          </p>
          <p>
            <strong>Gender:</strong> {data.gender}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Read;
