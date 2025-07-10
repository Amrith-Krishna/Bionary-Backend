import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  regNumber: String,
  password: String,
  lastLogin: Date,
  failedLoginAttemptsToday: { type: Number, default: 0 },
});

export const Admin = mongoose.model("Admin", adminSchema);
