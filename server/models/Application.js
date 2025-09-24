// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: false // Made optional for public applications
  },
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Career", 
    required: true 
  },
  jobTitle: {
    type: String,
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: {
    type: String,
    required: true
  },
  cv: { 
    type: String, 
    required: true 
  },
  coverLetter: { 
    type: String,
    default: ''
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
}, { 
  timestamps: true 
});

export default mongoose.model("Application", applicationSchema);
