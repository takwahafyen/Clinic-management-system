const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  });
};

module.exports.verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return next(createError(403, "You are not allowed to do that!"));
    }
    next();
  };
};
