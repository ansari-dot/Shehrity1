// routes/jobRoutes.js
import express from "express";
import JobController from "../controllers/career.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Public (anyone can see jobs)
router.get("/career/get", JobController.getJobs);

// Authenticated users
router.get("/career/apply/:id", auth, JobController.applyJob);

// Admin only
router.post("/career/add", auth, JobController.addJob);
router.delete("/career/delete/:id", auth, JobController.deleteJob);

export default router;
