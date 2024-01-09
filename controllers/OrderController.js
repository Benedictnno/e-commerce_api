const Product = require("../models/Product");
const Order = require("../models/Order");
const CustomError = require("../errors");
const checkPermissions = require("../utils/checkPermissions");
const { StatusCodes } = require("http-status-codes");

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
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee"
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product found with id : ${item.product}`
      );
    }
    const { name, price, image, _id } = dbProduct;

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: id,
    };

    orderItems= [...orderItems,singleOrderItem]
    subtotal += item.amount * price
  }
  req.body.user = req.user.userId;
  const order = await Order.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "done" });
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
