import express from "express";
import connectionDB from "../config/db.js";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoute.js";
import customerRoutes from "./routes/customerRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 1. రూట్లను ఎప్పుడూ సర్వర్ స్టార్ట్ అవ్వడానికి ముందే డిక్లేర్ చేయాలి 👇
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 3000;

const initialDBServer = async () => {
  try {
    await connectionDB;
    console.log("✅ Database connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// 2. సర్వర్‌ను చివర్లో రన్ చేయాలి
initialDBServer();
