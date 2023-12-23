const getAllUsers = (req, res) => {
  res.send("getting all users");
};
const getSingleUser = (req, res) => {
  res.send("get single users");
};
const showCurrentUser = (req, res) => {
  res.send("showCurrentUser");
};
const updateUser = (req, res) => {
  res.send("updateUser");
};
const updateUserPassword = (req, res) => {
  res.send("updateUserPassword");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  showCurrentUser,
  updateUserPassword,
};
