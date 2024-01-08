const Product = require("../models/Product");
const Order = require("../models/Order");
const CustomError = require("../errors");
const checkPermissions = require("../utils/checkPermissions");

const getAllOrders = async (req, res) => {
  res.send("getAllOrders");
};

const getSingleOrder = async (req, res) => {
  res.send("getSingleOrder");
};

const getCurrentUseOrders = async (req, res) => {
  res.send("getCurrentUseOrders");
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("Now cart item");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError("Please provide tax and shipping fee");
  }


  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id ${productId}`);
  }
  const alreadySubmitted = await Order.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      `Already submitted a Order for this product`
    );
  }
  req.body.user = req.user.userId;
  const order = await Order.create(req.body);

  res.status(StatusCodes.CREATED).json({ order });
};

const updateOrder = async (req, res) => {
  res.send("updateOrder");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUseOrders,
  createOrder,
  updateOrder,
};
