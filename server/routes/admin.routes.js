// routes/admin.js
import express from "express";
import AdminController from "../controllers/admin.js";
import { auth } from '../middleware/auth.js'
const router = express.Router();

// Register new admin
router.post("/admin/register", (req, res) => AdminController.prototype.addAdmin(req, res));

// Login Step 1: check email & password, send OTP
router.post("/admin/login", (req, res) => AdminController.loginAdmin(req, res));

// Login Step 2: verify OTP & issue token
router.post("/admin/verify-otp", (req, res) => AdminController.verifyOTP(req, res));

// Update email & password (protected route)
router.put("/admin/update", auth, (req, res) => AdminController.updateAdmin(req, res));

export default router;