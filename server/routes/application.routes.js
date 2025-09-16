// routes/applicationRoutes.js
import express from "express";
import ApplicationController from "../controllers/application.js";
import { auth } from "../middleware/auth.js";
import { uploadPDF } from "../utils/multer.js";

const router = express.Router();

// Apply (User)
router.post("/application/apply", auth, uploadPDF.single("cv"), ApplicationController.apply);

// Get my applications (User)
router.get("/application/my", auth, ApplicationController.getMyApplications);

// Get all applications (Admin only)
router.get("/application/all", auth, ApplicationController.getAllApplications);

// Update application status and send email (Admin only)
router.put("/application/status/:applicationId", auth, ApplicationController.updateApplicationStatus);

export default router;
