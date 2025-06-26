import { Request, Response, NextFunction } from "express";
import { ReportStatus } from "@prisma/client";
import { prisma } from "../config/prisma";
import { AuthenticatedRequest } from "../types/commonTypes";

export const createReport = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, category, isEmergency, location, imageUrl } =
      req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const report = await prisma.report.create({
      data: {
        title,
        description,
        category,
        isEmergency,
        location,
        imageUrl,
        status: ReportStatus.PENDING,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Report submitted successfully",
        report,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        user: { select: { name: true, email: true } },
        assignedTo: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    res.json({ success: true, reports });
  } catch (err) {
    next(err);
  }
};

export const getReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const report = await prisma.report.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        assignedTo: true,
      },
    });

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    res.json({ success: true, report });
  } catch (err) {
    next(err);
  }
};

export const getReportStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const total = await prisma.report.count();
    const resolved = await prisma.report.count({
      where: { status: ReportStatus.RESOLVED },
    });
    const inProgress = await prisma.report.count({
      where: { status: ReportStatus.IN_PROGRESS },
    });
    const pending = await prisma.report.count({
      where: { status: ReportStatus.PENDING },
    });

    res.json({
      success: true,
      stats: { total, resolved, inProgress, pending },
    });
  } catch (err) {
    next(err);
  }
};

export const updateReportStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(ReportStatus).includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const updated = await prisma.report.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json({ success: true, message: "Status updated", updated });
  } catch (err) {
    next(err);
  }
};
