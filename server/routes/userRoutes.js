import express from "express";
import { register, login, logout, changePassword } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route example (if you want logout to be protected)
router.post("/logout", authenticate, logout);
router.post("/change-password", changePassword);

export default router;
