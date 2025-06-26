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
  toggleUserActivation,
  changeUserRole,
  searchUsers,
  exportReports,
} from "../controllers/adminController";
import { Roles } from "../types/roles";

const router = express.Router();

router.use(authenticate, authorize([Roles.SUPER_ADMIN]));

router.get("/users", getAllUsers); // Get all users
router.post("/users", createStaffAccount); // Create staff
router.patch("/users/:id/toggle-activation", toggleUserActivation); // Activate/Deactivate user
router.patch("/users/:id/role", changeUserRole); // Change role
router.get("/users/search", searchUsers); // Search users

router.get("/dashboard", getDashboardStats); // Stats

router.get("/reports", getAllReports); // All reports
router.patch("/reports/:id/assign", assignReport); // Assign to dept
router.patch("/reports/:id/status", updateReportStatusByAdmin); // Update status
router.patch("/reports/:id/response", respondToReport); // Admin response
router.get("/reports/export", exportReports); // Export reports

router.get("/departments", getAllDepartments); // View depts
router.post("/departments", createDepartment); // Add dept
router.patch("/departments/:id", updateDepartment); // Edit dept

export default router;
