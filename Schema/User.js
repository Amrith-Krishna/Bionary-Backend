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
  }]
});

export const User = mongoose.model("User", userSchema);
