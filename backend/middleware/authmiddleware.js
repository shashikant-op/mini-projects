const Error_handler = require("../utlis/errorhandler");
const asyncerrorhandler = require("../middleware/asyncerrorhandler");
const jwt = require("jsonwebtoken");

const User = require("../models/usermodels");

exports.isauthenticated = asyncerrorhandler(async (req, res, next) => {
  let Token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    Token = req.headers.authorization.split(" ")[1];
  }

  if (!Token) {
    console.log("No Token");
    return next(new Error_handler("Login first to access this resource", 401));
  }

  const decodeData = jwt.verify(Token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeData.id);

  next();
});

// Role authorization
exports.authrole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error_handler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
