const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    // minlength: 6,
    // maxlength: 50,
  },
});

UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths());
  console.log(this.isModified('name'));

  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("Users", UserSchema);
