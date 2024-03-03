import express from "express";
// Importing the Express module

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getDepartmentEmployees,
  getEmployee,
} from "../controllers/employeeController.js";
// Importing the controller functions

// Creating a router instance
const router = express.Router();

// GET request for employees
router.get("/", getEmployees);

// Post request to adding employee
router.post("/", createEmployee);

// For updating employee information
router.patch("/:id", updateEmployee);

// For deleting an existing employee
router.delete("/:id", deleteEmployee);

// For getting an employee with a specific ID
router.get("/:id", getEmployee);

// For getting department
router.get("/department/:department", getDepartmentEmployees);

export default router;
