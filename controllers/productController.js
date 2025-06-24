const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const CustomAPIError = require("../errors");
const uploadImages = require("../utils/uploadImages");
const cloudinary = require("cloudinary").v2;


const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  // Upload images and attach them to the product body
  if (req.files && req.files.Image) {
    const uploadedImages = await uploadImages(req.files.Image);
     
    req.body.images = uploadedImages; // Save image info in DB
  }

  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id }).populate("Review");
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
  await product.remove();
  res.status(StatusCodes.GONE).json({ msg: "Success! Product remove" });
};

cloudinary.config({
  cloud_name: "dw9wklkym",
  secure: true,
  api_key: process.env.CLOUDNARY_APIKEY,
  api_secret: process.env.CLOUDNARY_SECRET,
});

const deleteImages = async (req, res) => {
  const { public_ids } = req.body;

  if (!public_ids || !Array.isArray(public_ids) || public_ids.length === 0) {
    throw new CustomAPIError.BadRequestError(
      "An array of public_ids is required"
    );
  }

  try {
    const deleteResults = await Promise.all(
      public_ids.map(async (public_id) => {
        const result = await cloudinary.uploader.destroy(public_id);
        return {
          public_id,
          status: result.result === "ok" ? "deleted" : result.result,
        };
      })
    );

    res.status(200).json({
      message: "Image deletion process completed",
      results: deleteResults,
    });
  } catch (error) {
    console.error("Cloudinary Multiple Delete Error:", error);
    throw new CustomAPIError.InternalServerError("Failed to delete images");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteImages
};
