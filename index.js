const express = require("express");
const app = express();
// const mongoose =  require('m')

// const env = require("dotenv");
// env.config();
require("dotenv").config();

const port = process.env.port;
const DBURI = process.env.mongoDB_URI;

app.set("view engine", "ejs");

const user = [
  {
    firstName: "Bambam",
    lastName: "Mobolaji",
    age: 21,
    level: "level Three",
  },
];

app.get("/user", (req, res) => {
  res.send(user);
});



app.listen(port, () => {
  console.log(`working fine on port ${port}`);
});
