import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { focus, experienceLevel, preferredStyle } = req.body;
  const teachers = await Teacher.find({ specialties: { $in: [focus, preferredStyle] } });
  const scored = teachers.map(t => {
    let score = 0;
    if (t.specialties.includes(focus)) score += 5;
    if (t.specialties.includes(preferredStyle)) score += 3;
    score += (t.experience || 0) >= 5 ? 2 : 1;
    return { teacher: t, score };
  }).sort((a,b)=>b.score-a.score);
  res.json(scored[0]?.teacher || null);
});

export default router;
