import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  regNumber: String,
  projects: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}],
  techStack: [String],
  isTopContributor: Boolean,
  activityLog: [{
    month: Date,
    commits: Number,
    pullRequests: Number,
    issuesResolved: Number
  }],
  leaderboardPoints: {type: Number, default: 0},
  department: String
});

export const User = mongoose.model("User", userSchema);
