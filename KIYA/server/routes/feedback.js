import express from "express";

import {
  getFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackByEmployee,
} from "../controllers/feedbackController.js";

const router = express.Router();

// For getting feedback
router.get("/", getFeedback);

// For getting feedback by employee
router.get("/employee/:id", getFeedbackByEmployee);

// For posting feedback about an employee
router.post("/", addFeedback);

// For updating feedback of an employee
router.patch("/:id", updateFeedback);

// For deleting feedback for an employee
router.delete("/:id", deleteFeedback);

export default router;
