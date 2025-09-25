// controllers/ApplicationController.js
import Application from "../models/Application.js";
import Career from "../models/Career.js";
import { sendApplicationAcceptanceEmail, sendApplicationRejectionEmail, sendApplicationReceivedEmail } from "../services/nodeMailer.js";

class ApplicationController {
    // Apply for job (public submission)
    static async apply(req, res) {
        try {
            const userId = req.user; // Optional for logged-in users
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

            //Send notification email (optional)
            try {
                // You can implement email notification here if needed
                await sendApplicationReceivedEmail(email, job.title,name);
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

    // Update status (approve, reject, pending)
    static async updateApplicationStatus(req, res) {
        try {
            const { applicationId } = req.params;
            const { status } = req.body;

            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "Access denied. Admin role required." });
            }

            if (!["approved", "rejected", "pending"].includes(status)) {
                return res.status(400).json({ message: "Invalid status. Must be approved, rejected, or pending." });
            }

            // Fetch application
            const application = await Application.findById(applicationId)
                .populate("userId", "username email")
                .populate("jobId", "title company");

            if (!application) {
                return res.status(404).json({ message: "Application not found" });
            }

            // Safely pick email + name with proper null checks
            const userEmail = (application.userId && application.userId.email) || application.email;
            const userName = (application.userId && application.userId.username) || application.name || 'Applicant';

            if (!userEmail) {
                console.error('No email available for application:', applicationId);
                return res.status(400).json({ 
                    success: false,
                    message: "No email address found for this applicant. Cannot send notification.",
                    error: "Missing email address"
                });
            }

            let emailResult = { success: true, message: "No email sent" };

            if (status === "approved") {
                try {
                    // Keep in DB
                    application.status = "approved";
                    application.updatedAt = new Date();
                    await application.save();

                    emailResult = await sendApplicationAcceptanceEmail(
                        userEmail,
                        userName,
                        (application.jobId && application.jobId.title) || "the position",
                        (application.jobId && application.jobId.company) || "our company"
                    );
                } catch (emailError) {
                    console.error('Error sending acceptance email:', emailError);
                    // Don't fail the whole request if email fails
                    emailResult = { 
                        success: false, 
                        message: 'Application approved but failed to send email',
                        error: emailError.message 
                    };
                }
            } else if (status === "pending") {
                // Keep in DB
                application.status = "pending";
                application.updatedAt = new Date();
                await application.save();
            } else if (status === "rejected") {
                try {
                    // First send the rejection email
                    emailResult = await sendApplicationRejectionEmail(
                        userEmail,
                        userName,
                        (application.jobId && application.jobId.title) || "the position"
                    );
                    
                    // Then delete from DB
                    await Application.findByIdAndDelete(applicationId);
                    console.log(`Application ${applicationId} rejected and deleted successfully`);
                    
                } catch (emailError) {
                    console.error('Error during rejection process:', emailError);
                    // Even if email fails, we still want to delete the application
                    try {
                        await Application.findByIdAndDelete(applicationId);
                        console.log(`Application ${applicationId} deleted after email error`);
                    } catch (deleteError) {
                        console.error('Error deleting application after email failure:', deleteError);
                    }
                    
                    emailResult = { 
                        success: false, 
                        message: 'Application rejected but there was an issue with the email',
                        error: emailError.message 
                    };
                }
            }

            res.json({
                success: true,
                message: `Application ${status} successfully`,
                application,
                emailSent: emailResult.success,
                emailMessage: emailResult.message
            });
        } catch (err) {
            console.error("Error updating application status:", err);
            res.status(500).json({ message: err.message });
        }
    }
}
// Auto-cleanup function to remove rejected applications
const cleanupRejectedApplications = async () => {
    try {
        // Delete all applications with status 'rejected'
        const result = await Application.deleteMany({ status: 'rejected' });
        console.log(`Auto-cleanup: Removed ${result.deletedCount} rejected applications`);
        return result;
    } catch (error) {
        console.error('Error in auto-cleanup of rejected applications:', error);
        throw error;
    }
};

// Run cleanup on server start
cleanupRejectedApplications().catch(console.error);

// Schedule daily cleanup (optional)
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
setInterval(() => {
    cleanupRejectedApplications().catch(console.error);
}, ONE_DAY);

export default ApplicationController;