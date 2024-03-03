import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  signin,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/signin", signin);

export default router;
