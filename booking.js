import express from "express";
import Booking from "../models/Booking.js";
import Teacher from "../models/Teacher.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  try {
    if (req.user.role !== "student") return res.status(403).json({ message: "Forbidden" });
    const { teacherId, date, time, pricePaid, currency } = req.body;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    const booking = await Booking.create({
      studentId: req.user.id, teacherId, date, time, status: "confirmed",
      pricePaid: pricePaid || teacher.pricePerSession, currency: currency || "INR"
    });
    res.json({ message: "Booking created", booking });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/my", auth, async (req, res) => {
  if (req.user.role !== "student") return res.status(403).json({ message: "Forbidden" });
  const items = await Booking.find({ studentId: req.user.id }).populate("teacherId");
  res.json(items);
});

export default router;
