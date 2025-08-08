import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: String,
  experience: Number,
  specialties: [String],
  location: String,
  bio: String,
  pricePerSession: Number,
  availability: [{
    date: String, // ISO date (YYYY-MM-DD)
    slots: [String] // e.g. "09:00","10:00"
  }],
  rating: { type: Number, default: 5.0 }
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
