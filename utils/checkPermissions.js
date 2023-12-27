const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceId) => {
  if (
    requestUser.role === "admin" ||
    requestUser.userId === resourceId.toString()
  )
    return;
  throw new CustomError.Unauthorized("not authorized to access this route");
  // console.log(requestUser);
  // console.log(resourceId);
  // console.log(typeof resourceId);
};

module.exports = checkPermissions
