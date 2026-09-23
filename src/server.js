import express from "express";
import connectionDB from "../config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import userRoutes from "./routes/userRoute.js";
import customerRoutes from "./routes/customerRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000", // React dev server (CRA)
  "https://saiteja-collection.netlify.app", // మీ deployed frontend
  "http://192.168.1.6:8080",
  "http://192.168.88.137:8080",
  "https://saiteja-collection-app.netlify.app",
  "http://localhost:51555",
  "http://192.168.1.4:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 3000;

const initialDBServerStart = async () => {
  try {
    // Assuming your connection export handles the .connect() logic
    await connectionDB;
    console.log("✅ Database connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // Stop the app if it can't connect to the DB
  }
};

initialDBServerStart();
