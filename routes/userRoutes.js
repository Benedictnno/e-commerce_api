const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userControler");

router.route("/").get(getAllUsers);
router.route("/showMe").get(updateUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);
router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser);

module.exports = router;
