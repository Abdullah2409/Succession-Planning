import express from "express";
import {
  getFeedback,
  addFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", getFeedback);
router.post("/", addFeedback);
router.patch("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;
