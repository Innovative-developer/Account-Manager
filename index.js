const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
app.use(bodyParser.json());
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Database connected successfully");
});

//create a new transaction

app.post("/api/create", (req, res) => {
  let data = {
    date: req.body.date,
    sender: req.body.sender,
    receiver: req.body.receiver,
    amount: req.body.amount,
  };
  let sql = "INSERT INTO transactions SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(err);
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "New transaction added",
      })
    );
  });
});

//show all transactions

app.get("/api/view", (req, res) => {
  let sql = "Select * from transactions";

  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(err);
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: result,
      })
    );
  });
});

app.listen(8000, () => {
  console.log("server is running");
});
