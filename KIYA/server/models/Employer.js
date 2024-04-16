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
  feedbackRequests: {
    type: [
      {
        employeeid: {
          type: Number,
        },
        taskTitle: {
          type: String,
        },
        skills: {
          type: [
            {
              name: {
                type: String,
              },
              boost: {
                type: Number,
              },
            },
          ],
        },
      },
    ],
    default: [],
  },
});

const Employer = mongoose.model("Employer", employerSchema);
export default Employer;
