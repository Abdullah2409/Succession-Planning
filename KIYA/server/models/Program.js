import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
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
  url: {
    type: String,
    default: "",
  },
});

const Program = mongoose.model("Program", ProgramSchema);
export default Program;
