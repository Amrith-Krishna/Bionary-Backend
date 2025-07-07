import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
    numUsers: Number,
    growth: Number,
    pullRequestsMerged: Number,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}]
})

export const Dashboard = mongoose.model("Dashboard", dashboardSchema)