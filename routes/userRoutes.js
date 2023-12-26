const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserPassword,
  showCurrentUser,
} = require("../controllers/userControler");
const {
  authenticate,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticate, authorizePermissions("admin",), getAllUsers);
router.route("/show-me").get(authenticate, showCurrentUser);
router.route("/updateUser").patch(authenticate,updateUser);
router.route("/updateUserPassword").patch( authenticate, updateUserPassword);
router.route("/:id").get(authenticate, getSingleUser);

module.exports = router;
