const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const Unauthorized = require("./unauthorized");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  Unauthorized,
  BadRequestError,
};
