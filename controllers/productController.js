const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");

const createProduct = async(req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    company,
    colors,
    featured,
    freeShipping,
    inventory,
  } = req.body;
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({product});

};
const getAllProducts = async(req, res) => {
  res.send("getAllProducts");
};
const getSingleProduct = async(req, res) => {
  res.send("getSingleProduct");
};
const updateProduct = async(req, res) => {
  res.send("updateProduct");
};
const deleteProduct = async(req, res) => {
  res.send("deleteProduct");
};
const uploadImage = async(req, res) => {
  res.send("uploadImage");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
  deleteProduct
};
