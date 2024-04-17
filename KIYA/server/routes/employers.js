import express from "express";

import {
  getEmployers,
  getEmployer,
  createEmployer,
  updateEmployer,
  deleteEmployer,
} from "../controllers/employerController.js";

const router = express.Router();

// For getting employer
router.get("/", getEmployers);

// For getting employer by ID
router.get("/:id", getEmployer);

// For making new employer
router.post("/", createEmployer);

// FOr getting employer by ID
router.patch("/:id", updateEmployer);

// For deleting employer by ID
router.delete("/:id", deleteEmployer);

export default router;
