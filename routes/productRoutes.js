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
const router = express.Router();

router
  .route("/createProduct")
  .post(authenticate, authorizePermissions, createProduct);
router.route("/getAllProducts").get(getAllProducts);
router
  .route("/updateProduct")
  .patch(authenticate, authorizePermissions, updateProduct);
router
  .route("/deleteProduct")
  .delete(authenticate, authorizePermissions, deleteProduct);
router
  .route("/uploadImage")
  .post(authenticate, authorizePermissions, uploadImage);

router.route("/getSingleProduct/:id").get(getSingleProduct);

module.exports = router;
