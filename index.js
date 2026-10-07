const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./model/user.model");
require("dotenv").config();

const port = process.env.port;
const DBURI = process.env.mongoDB_URI;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

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

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const newUser = new userModel(req.body);

    const savedUser = await newUser.save();
    console.log(savedUser);
  } catch (err) {
    console.log(err);
  }
});

app.get("/allUser", async (req, res) => {
  try {
    const allUser = await userModel.find();
    res.render("records", { allUser });
    // res.json(allUser);
  } catch (err) {
    console.log(err);
  }
});

app.post("/dbuser", async (req, res) => {
  try {
    const user = await userModel.findOne({ firstName: req.body.searchinput });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.get("/editform", async (req, res) => {
  try {
    const PrevRecord = await userModel.findOne({
      email: "benexyteg@mailinator.com",
    });
    res.render("edit", { PrevRecord });
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  console.log(req.body);
  try {
    await userModel.findOneAndUpdate({ email: req.body.email }, req.body);

    res.redirect("/allUser");
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect(DBURI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log({ message: "problem ti wa o", err });
  });

app.listen(port, () => {
  console.log(`working fine on port ${port}`);
});
