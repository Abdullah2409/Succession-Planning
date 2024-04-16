import Task from "../models/Task.js";
import Employer from "../models/Employer.js";

// @desc Get all tasks
// @route GET /tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
    console.error("Error fetching tasks:", error);
  }
};

// @desc Get a task by id
// @route GET /tasks/:id
export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch task", error: error.message });
    console.error("Error fetching task:", error);
  }
};

// @desc Update a task
// @route PATCH /tasks/:id
export const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

    // update the employer's feedbackRequests array
    const employer = await Employer.findOne({ employerid: task.employerid });
    employer.feedbackRequests.push({
      employeeid: task.employeeid,
      taskTitle: task.title,
    });
    await employer.save();

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
    console.error("Error updating task:", error);
  }
};
