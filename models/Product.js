const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, "please provide a price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "please provide a description"],
      maxlength: [1000, "Name can not be more than 1000 characters"],
    },
    image: {
      type: String,
      required: true,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "please provide a category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "please provide a company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default:['#222'],
      required: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    freeShipping: {
      type: Boolean,
      default: true,
    },
    inventory: {
      type: Number,
      default: 0,
      required: [true, "please provide an inventory"],
    },
    averageRating: {
      type: Number,
      default: 0,

      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model('Product', ProductSchema)