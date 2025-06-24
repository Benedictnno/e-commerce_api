const cloudinary = require("cloudinary").v2;
const CustomAPIError = require("../errors"); // Adjust path

cloudinary.config({
  cloud_name: "dw9wklkym",
  secure: true,
  api_key: process.env.CLOUDNARY_APIKEY,
  api_secret: process.env.CLOUDNARY_SECRET,
});

const uploadImages = async (files) => {
  const fileArray = Array.isArray(files) ? files : [files];

  const uploadPromises = fileArray.map((file, index) => {
    if (!file.mimetype.startsWith("image")) {
      throw new CustomAPIError.BadRequestError("Only image files are allowed");
    }

    const publicId = `sparrow_${Date.now()}_${index}`;

    return cloudinary.uploader.upload(file.tempFilePath, {
      public_id: publicId,
      folder: "sparrow_images",
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    });
  });

  const uploadResults = await Promise.all(uploadPromises);

  return uploadResults.map((uploadResult) => ({
    
    image: cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
      width: 500,
      crop: "scale",
    }),
    public_id: uploadResult.public_id,
  }));
};

module.exports = uploadImages;
