const mongoose = require("mongoose");

const SingleCartItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: [true, "please enter tax fee"],
    },
    shippingFee: {
      type: Number,
      required: [true, "please enter shipping Fee "],
    },
    subtotal: {
      type: Number,
      // required: [true, "please enter total fee"],
    },
    total: {
      type: Number,
      // required: [true, "please enter total fee"],
    },
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    cartItems: [SingleCartItemSchema],
    clientSecret: {
      type: String,
      // required: [true, "please enter client Secret"],
    },
    paymentId: {
      type: String,
      // required: [true, "please enter paymentId "],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
