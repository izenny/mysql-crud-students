const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const { log } = require("console");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "root",
  database: "school",
});
app.post("/adduser", (req, res) => {
  const sql =
    "INSERT INTO students (name, email, age, gender) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json({ message: "Some error occurred: " + err });
    }
    return res.json({ success: "Student added successfully" });
  });
});

app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "fetching Error" });
    return res.json(result);
  });
});
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM students WHERE idstudents = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Student fetch error", error: err });
    }
    return res.json(result[0]);
  });
});
app.post("/edituser/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age, gender } = req.body;
  const sql =
    "UPDATE students SET name = ?, email = ?, age = ?, gender = ? WHERE idstudents = ?";

  const values = [name, email, age, gender, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing update query:", err);
      return res.json({ message: "Some error occurred: " + err });
    }

    return res.json({ success: "Student updated successfully" });
  });
});
app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM students WHERE idstudents = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error executing delete query:", err);
      return res.json({ message: "Some error occurred: " + err });
    }
    return res.json({ success: "Student deleted successfully" });
  });
});
app.listen(port, () => {
  console.log("sever started");
});
