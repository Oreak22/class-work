const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");

const signin = (req, res) => {
  res.render("signin");
};
const loginform = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  console.log(req.body);

  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res
        .status(400)
        .json({ message: "go away from me for i do not know you" });
    }

    const verify = await bcrypt.compare(req.body.password, user.password);

    console.log(verify);

    if (verify) {
      res.status(200).send({ message: "my guy its been a while" });
    } else {
      res.status(401).send({ message: "you are a bad person, shuuuu" });
    }

    res.send("i dey work");
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  console.log(req.body);
  // const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // console.log(req.body, hashedPassword);
  // const { password, ...therest } = req.body;

  // console.log(therest);

  try {
    // const newUser = new userModel({ password: hashedPassword,  ...therest });
    const newUser = new userModel(req.body);

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.redirect("/auth/alluser");
  } catch (err) {
    console.log(err);
  }
};

const allUser = async (req, res) => {
  try {
    const allUser = await userModel.find();
    // res.render("records", { allUser });
    res.json(allUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signin, register, allUser, login, loginform };
