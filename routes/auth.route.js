const express = require("express");
const {
  signin,
  allUser,
  register,
  login,
  loginform,
  dashboard,
} = require("../controllers/authentication.controller");
const router = express.Router();

router.get("/signin", signin);
router.post("/register", register);
router.post("/login", login);
router.get("/loginform", loginform);

router.get("/allUser", allUser);

router.get("/dashboard", dashboard);

module.exports = router;
