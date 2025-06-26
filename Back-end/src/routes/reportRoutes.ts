import express from "express";
import {
  createReport,
  getReports,
  getReportById,
  getReportStats,
  updateReportStatus,
} from "../controllers/reportController";
import { authenticate, authorize } from "../middlewares/authorize";
import { Roles } from "../types/roles";

const router = express.Router();

// Public & Authenticated Access
router.get("/", getReports);
router.get("/stats", getReportStats);
router.get("/:id", getReportById);

// Authenticated users (e.g. Citizens)
router.post("/", authenticate, createReport);

// Only STAFF or SUPER_ADMIN can update report status
router.patch(
  "/:id/status",
  authenticate,
  authorize([Roles.STAFF, Roles.SUPER_ADMIN]),
  updateReportStatus
);

export default router;
