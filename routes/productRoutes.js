const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const {
  authenticate,
  authorizePermissions,
} = require("../middleware/authentication");
const { getSingleProductReviews } = require("../controllers/reviewController");
const router = express.Router();

router
  .route("/")
  .post([authenticate, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);
router
  .route("/uploadImage")
  .post([authenticate, authorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .delete([authenticate, authorizePermissions("admin")], deleteProduct)
  .patch([authenticate, authorizePermissions("admin")], updateProduct);

  
router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
