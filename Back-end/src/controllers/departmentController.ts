import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import { BadRequestError, NotFoundError } from "../utils/errors";

export const getAllUsers = async (
  _req: Request,
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
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

export const createStaffAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, departmentId } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestError("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STAFF",
        departmentId,
      },
    });
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const assignReport = async (
  req: Request,
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

    res.json({ success: true, report });
  } catch (err) {
    next(err);
  }
};

export const updateReportStatusByAdmin = async (
  req: Request,
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

    res.json({ success: true, report });
  } catch (err) {
    next(err);
  }
};

export const respondToReport = async (
  req: Request,
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

    res.json({ success: true, report });
  } catch (err) {
    next(err);
  }
};

export const getDashboardStats = async (
  _req: Request,
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

    res.json({ success: true, totalReports, reportsByStatus, totalUsers });
  } catch (err) {
    next(err);
  }
};

export const getAllReports = async (
  _req: Request,
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

    res.json({ success: true, reports });
  } catch (err) {
    next(err);
  }
};

export const getAllDepartments = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        users: { select: { id: true, name: true, email: true } },
        reports: true,
      },
      orderBy: { name: "asc" },
    });
    res.json({ success: true, departments });
  } catch (err) {
    next(err);
  }
};

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    if (!name) throw new BadRequestError("Department name is required");

    const existing = await prisma.department.findUnique({ where { name } });
    if (existing) throw new BadRequestError("Department already exists");

    const department = await prisma.department.create({
      data: { name, description },
    });

    res.status(201).json({ success: true, department });
  } catch (err) {
    next(err);
  }
};

export const updateDepartment = async (
  req: Request,
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

    res.json({ success: true, department });
  } catch (err) {
    next(err);
  }
};
