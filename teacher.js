import express from "express";
import Teacher from "../models/Teacher.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// List teachers
router.get("/", async (req, res) => {
  const items = await Teacher.find().sort({ createdAt: -1 });
  res.json(items);
});

// Upsert teacher profile (teacher-only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "teacher") return res.status(403).json({ message: "Forbidden" });
  const data = { ...req.body, userId: req.user.id };
  const existing = await Teacher.findOne({ userId: req.user.id });
  const doc = existing ? await Teacher.findOneAndUpdate({ userId: req.user.id }, data, { new: true }) : await Teacher.create(data);
  res.json(doc);
});

// Get single teacher
router.get("/:id", async (req, res) => {
  const doc = await Teacher.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
});

export default router;
