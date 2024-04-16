import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled Task",
  },
  description: {
    type: String,
    default: "No description",
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  employerid: {
    type: Number,
    required: true,
  },
  employeeid: {
    type: Number,
    required: true,
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
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
