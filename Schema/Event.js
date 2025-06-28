import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  department: String,
  venue: String,
  startDate: Date,
  endDate: Date,
  description: String,
  imagePath: String,
});

export const Event = mongoose.model("Event", eventSchema);
