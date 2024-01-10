require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const expressAsyncErrors = require("express-async-errors");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const OrderRouter = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const ExpressMongoSanitize = require("express-mongo-sanitize");

const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(ExpressMongoSanitize())

// app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_PASS));
app.use(fileUpload());
app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.send("e-commerce");
// });

// app.get("/api/v1/", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("e-commerce");
// });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", OrderRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, (req, res) => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
