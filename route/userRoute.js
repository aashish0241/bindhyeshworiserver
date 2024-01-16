const express = require("express");
const {
  registerUser,
  logout,
  loginUser,
} = require("../controller/userController");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
