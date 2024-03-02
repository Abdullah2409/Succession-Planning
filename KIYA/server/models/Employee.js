import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  employeeid: {
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
  interests: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  profilePicture: {
    type: String,
    default: "",
  },
  datestarted: {
    type: Date,
    default: Date.now,
  },
  dateseparated: {
    type: Date,
  },
  active: {
    type: Boolean, // Employer can deactivate employee
    default: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
