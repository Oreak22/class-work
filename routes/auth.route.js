const express = require("express");
const {
  signin,
  allUser,
  register,
  login,
  loginform,
} = require("../controllers/authentication.controller");
const router = express.Router();

router.get("/signin", signin);
router.post("/register", register);
router.post("/login", login);
router.get("/loginform", loginform);

router.get("/allUser", allUser);

module.exports = router;
