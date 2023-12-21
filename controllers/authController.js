const UserModel = require("../models/User");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const emailAlreadyExist = await UserModel.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already in use");
  }
  const isFirstAccount = (await UserModel.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await UserModel.create({ email, password, name, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = UserModel.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("incorrect password");
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie('token',"logOut",{
     httpOnly: true,
    expires: new Date(Date.now()),
    secure:process.env.NODE_ENV === "production",
    signed:true,
  });
};

module.exports = { register, login, logout };
