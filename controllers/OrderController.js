const Product = require("../models/Product");
const Order = require("../models/Order");
const CustomError = require("../errors");
const checkPermissions = require("../utils/checkPermissions");
const { StatusCodes } = require("http-status-codes");

const fakeStripeAPI = ({ amount, currency }) => {
  const client_secret = "somevalue";
  return { client_secret, amount };
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
      product: _id,
    };
    // add each item to order item
    orderItems = [...orderItems, singleOrderItem];
    // add up the price of each item
    subtotal += item.amount * price;
  }

  // calculate total
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json(orders);
};

const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const orders = await Order.findOne({ _id: id });
  if (!orders) {
    throw new CustomError.NotFoundError(`no order with an id of ${id}`);
  }
  checkPermissions(req.user, orders.user);
  res.status(StatusCodes.OK).json(orders);
};

const getCurrentUseOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {paymentIntentId}=req.body
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new CustomError.NotFoundError(`no order with an id of ${id}`);
  }
  checkPermissions(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = 'paid'
  await order.save()
  res.status(StatusCodes.OK).json(order);
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUseOrders,
  createOrder,
  updateOrder,
};
