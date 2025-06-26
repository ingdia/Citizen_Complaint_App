import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/db";
import { sendVerificationEmail, sendResetPasswordEmail } from "../utils/email";
import {
  ConflictError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} from "../utils/errors";
import { User } from "../entities/User";
import { Roles } from "../types/roles";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Signup request body:", req.body);
    const { name, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existing = await userRepository.findOneBy({ email });
    if (existing) {
      console.log("Email already in use:", email);
      throw new ConflictError("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: Roles.USER,
    });
    console.log("Created user entity:", user);
    await userRepository.save(user);
    console.log("User saved to database:", user);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    await sendVerificationEmail(email, token);

    res
      .status(201)
      .json({ message: "User created. Please verify your email." });
  } catch (err) {
    console.error("Signup error:", err);
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Accept token from query params for GET request
    const token = (req.method === "GET" ? req.query.token : req.body.token) as string;
    if (!token) throw new BadRequestError("Verification token is required");

    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestError("User not found");

    if (user.isEmailVerified) {
      res.send("Your email is already verified. You can now log in.");
      return;
    }

    user.isEmailVerified = true;
    await userRepository.save(user);

    res.send("Email verified successfully. You may now log in.");
  } catch (err) {
    console.error(err);
    next(new BadRequestError("Invalid or expired verification token"));
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user) throw new NotFoundError("User not found");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "15m",
    });
    await sendResetPasswordEmail(email, token);

    res.json({ message: "Reset link sent to your email." });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.update(userId, { password: hashedPassword });

    res.json({ message: "Password has been reset." });
  } catch (err) {
    next(new BadRequestError("Invalid or expired token"));
  }
};
