const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./model/user.model");
const { signin, register } = require("./controllers/authentication.controller");
require("dotenv").config();

const userRouter = require("./routes/auth.route");

const port = process.env.port;
const DBURI = process.env.mongoDB_URI;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const user = [
  {
    firstName: "Bambam",
    lastName: "Mobolaji",
    age: 21,
    level: "level Three",
  },
];

// app.get("/user",);

app.use("/auth", userRouter);

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

app.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await userModel.findByIdAndDelete(id);

    res.redirect("/allUser");
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
