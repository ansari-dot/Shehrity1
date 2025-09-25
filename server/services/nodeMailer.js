import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// ✅ Gmail transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    connectionTimeout: 10000,
    pool: true, // Use connection pooling
});

// Ports & URLs
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:2000"; // Vite frontend
const PORTAL_URL = process.env.PORTAL_URL || "http://localhost:5000"; // Backend portal

// ======================= OTP Sender =======================
export const sendOTP = async(toEmail, userName, otpCode) => {
    try {
        await transporter.verify();
        console.log(" Gmail transporter is ready for OTP");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: "Your OTP Code - Shehrity Platform",
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <div style="padding: 10px 20px; background: #f1f1f1; display: inline-block; border-radius: 8px; font-size: 24px; font-weight: bold;">
            ${otpCode}
          </div>
          <p style="margin-top: 15px;">Please enter this code to continue. It will expire in 5 minutes.</p>
          <br/>
          <p>Thank you for using <strong>Shehrity</strong>!</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log(" OTP email sent to:", toEmail);
    } catch (error) {
        console.error("OTP email send error:", error);
    }
};

// ======================= Certificate Notification =======================
export const sendCertificateNotification = async(toEmail, userName) => {
    try {
        await transporter.verify();
        console.log("Gmail transporter is ready for Certificate Notification");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: "Your Certificate is Ready",
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>We are pleased to inform you that your certificate has been uploaded to our portal.</p>
          <p>Please <a href="${PORTAL_URL}" style="color: #007BFF; text-decoration: none;">login here</a> to view and download your certificate.</p>
          <br/>
          <p>Thank you for choosing <strong>Shehrity</strong>!</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log(" Certificate notification email sent to:", toEmail);
    } catch (error) {
        console.error(" Certificate email send error:", error);
    }
};

// ======================= Application Acceptance =======================
export const sendApplicationAcceptanceEmail = async(
    toEmail,
    userName,
    jobTitle,
    companyName = "Shehrity"
) => {
    try {
        await transporter.verify();
        console.log("✅ Gmail transporter is ready for application acceptance");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `Congratulations! Your Application for ${jobTitle} has been Accepted`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #15487d; margin: 0;"> Congratulations!</h1>
          </div>
          <p style="font-size: 18px; color: #333;">Hello <strong>${userName}</strong>,</p>
          <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been <strong>ACCEPTED</strong>!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${CLIENT_URL}" style="background: #15487d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Visit Career Portal
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            Thank you for choosing <strong>Shehrity Career Portal</strong>
          </p>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("Application acceptance email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error(" Application acceptance email error:", error);
        return { success: false, message: "Failed to send notification email." };
    }
};

// ======================= Application Rejection =======================
export const sendApplicationRejectionEmail = async(
    toEmail,
    userName,
    jobTitle,
    companyName = "Shehrity"
) => {
    try {
        await transporter.verify();
        console.log("Gmail transporter is ready for Application Rejection");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `Update on Your Application for ${jobTitle}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Thank you for applying for <strong>${jobTitle}</strong> at <strong>${companyName}</strong>. Unfortunately, we have moved forward with other candidates.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${CLIENT_URL}" style="background: #15487d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Explore More Jobs
            </a>
          </div>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log(" Application rejection email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Application rejection email error:", error);
        return { success: false, message: "Failed to send notification email." };
    }
};

// ======================= Application Received =======================
export const sendApplicationReceivedEmail = async(
    toEmail,
    jobTitle,
    name,
    companyName = "Shehrity"
) => {
    try {
        await transporter.verify();
        console.log(" Gmail transporter is ready for Application Received");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `We’ve received your application for ${jobTitle}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <p>Hello <strong>${name}</strong>,</p>
          <p>We’ve successfully received your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${CLIENT_URL}" style="background: #15487d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Explore More Jobs
            </a>
          </div>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("Application received email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Application received email error:", error);
        return { success: false, message: "Failed to send notification email." };
    }
};

// ======================= Password Reset =======================
export const sendPasswordResetEmail = async(toEmail, userName, resetUrl) => {
    try {
        await transporter.verify();
        console.log(" Gmail transporter is ready for password reset");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: " Password Reset Request - Shehrity",
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Hello ${userName}! </h2>
          <p>We received a request to reset your password. Click below:</p>
          <a href="${resetUrl}" style="background: #28a745; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none;">Reset Password</a>
          <p>If you didn’t request this, ignore this email.</p>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log(" Password reset email sent:", result.messageId);
        return { success: true, message: "Password reset email sent successfully" };
    } catch (error) {
        console.error(" Password reset email error:", error);
        return { success: false, message: "Failed to send reset email." };
    }
};

// ======================= Email Rate Limiting =======================
let lastEmailTime = 0;
const EMAIL_DELAY = 2000; // 2 sec

const sendEmailWithDelay = async(mailOptions) => {
    const now = Date.now();
    if (now - lastEmailTime < EMAIL_DELAY) {
        await new Promise((r) => setTimeout(r, EMAIL_DELAY));
    }
    const result = await transporter.sendMail(mailOptions);
    lastEmailTime = Date.now();
    return result;
};