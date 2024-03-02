import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  // _id: Number,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String, // Employee or Employer
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema, "users");
export default User;
