import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  regNumber: String,
  memberID: { type: mongoose.Schema.Types.ObjectId, ref: "Member" }, //IF ANY
  position: String,
  lastLogin: Date,
});

export const Admin = mongoose.model("Admin", adminSchema);
