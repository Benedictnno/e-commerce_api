const agg = [
  {
    $match: {
      product: new ObjectId("659835de0605407468085b8a"),
    },
  },
  {
    $group: {
      _id: "$product",
      averageRating: {
        $avg: "$rating",
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];