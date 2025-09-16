// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Career", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  cv: { type: String, required: true },
  coverLetter: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
