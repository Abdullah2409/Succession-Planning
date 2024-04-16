import Program from "../models/Program.js";

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const program = await Program.findById(id);
    res.status(200).json(program);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
