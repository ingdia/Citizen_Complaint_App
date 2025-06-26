import * as express from "express";
import { Roles } from "../roles";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: Roles;
      };
    }
  }
}
