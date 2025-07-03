import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  changeUserPassword,
  getAllUsers
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.get("/users/all", protect, adminOnly, getAllUsers);
router.put("/users/change-password/:id", protect, adminOnly, changeUserPassword);

export default router;
