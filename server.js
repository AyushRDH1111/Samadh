import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import teacherRoutes from "./routes/teacher.js";
import bookingRoutes from "./routes/booking.js";
import paymentRoutes from "./routes/payment.js";
import assessmentRoutes from "./routes/assessment.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL?.split(',') || true, credentials: true }));
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI, { })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((e) => console.error("Mongo connection error:", e.message));

// Health
app.get("/health", (_, res) => res.json({ ok: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/teachers", teacherRoutes);
app.use("/bookings", bookingRoutes);
app.use("/payments", paymentRoutes);
app.use("/assessment", assessmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API running on :${PORT}`));
