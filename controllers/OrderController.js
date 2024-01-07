const getAllOrders = (req, res) => {
  res.res("getAllOrders");
};
const getSingleOrder = (req, res) => {
  res.res("getSingleOrder");
};
const getCurrentUseOrders = (req, res) => {
  res.res("getCurrentUseOrders");
};
const createOrder = (req, res) => {
  res.res("createOrder");
};
const updateOrder = (req, res) => {
  res.res("updateOrder");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUseOrders,
  createOrder,
  updateOrder,
};
