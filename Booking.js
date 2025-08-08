import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  date: String, // YYYY-MM-DD
  time: String, // HH:mm
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "confirmed" },
  meetingUrl: String,
  pricePaid: Number,
  currency: { type: String, default: "INR" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
