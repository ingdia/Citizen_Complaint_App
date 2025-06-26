import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import { AuthenticatedRequest } from "../types/commonTypes";
import { Roles } from "../types/roles";

// Get all users
export const getAllUsers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Create new staff account
export const createStaffAccount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Roles.STAFF,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Toggle user activation (activate/deactivate)
export const toggleUserActivation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Change user role
export const changeUserRole = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (!Object.values(Roles).includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Search users by name or email (query param q)
export const searchUsers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;

    if (typeof q !== "string" || !q.trim()) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get dashboard statistics
export const getDashboardStats = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalReports = await prisma.report.count();
    const reportsByStatus = await prisma.report.groupBy({
      by: ["status"],
      _count: true,
    });
    const totalUsers = await prisma.user.count();

    res.json({
      totalReports,
      reportsByStatus,
      totalUsers,
    });
  } catch (error) {
    next(error);
  }
};

// Get all reports with user and department details
export const getAllReports = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        user: { select: { name: true, email: true } },
        department: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(reports);
  } catch (error) {
    next(error);
  }
};

// Assign a report to a department
export const assignReport = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reportId = Number(req.params.id);
    const { departmentId } = req.body;

    const report = await prisma.report.update({
      where: { id: reportId },
      data: { departmentId },
    });

    res.json(report);
  } catch (error) {
    next(error);
  }
};

// Update report status
export const updateReportStatusByAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reportId = Number(req.params.id);
    const { status } = req.body;

    const report = await prisma.report.update({
      where: { id: reportId },
      data: { status },
    });

    res.json(report);
  } catch (error) {
    next(error);
  }
};

// Respond to a report
export const respondToReport = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reportId = Number(req.params.id);
    const { response: adminResponse } = req.body;

    const report = await prisma.report.update({
      where: { id: reportId },
      data: { response: adminResponse },
    });

    res.json(report);
  } catch (error) {
    next(error);
  }
};

// Get all departments
export const getAllDepartments = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (error) {
    next(error);
  }
};

// Create a new department
export const createDepartment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const department = await prisma.department.create({
      data: { name, description },
    });
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

// Update a department
export const updateDepartment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = Number(req.params.id);
    const { name, description } = req.body;

    const department = await prisma.department.update({
      where: { id: departmentId },
      data: { name, description },
    });

    res.json(department);
  } catch (error) {
    next(error);
  }
};

// Export all reports as downloadable JSON
export const exportReports = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        user: { select: { name: true, email: true } },
        department: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.setHeader("Content-Disposition", "attachment; filename=reports.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(reports, null, 2));
  } catch (error) {
    next(error);
  }
};
