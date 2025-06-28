import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  regNumber: String,
  department: String,
});

export const Member = mongoose.model("Member", memberSchema);
