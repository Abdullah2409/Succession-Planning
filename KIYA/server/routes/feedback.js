import express from "express";
// Importing express module

import {
  getFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";
// Importing the controller functions

// creating router instance
const router = express.Router();

// For getting feedback
router.get("/", getFeedback);

// For posting feedback about an employee
router.post("/", addFeedback);

// For updating feedback of an employee
router.patch("/:id", updateFeedback);

// For deleting feedback for an employee
router.delete("/:id", deleteFeedback);

// Exporting router instance so it can be used elsewhere in the application
export default router;
