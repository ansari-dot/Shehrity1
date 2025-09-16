// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String,  required: true },
    salary: { type: String, required: true },
    posted: { type: String, default: "Today" },
    applyLink: { type: String, default: "https://www.google.com" },
  },
  { timestamps: true }
);

export default mongoose.model("Career", jobSchema);
