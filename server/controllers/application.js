// controllers/ApplicationController.js
import Application from "../models/Application.js";
import Career from "../models/Career.js";
import { sendApplicationAcceptanceEmail, sendApplicationRejectionEmail } from "../services/nodeMailer.js";

class ApplicationController {
  // Apply for job (public submission)
  static async apply(req, res) {
    try {
      const userId = req.user?.id; // Optional for logged-in users
      const { jobId, name, email, phone, coverLetter, jobTitle } = req.body;
      const cv = req.file ? req.file.path : null;

      // Validate required fields
      if (!cv) {
        return res.status(400).json({ success: false, message: "CV is required" });
      }
      if (!name || !email || !phone) {
        return res.status(400).json({ 
          success: false, 
          message: "Name, email, and phone are required" 
        });
      }

      // Verify job exists
      const job = await Career.findById(jobId);
      if (!job) {
        return res.status(404).json({ 
          success: false, 
          message: "Job not found" 
        });
      }

      // Save application
      const application = new Application({
        userId,
        jobId,
        jobTitle: jobTitle || job.title,
        name,
        email,
        phone,
        cv,
        coverLetter: coverLetter || '',
        status: 'pending'
      });
      
      await application.save();

      // Send notification email (optional)
      try {
        // You can implement email notification here if needed
        // await sendApplicationReceivedEmail(email, name, job.title);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }

      res.status(201).json({ 
        success: true, 
        message: "Application submitted successfully", 
        application 
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      res.status(500).json({ 
        success: false, 
        message: err.message || "Error submitting application" 
      });
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
