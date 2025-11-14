const express = require("express");
const User = require("../models/usermodels");
const catchAsyncerrorhandler = require("../middleware/asyncerrorhandler");
const Errorhandler = require("../utlis/errorhandler");
const GetToken = require("../utlis/gettoken");
const crypto = require("crypto");

// Register user
exports.register = catchAsyncerrorhandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log(name,email,password,role);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new Errorhandler("Email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
console.log(user);
  GetToken(user, 201, res);
  


});

// Login user
exports.loginuser = catchAsyncerrorhandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  // Compare password
  const isPasswordMatched = await user.comparingpass(password);
  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
    console.log(user);
  GetToken(user, 200, res);
  
});

// Logout
exports.logout = catchAsyncerrorhandler(async (req, res, next) => {
  res.cookie("Token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get user details
exports.userdetails = catchAsyncerrorhandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
