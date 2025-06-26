import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/User";
import { Token } from "../entities/Token";
import { Report } from "../entities/Report";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "123",
  database: process.env.DATABASE_NAME || "user_management",
  synchronize: process.env.NODE_ENV !== "production", // Auto-create database schema in development.
  logging: process.env.NODE_ENV !== "production",
  entities: [User, Token, Report],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  schema: "public"
});

export const initializeDatabase = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log("Database connection established successfully");
    } catch (error) {
        console.error("Error during database initialization", error);
        throw error;
    }
};
