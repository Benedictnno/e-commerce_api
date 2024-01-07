const express = require("express");
const {
  getAllOrders,
  createOrder,
  getCurrentUseOrders,
  updateOrder,
} = require("../controllers/OrderController");
const {
  authenticate,
  authorizePermissions,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/")
  .get([authenticate], getAllOrders)
  .post([authenticate], createOrder);
router.route("/showAllMyOrders").get([authenticate], getCurrentUseOrders);
router.route("/:id").patch([authenticate], updateOrder);

module.exports = router;
