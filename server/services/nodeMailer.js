import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"0349ansari@gmail.com",
        pass: "bvqm bqxa riep gwwo", // Gmail App Password
    },
    connectionTimeout: 10000,
    pool: true, // Use connection pooling
    maxConnections: 1, // Limit concurrent connections
    maxMessages: 3, // Limit messages per connection
    rateLimit: 3 // Limit to 3 emails per second
});

// ✅ OTP sender
export const sendOTP = async(toEmail, userName, otpCode) => {
    try {
        await transporter.verify();
        console.log("✅ Gmail transporter is ready for OTP");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: "🔐 Your OTP Code - Shehrity Platform",
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <div style="padding: 10px 20px; background: #f1f1f1; display: inline-block; border-radius: 8px; font-size: 24px; font-weight: bold;">
            ${otpCode}
          </div>
          <p style="margin-top: 15px;">Please enter this code to continue. It will expire in 5 minutes.</p>
          <br/>
          <p>Thank you for using <strong>Sardar Guest House</strong>!</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ OTP email sent to:", toEmail);
    } catch (error) {
        console.error("❌ OTP email send error:", error);
    }
};

// ✅ Certificate Upload Notification
export const sendCertificateNotification = async(toEmail, userName) => {
    try {
        await transporter.verify();
        console.log("✅ Gmail transporter is ready for Certificate Notification");

        const mailOptions = {
            from: `"Sardar Guest House" <0349ansari@gmail.com>`,
            to: toEmail,
            subject: "Your Certificate is Ready",
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Hello <strong>${userName}</strong>,</p>
          <p>We are pleased to inform you that your certificate has been uploaded to our portal.</p>
          <p>Please <a href="https://your-portal-link.com" style="color: #007BFF; text-decoration: none;">login here</a> to view and download your certificate.</p>
          <br/>
          <p>Thank you for choosing <strong>Sardar Guest House</strong>!</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Certificate notification email sent to:", toEmail);
    } catch (error) {
        console.error("❌ Certificate email send error:", error);
    }
};

// ✅ Job Application Acceptance Notification
export const sendApplicationAcceptanceEmail = async(toEmail, userName, jobTitle, companyName) => {
    try {
        await transporter.verify();
        console.log("✅ Gmail transporter is ready for application acceptance");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `🎉 Congratulations! Your Application for ${jobTitle} has been Accepted`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #15487d; margin: 0;">🎉 Congratulations!</h1>
            <div style="width: 80px; height: 4px; background: linear-gradient(90deg, #15487d, #15487d); margin: 10px auto; border-radius: 2px;"></div>
          </div>
          
          <p style="font-size: 18px; color: #333;">Hello <strong>${userName}</strong>,</p>
          
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #15487d;">
            <p style="margin: 0; font-size: 16px; color: #333;">
              We are thrilled to inform you that your application for the position of 
              <strong style="color: #15487d;">${jobTitle}</strong> at 
              <strong style="color: #15487d;">${companyName}</strong> has been <strong>ACCEPTED</strong>!
            </p>
          </div>
          
          <div style="margin: 25px 0;">
            <h3 style="color: #15487d; margin-bottom: 15px;">📋 Next Steps:</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li>Our HR team will contact you within 2-3 business days</li>
              <li>Please keep your phone and email accessible</li>
              <li>Prepare for the next round of interviews if applicable</li>
              <li>Keep your documents ready for verification</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-weight: 500;">
              <strong>📞 Important:</strong> Please ensure your contact details are up to date. 
              Our team will reach out to you soon with further instructions.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:5173" style="background: linear-gradient(90deg, #15487d, #15487d); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Visit Career Portal
            </a>
          </div>
          
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 5px 0;">
              Thank you for choosing <strong style="color: #15487d;">Shehrity Career Portal</strong>
            </p>
            <p style="color: #999; font-size: 12px; margin: 0;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("✅ Application acceptance email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("❌ Application acceptance email error:", error);
        
        // Handle specific Gmail daily limit error
        if (error.responseCode === 550 && error.response.includes('Daily user sending limit exceeded')) {
            return { 
                success: false, 
                message: "Daily email limit reached. Application status updated but email notification failed." 
            };
        }
        
        return { success: false, message: "Failed to send notification email." };
    }
};

// ✅ Job Application Rejection Notification
export const sendApplicationRejectionEmail = async(toEmail, userName, jobTitle, companyName) => {
    try {
        await transporter.verify();
        console.log("✅ Gmail transporter is ready for Application Rejection");

        const mailOptions = {
            from: `"Shehrity Career Portal" <0349ansari@gmail.com>`,
            to: toEmail,
            subject: `Update on Your Application for ${jobTitle}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #15487d; margin: 0;">Application Update</h1>
            <div style="width: 80px; height: 4px; background: linear-gradient(90deg, #15487d, #15487d); margin: 10px auto; border-radius: 2px;"></div>
          </div>
          
          <p style="font-size: 18px; color: #333;">Hello <strong>${userName}</strong>,</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6c757d;">
            <p style="margin: 0; font-size: 16px; color: #333;">
              Thank you for your interest in the position of 
              <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.
            </p>
            <p style="margin: 15px 0 0 0; color: #555;">
              After careful consideration, we have decided to move forward with other candidates 
              whose experience more closely matches our current requirements.
            </p>
          </div>
          
          <div style="margin: 25px 0;">
            <h3 style="color: #15487d; margin-bottom: 15px;">🚀 Don't Give Up!</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li>Keep exploring new opportunities on our portal</li>
              <li>Consider enhancing your skills through our quiz system</li>
              <li>Your profile remains active for future openings</li>
              <li>We encourage you to apply for other suitable positions</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:5173" style="background: linear-gradient(90deg, #15487d, #15487d); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block;">
              Explore More Jobs
            </a>
          </div>
          
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 5px 0;">
              Thank you for using <strong style="color: #15487d;">Shehrity Career Portal</strong>
            </p>
            <p style="color: #999; font-size: 12px; margin: 0;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("✅ Application rejection email sent to:", toEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("❌ Application rejection email error:", error);
        
        // Handle specific Gmail daily limit error
        if (error.responseCode === 550 && error.response.includes('Daily user sending limit exceeded')) {
            return { 
                success: false, 
                message: "Daily email limit reached. Application status updated but email notification failed." 
            };
        }
        
        return { success: false, message: "Failed to send notification email." };
    }
};

// Email rate limiting to prevent daily limit exceeded
const emailQueue = [];
let lastEmailTime = 0;
const EMAIL_DELAY = 2000; // 2 seconds between emails

const sendEmailWithDelay = async (mailOptions) => {
    const now = Date.now();
    const timeSinceLastEmail = now - lastEmailTime;
    
    if (timeSinceLastEmail < EMAIL_DELAY) {
        const waitTime = EMAIL_DELAY - timeSinceLastEmail;
        console.log(`⏳ Waiting ${waitTime}ms before sending email...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    const result = await transporter.sendMail(mailOptions);
    lastEmailTime = Date.now();
    return result;
};

// ✅ Password Reset Email sender
export const sendPasswordResetEmail = async(toEmail, userName, resetUrl) => {
    try {
        await transporter.verify();
        console.log("✅ Gmail transporter is ready for password reset");

        const mailOptions = {
            from: `"Shehrity Platform" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: "🔐 Password Reset Request - Shehrity",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Password Reset</h1>
                        <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Shehrity Platform</p>
                    </div>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
                        <h2 style="color: #333; margin-top: 0;">Hello ${userName}! 👋</h2>
                        
                        <p style="font-size: 16px; margin-bottom: 20px;">
                            We received a request to reset your password for your Shehrity account. 
                            If you made this request, click the button below to reset your password.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" 
                               style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);">
                                🔓 Reset My Password
                            </a>
                        </div>
                        
                        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
                            <p style="margin: 0; color: #856404;">
                                <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
                            </p>
                        </div>
                        
                        <p style="font-size: 14px; color: #666; margin-top: 20px;">
                            If you can't click the button, copy and paste this link into your browser:<br>
                            <span style="background: #f8f9fa; padding: 8px; border-radius: 4px; word-break: break-all; font-family: monospace;">${resetUrl}</span>
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                        
                        <p style="font-size: 14px; color: #666;">
                            <strong>Didn't request this?</strong> You can safely ignore this email. Your password won't be changed.
                        </p>
                        
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="color: #999; font-size: 12px; margin: 0;">
                                © 2024 Shehrity Platform. All rights reserved.<br>
                                This is an automated message, please do not reply.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const result = await sendEmailWithDelay(mailOptions);
        console.log("✅ Password reset email sent successfully:", result.messageId);
        return { success: true, message: "Password reset email sent successfully" };

    } catch (error) {
        console.error("❌ Error sending password reset email:", error);
        
        // Handle specific Gmail daily limit error
        if (error.responseCode === 550 && error.response.includes('Daily user sending limit exceeded')) {
            return { 
                success: false, 
                message: "Daily email limit reached. Please try again tomorrow or contact support." 
            };
        }
        
        return { success: false, message: "Failed to send reset email. Please try again later." };
    }
};