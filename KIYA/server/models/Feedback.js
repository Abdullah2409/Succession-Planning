import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  employerid: {
    type: Number,
    required: true,
  },
  employeeid: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
