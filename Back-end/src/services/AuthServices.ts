import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJWT, generateResetToken, generateVerifyToken } from "../utils/jwt";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { sendVerificationEmail, sendResetPasswordEmail } from "../utils/email";
import { Roles } from "../types/roles";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async signup(name: string, email: string | null, password: string, role: Roles = Roles.USER) {
    try {
      if (!email) throw new Error("Email is required");
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) throw new Error("Email already in use");

      const hashedPassword = await bcrypt.hash(password, 10);

      // Ensure role is uppercase and valid
      const normalizedRole = Object.values(Roles).includes(role.toUpperCase() as Roles)
        ? (role.toUpperCase() as Roles)
        : Roles.USER;

      console.log("Normalized role before saving user:", normalizedRole);

      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: normalizedRole,
        isActive: true,
        isEmailVerified: false,
      });

      await this.userRepository.save(user);

      const token = generateVerifyToken({ userId: user.id, email: user.email! });
      await sendVerificationEmail(email, token);

      return { message: "User created, verification email sent" };
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Database operation failed");
    }
  }

  async login(email: string | null, password: string) {
    if (!email) throw new Error("Email is required");
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new Error("Invalid credentials");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    const token = generateJWT(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async verifyEmail(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      await this.userRepository.update(payload.userId, {
        isEmailVerified: true,
      });
      return { message: "Email verified successfully" };
    } catch {
      throw new Error("Invalid or expired token");
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new Error("User not found");

    const token = generateResetToken(email);
    await sendResetPasswordEmail(email, token);

    return { message: "Reset link sent" };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      const hashed = await bcrypt.hash(newPassword, 10);
      await this.userRepository.update(payload.userId, { password: hashed });
      return { message: "Password reset successful" };
    } catch {
      throw new Error("Invalid or expired token");
    }
  }
}
