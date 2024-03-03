import express from "express";
// Importing express module

import {
  getEmployers,
  createEmployer,
  updateEmployer,
  deleteEmployer,
} from "../controllers/employerController.js";
// Importing controller functions

const router = express.Router();
// creating router instance

// For getting employer
router.get("/", getEmployers);

// For making new employer
router.post("/", createEmployer);

// FOr getting employer by ID
router.patch("/:id", updateEmployer);

// For deleting employer by ID
router.delete("/:id", deleteEmployer);

// exporting router to be used elsewhere
export default router;
