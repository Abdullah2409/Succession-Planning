import express from "express";
import {
  getTasks,
  getTask,
  updateTask,
} from "../controllers/taskControllers.js";

const router = express.Router();

// For getting all tasks
router.get("/", getTasks);

// For getting a task by id
router.get("/:id", getTask);

// For updating a task
router.patch("/:id", updateTask);

export default router;
