import mongoose from "mongoose";

const employerSchema = mongoose.Schema({
  employerid: {
    type: Number,
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
  profilepicture: {
    type: Object,
    default: {},
  },
  datestarted: {
    type: Date,
    default: Date.now,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Employer = mongoose.model("Employer", employerSchema);
export default Employer;
