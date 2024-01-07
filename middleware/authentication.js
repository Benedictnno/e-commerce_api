const { isTokenValid } = require("../utils/jwt");
const CustomError = require("../errors");

const authenticate = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
  try {
    const { name, userId, role } = isTokenValid(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthenticatedError(
        "unauthorized access to this route"
      );
    }
    next();
  };
};


module.exports = { authorizePermissions, authenticate };
