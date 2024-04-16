import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Coding",
  },
  levels: {
    type: {
      beginner: {
        type: Number,
        default: 0,
      },
      intermediate: {
        type: Number,
      },
      advanced: {
        type: Number,
      },
    },
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
