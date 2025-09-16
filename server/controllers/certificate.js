import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Result from "../models/Result.js";
import { sendCertificateNotification } from "../services/nodeMailer.js";

class CertificateController {
    //  Admin uploads Certificate PDF
// Admin uploads Certificate PDF
async uploadCertificate(req, res) {
    try {
        let { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Certificate file is required" });
        }

        const filePath = `/uploads/certificates/${req.file.filename}`; // match multer destination

        const certificate = await Certificate.findOneAndUpdate(
            { userId },
            { certificateUrl: filePath, certificate: "Received" },
            { upsert: true, new: true }
        ).populate("userId", "username email");

        const result = await Result.findOne({ userId });
        if (!result) {
            return res.status(400).json({ success: false, message: "Result not found" });
        }
        result.certificate = "Received";
        await result.save();

        // ✅ Send notification email to the user
        if (certificate.userId && certificate.userId.email) {
            await sendCertificateNotification(certificate.userId.email, certificate.userId.username);
        }

        res.json({
            success: true,
            message: "Certificate uploaded successfully and user notified",
            certificate,
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
    // User gets their certificate
    async getMyCertificate(req, res) {
      try {
    // Get userId from query params
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const certificate = await Certificate.findOne({ userId });
    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    res.json({ success: true, certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
    }

    //  Admin: Get all certificates
    async getAllCertificates(req, res) {
        try {
            const certificates = await Certificate.find().populate("userId", "name email");
            res.json({ success: true, certificates });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // User applies for certificate
    async applyCertificate(req, res) {
  try {
    const { userId } = req.body;
    console.log("Apply request for userId:", userId);

    // 1. Validate request
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // 2. Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Get result
    const result = await Result.findOne({ userId });
    console.log("Result found:", result);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No result found. Please complete the test before applying.",
      });
    }

    // 4. Prevent duplicate apply
    if (result.certificate === "applied") {
      return res.status(400).json({
        success: false,
        message:
          "You have already applied for a certificate. Please wait for admin to process it.",
      });
    }

    // 5. Check eligibility
    if (result.percentage >= 80) {
      result.certificate = "applied"; // update status
      await result.save();

      return res.status(200).json({
        success: true,
        message:
          "Thank you for applying for a certificate. As soon as it is ready, you will receive an email.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message:
          "You need at least 80% to apply for a certificate. Please try again after improving your score.",
      });
    }
  } catch (error) {
    console.error("applyCertificate error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

}

export default new CertificateController();