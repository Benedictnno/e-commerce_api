const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "please provide a comment title"],
      maxlength: 100,
    },
    comment: {
      type: String,

      required: [true, "please provide a valid comment"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: {
          $avg: "$rating",
        },
        numberOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numberOfReviews: result[0]?.numberOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("reviews", ReviewSchema);
