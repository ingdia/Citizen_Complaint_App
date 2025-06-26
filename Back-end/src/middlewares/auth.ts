import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Roles } from "../types/roles";

interface JwtPayloadWithUserId extends JwtPayload {
  userId: number;
  role?: Roles;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithUserId;
    if (typeof decoded === "string" || !decoded.userId) {
      res.status(403).json({ message: "Invalid token payload" });
      return;
    }
    req.user = {
      id: decoded.userId,
      email: "",
      role: decoded.role!,
    };
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const authorize = (roles: Roles[] | Roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    if (!req.user || !allowedRoles.includes(req.user.role!)) {
      res.status(403).json({ message: "Forbidden: Insufficient role" });
      return;
    }
    next();
  };
};
