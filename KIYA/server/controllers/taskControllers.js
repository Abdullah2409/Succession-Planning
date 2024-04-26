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

export const incompleteTasks = async (req, res) => {
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
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.isCompleted = true

    await task.save()

    // update the employer's feedbackRequests array
    const employer = await Employer.findOne({ employerid: task.employerid });
    employer.feedbackRequests.push({
      employeeid: task.employeeid,
      taskTitle: task.title,
      skills: task.skills,
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


export const addTask = async (req, res) => {
  try {
    console.log(req.body)
    const { title, description, deadline, employerid } = req.body;
    
    // deadline = new Date(req.body.deadline);
    console.log( title, description, deadline, employerid)
    const newTask = new Task({
      title,
      description,
      deadline,
      employerid, 
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateEmployeeId = async (req, res) => {
  // console.log(req.body)
  const { taskId } = req.params;
  // const { employeeId } = req.body;
  // console.log(taskId, req.body.employeeid )
  try {
    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the employee ID of the task
    task.employeeid = req.body.employeeid
    task.skills = req.body.skills

    // Save the updated task
    const updatedTask = await task.save();
    // console.log(updatedTask)

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update employee ID of the task", error: error.message });
    console.error("Error updating employee ID of the task:", error);
  }
};