import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    obtainNumber: {
        type: Number,
        required: true,
    },
    totalNumber: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    certificate: {
        type: String,
        enum: ["applied", "notApplied", "Received"],
        required: true,
        default: "notApplied",
    },
    attempt: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true,
});

export default mongoose.model("Result", resultSchema);