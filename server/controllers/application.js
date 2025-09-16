// controllers/ApplicationController.js
import Result from "../models/Result.js";
import Application from "../models/Application.js";
import { sendApplicationAcceptanceEmail, sendApplicationRejectionEmail } from "../services/nodeMailer.js";

class ApplicationController {
  // Apply (user must pass quiz)
  static async apply(req, res) {
    try {
      const userId = req.user.id;
      const { jobId, name, email, coverLetter } = req.body;
      const cv = req.file ? req.file.path : null;

      if (!cv) return res.status(400).json({ message: "CV is required" });

      // 1. Check quiz result
      const result = await Result.findOne({ userId }).sort({ createdAt: -1 });
      if (!result || result.percentage < 80) {
        return res.status(403).json({ 
          message: "You must score at least 80% in the quiz to apply." 
        });
      }

      // 2. Save application
      const application = new Application({
        userId,
        jobId,
        name,
        email,
        cv,
        coverLetter,
      });
      await application.save();

      res.status(201).json({ message: "Application submitted successfully", application });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Get my applications (User only)
  static async getMyApplications(req, res) {
    try {
      const apps = await Application.find({ userId: req.user.id }).populate("jobId");
      res.json(apps);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Get all applications (Admin only)
  static async getAllApplications(req, res) {
    try {
      console.log('User role:', req.user.role);
      console.log('User details:', req.user);
      
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
      
      const apps = await Application.find()
        .populate("userId", "username email")
        .populate("jobId", "title company location");
      
      console.log('Found applications:', apps.length);
      res.json({ success: true, data: apps });
    } catch (err) {
      console.error('Error in getAllApplications:', err);
      res.status(500).json({ message: err.message });
    }
  }

  // Update application status and send email (Admin only)
  static async updateApplicationStatus(req, res) {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }

      if (!['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Must be approved, rejected, or pending." });
      }

      // Find and update application
      const application = await Application.findByIdAndUpdate(
        applicationId,
        { status, updatedAt: new Date() },
        { new: true }
      ).populate("userId", "username email").populate("jobId", "title company");

      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      // Send email notification
      let emailResult = { success: true };
      
      if (status === 'approved') {
        emailResult = await sendApplicationAcceptanceEmail(
          application.userId.email,
          application.userId.username,
          application.jobId.title,
          application.jobId.company
        );
      } else if (status === 'rejected') {
        emailResult = await sendApplicationRejectionEmail(
          application.userId.email,
          application.userId.username,
          application.jobId.title,
          application.jobId.company
        );
      }

      res.json({
        success: true,
        message: `Application ${status} successfully`,
        application,
        emailSent: emailResult.success,
        emailMessage: emailResult.message
      });

    } catch (err) {
      console.error('Error updating application status:', err);
      res.status(500).json({ message: err.message });
    }
  }
}

export default ApplicationController;
