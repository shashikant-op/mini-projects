const express = require("express");
const {
  register,
  loginuser,
  logout,
  userdetails
} = require("../controller/usercontroller");

const { isauthenticated } = require("../middleware/authmiddleware");

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", loginuser);
router.post("/logout", logout);
router.get("/me",isauthenticated,userdetails); 

module.exports = router;
