import express from "express";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getDepartmentEmployees,
  getEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/:id", getEmployee);
router.get("/department/:department", getDepartmentEmployees);

export default router;
