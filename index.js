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

app.get("/api/viewall", (req, res) => {
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

//show transactions of a single user

app.get("/api/viewsingle/:name", (req, res) => {
  let name = req.params.name;
  let sql = `Select * from transactions where sender= '${name}' or receiver= '${name}' `;
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

//update transaction

app.put("/api/update/:id", (req, res) => {
  let sql =
    "UPDATE transactions SET date='" +
    req.body.date +
    "', receiver='" +
    req.body.receiver +
    "', amount='" +
    req.body.amount +
    "' where id=" +
    req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(err);
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "transaction updated successfully",
      })
    );
  });
});

//delete a transaction

app.delete("/api/delete/:id", (req, res) => {
  let sql = "Delete from transactions where id=" + req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(err);
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "transaction deleted successfully",
      })
    );
  });
});

app.listen(8000, () => {
  console.log("server is running");
});
