require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const expressAsyncErrors = require("express-async-errors");
const morgan = require("morgan");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser")
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_PASS));
app.get("/", (req, res) => {
  res.send("e-commerce")
});

app.get("/api/v1/", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce");
});

app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter);
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
