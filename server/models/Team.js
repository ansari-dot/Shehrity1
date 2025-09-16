import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    socialLinks: {
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        facebook: { type: String, default: "" },
    },
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);
