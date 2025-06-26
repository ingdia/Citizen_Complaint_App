import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { initializeDatabase } from "./config/db";
import reportRoutes from "./routes/reportRoutes";
import adminRoutes from "./routes/adminRoutes";
import departmentRoutes from "./routes/departmentRoutes";

// Load env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Health check
app.get("/", (_req, res) => {
  res.send("Citizen Complaint API is running");
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/admin", adminRoutes);
app.use("/departments", departmentRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(port, () => {
      console.log(`Server running on http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();
