import express from "express";
import { authenticate, authorize } from "../middlewares/authorize";
import {
  getAllUsers,
  createStaffAccount,
  getDashboardStats,
  assignReport,
  updateReportStatusByAdmin,
  respondToReport,
  getAllReports,
  getAllDepartments,
  createDepartment,
  updateDepartment,
} from "../controllers/adminController";
import { Roles } from "../types/roles";

const router = express.Router();

router.use(authenticate, authorize([Roles.SUPER_ADMIN]));

router.get("/users", getAllUsers);
router.post("/users", createStaffAccount);

router.get("/dashboard", getDashboardStats);

router.get("/reports", getAllReports);
router.patch("/reports/:id/assign", assignReport);
router.patch("/reports/:id/status", updateReportStatusByAdmin);
router.patch("/reports/:id/response", respondToReport);

router.get("/departments", getAllDepartments);
router.post("/departments", createDepartment);
router.patch("/departments/:id", updateDepartment);

export default router;
