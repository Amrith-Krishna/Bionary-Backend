import mongoose, { Mongoose } from "mongoose";

const eventSchema = new Mongoose.schema({
  title: String,
  imagePath: String,
  description: String,
  department: String,
  date: Date,
  coordinators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Event = new mongoose.model("Event", eventSchema);
