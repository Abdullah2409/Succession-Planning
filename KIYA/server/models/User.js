import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
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
});

const User = mongoose.model("User", userSchema, "users");
export default User;
