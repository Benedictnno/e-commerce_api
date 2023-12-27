const createProduct = (req, res) => {
  res.send("createProduct");
};
const getAllProducts = (req, res) => {
  res.send("getAllProducts");
};
const getSingleProduct = (req, res) => {
  res.send("getSingleProduct");
};
const updateProduct = (req, res) => {
  res.send("updateProduct");
};
const deleteProduct = (req, res) => {
  res.send("deleteProduct");
};
const uploadImage = (req, res) => {
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
