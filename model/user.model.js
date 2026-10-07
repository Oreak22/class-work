const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { required: true, type: String, trim: true, minlength: 2 },
    lastName: { required: true, type: String, minlength: 2 },
    age: { required: true, type: Number },
    email: { required: true, type: String, unique: true, lowercase: true },
    phone: { required: true, type: String },
    password: { required: true, type: String },
    gender: { type: String, enum: ["female", "male"], required: true },
    verificationStatus: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
