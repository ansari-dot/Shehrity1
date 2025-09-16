import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    certificateUrl: { type: String, default: null },
    
    issuedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Certificate", certificateSchema);