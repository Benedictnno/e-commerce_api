const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const CustomAPIError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product)
    throw new CustomAPIError.NotFoundError(
      `Product with id of ${id} does not exist`
    );

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product)
    throw new CustomAPIError.NotFoundError(
      `Product with id of ${id} does not exist`
    );
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product)
    throw new CustomAPIError.NotFoundError(
      `Product with id of ${id} does not exist`
    );
    await product.remove()
  res.status(StatusCodes.GONE).json({ msg:'Success! Product remove' });
};

const uploadImage = async (req, res) => {
  res.send("uploadImage");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
};
