const express = require("express");
const {
  getAllOrders,
  createOrder,
  getCurrentUseOrders,
  updateOrder,
  getSingleOrder,
} = require("../controllers/OrderController");
const {
  authenticate,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/")
  .get([authenticate, authorizePermissions("admin")], getAllOrders)
  .post([authenticate], createOrder);
router.route("/showAllMyOrders").get([authenticate], getCurrentUseOrders);
router
  .route("/:id")
  .patch([authenticate], updateOrder)
  .get(authenticate, getSingleOrder);

module.exports = router;
