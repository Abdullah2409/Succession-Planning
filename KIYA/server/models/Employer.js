import mongoose from "mongoose";

const employerSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  employerid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  datestarted: {
    type: Date,
    default: Date.now,
  },
});

const Employer = mongoose.model("Employer", employerSchema);
