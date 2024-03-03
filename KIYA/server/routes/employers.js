import express from "express";
import {
  getEmployers,
  createEmployer,
  updateEmployer,
  deleteEmployer,
} from "../controllers/employerController.js";

const router = express.Router();

router.get("/", getEmployers);
router.post("/", createEmployer);
router.patch("/:id", updateEmployer);
router.delete("/:id", deleteEmployer);

export default router;
