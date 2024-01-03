const express = require("express");
const {
  authenticate,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const router = express.Router();

router.route("/").get(getAllReviews).post(authenticate, createReview);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticate, updateReview)
  .delete(authenticate, deleteReview);


  module.exports = router



