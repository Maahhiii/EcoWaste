import express from "express";
import {
  getPendingVolunteers,
  approveVolunteer,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import { resetUserPassword } from "../controllers/userController.js";

const router = express.Router();

router.get("/pending-volunteers", protect, adminOnly, getPendingVolunteers);
router.put("/approve-volunteer/:id", protect, adminOnly, approveVolunteer);
router.put("/reset-password/:id", protect, adminOnly, resetUserPassword);

export default router;
