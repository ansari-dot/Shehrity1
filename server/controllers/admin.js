// controllers/AdminController.js
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOTP } from '../services/nodeMailer.js';

class AdminController {
    // ----------------- Add Admin -----------------
    async addAdmin(req, res) {
        try {
            const { username, email, password } = req.body;

            const existAdmin = await Admin.findOne({ email });
            if (existAdmin) {
                return res.status(400).json({
                    message: "Admin already exists",
                    success: false
                });
            }

            const salt = 10;
            const hashPassword = await bcrypt.hash(password, salt);

            const newAdmin = new Admin({
                username,
                email,
                password: hashPassword
            });
            await newAdmin.save();

            res.status(200).json({
                message: 'Admin created successfully',
                success: true
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Internal Server Error: ${err}`,
                success: false
            });
        }
    }

    // ----------------- Login Step 1 -----------------
    static async loginAdmin(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Please fill all fields',
                    success: false
                });
            }

            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(400).json({
                    message: "Admin not found",
                    success: false
                });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Incorrect password",
                    success: false
                });
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiry = Date.now() + 5 * 60 * 1000;

            admin.otp = otp;
            admin.otpExpiry = expiry;
            await admin.save();

            sendOTP(admin.email, admin.username, otp);

            res.status(200).json({
                message: "OTP sent to your email",
                success: true
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Internal Server Error: ${err}`,
                success: false
            });
        }
    }

    // ----------------- Login Step 2 (OTP Verify) -----------------
    static async verifyOTP(req, res) {
            try {
                const { email, otp } = req.body;

                const admin = await Admin.findOne({ email });
                if (!admin) {
                    return res.status(400).json({
                        message: "Admin not found",
                        success: false
                    });
                }

                if (admin.otp !== otp || Date.now() > admin.otpExpiry) {
                    return res.status(400).json({
                        message: "Invalid or expired OTP",
                        success: false
                    });
                }

                admin.otp = null;
                admin.otpExpiry = null;
                await admin.save();

                const SECRET = process.env.JWT_SECRET;
                const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "1h" });

                res.status(200).json({
                    message: "Login successful",
                    token,
                    success: true
                });

            } catch (err) {
                console.error(err);
                res.status(500).json({
                    message: `Internal Server Error: ${err}`,
                    success: false
                });
            }
        }
        // ----------------- Update Email & Password -----------------
    static async updateAdmin(req, res) {
        try {
            const { email, password } = req.body;

            // find admin
            const admin = await Admin.findById(req.user.id); // assuming user is logged in & JWT middleware is used
            if (!admin) {
                return res.status(400).json({
                    message: "Admin not found",
                    success: false
                });
            }

            // update email if provided
            if (email) {
                const emailExists = await Admin.findOne({ email });
                if (emailExists && emailExists._id.toString() !== admin._id.toString()) {
                    return res.status(400).json({
                        message: "This email is already in use",
                        success: false
                    });
                }
                admin.email = email;
            }

            // update password if provided
            if (password) {
                const salt = 10;
                const hashPassword = await bcrypt.hash(password, salt);
                admin.password = hashPassword;
            }

            await admin.save();

            res.status(200).json({
                message: "Admin email/password updated successfully",
                success: true
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Internal Server Error: ${err}`,
                success: false
            });
        }
    }

}

export default AdminController;