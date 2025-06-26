import { Request } from "express";
import { Roles } from "./roles";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: Roles;
  };
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}

export type UserRole = Roles;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
