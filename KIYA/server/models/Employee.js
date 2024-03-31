import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  employeeid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
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
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  profilepicture: {
    type: Object,
    default: {},
  },
  datestarted: {
    type: Date,
    default: Date.now,
  },
  dateupdated: {
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
  phonenumber: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  linesOfCode: {
    type: Number,
    default: 0,
  },
  trainingPrograms: {
    type: Number,
    default: 0,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
