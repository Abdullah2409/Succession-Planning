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
    // will remove this
    type: Number,
    default: 0,
  },
  trainingPrograms: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Program",
        },
        status: {
          type: String,
          default: "inprogress",
        },
      },
    ],
    default: [],
  },
  skills: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          default: "beginner",
        },
        points: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
