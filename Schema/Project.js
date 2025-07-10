import mongoose, { mongo } from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  techStack: [String],
  createdAt: Date,
  updatedAt: Date,
  commits: Number,
  pullRequests: Number,
  status: String,
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  topContributor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Project = mongoose.model("Project", projectSchema);
