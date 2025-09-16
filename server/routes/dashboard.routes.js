import express from "express";
import DashboardController from "../controllers/dashboard.js";
import { auth } from "../middleware/auth.js"; // 👈 your JWT auth

const router = express.Router();

//  GET Dashboard stats For Portal
router.get("/dashboard/portal/stats", auth, DashboardController.getStats);

// GET  Dashboard stats for Admin
router.get('/dashboard/admin/stats', auth, DashboardController.getAdminStats);

// GET Recent activities for Admin
router.get('/dashboard/admin/activities', auth, DashboardController.getRecentActivities);

export default router;