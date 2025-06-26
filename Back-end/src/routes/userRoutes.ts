import express from "express";
import {
  getUserById,
  getMe,
  updateUser,
  deleteUser,
  changePassword,
} from "../controllers/userControllers";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

// Authenticated user routes
router.get("/me", authenticate, getMe);
router.patch("/me/password", authenticate, changePassword);

// Admin routes or user self-service
router.get("/:id", authenticate, getUserById);
router.patch("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
