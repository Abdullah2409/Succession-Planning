import express from "express";
// Importing express module

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  signin,
} from "../controllers/userController.js";

const router = express.Router();

// For getting a user
router.get("/", getUsers);

// For creating a user
router.post("/", createUser);

// For updating an existing user
router.patch("/:id", updateUser);

// For deleting an existing user
router.delete("/:id", deleteUser);

// For signing in
router.post("/signin", signin);

export default router;
