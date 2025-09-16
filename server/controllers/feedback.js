import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

class FeedBackController {
    // Add feedback to User
    async addFeedback(req, res) {
        try {
            const { name, email, subject, message } = req.body;

            if (!name || !email || !subject || !message) {
                return res.status(400).json({
                    message: "Please fill in all fields",
                    success: false
                });
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Please enter a valid email address",
                    success: false
                });
            }

            const existingEmail = await Feedback.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({
                    message: "You have already submitted feedback with this email",
                    success: false
                });
            }

            const newFeedback = await Feedback.create({ name, email, subject, message });

            return res.status(201).json({
                message: "Feedback submitted successfully! We'll get back to you soon.",
                data: newFeedback,
                success: true
            });

        } catch (err) {
            console.error(`Internal Server Error: ${err}`);
            return res.status(500).json({
                message: "Internal server error. Please try again later.",
                success: false
            });
        }
    }

    // Get all feedback (admin only)
    async getFeedback(req, res) {
        const userId = req.user.id;

        try {
            const existingUser = await User.findById(userId);
            if (!existingUser || existingUser.role !== "admin") {
                return res.status(403).json({
                    message: "You are not authorized to see the feedbacks",
                    success: false
                });
            }

            const feedbacks = await Feedback.find().sort({ createdAt: -1 });
            return res.status(200).json({
                message: "Feedback retrieved successfully",
                data: feedbacks,
                success: true
            });

        } catch (err) {
            console.error(`Internal Server Error: ${err}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }

    // Delete feedback (admin only)
    async deleteFeedback(req, res) {
        const userId = req.user.id;
        const { feedbackId } = req.params;

        try {
            const existingUser = await User.findById(userId);
            if (!existingUser || existingUser.role !== "admin") {
                return res.status(403).json({
                    message: "You are not authorized to delete feedback",
                    success: false
                });
            }

            const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
            if (!deletedFeedback) {
                return res.status(404).json({
                    message: "Feedback not found",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Feedback deleted successfully",
                success: true
            });

        } catch (err) {
            console.error(`Internal Server Error: ${err}`);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }
}
export default new FeedBackController();