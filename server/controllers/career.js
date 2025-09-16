// controllers/JobController.js
import Career from "../models/Career.js";

class JobController {
  // Get all jobs (Admin + User)
  static async getJobs(req, res) {
    try {
      const jobs = await Career.find();
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Add job (Admin only)
  static async addJob(req, res) {
    try {
      const newJob = new Career(req.body);
      await newJob.save();
      res.status(201).json(newJob);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Delete job (Admin only)
  static async deleteJob(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
      const job = await Career.findByIdAndDelete(req.params.id);
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.json({ message: "Job deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Apply to job (User)
  static async applyJob(req, res) {
    try {
      const job = await Career.findById(req.params.id);
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.json({ message: "Redirecting to apply link", applyLink: job.applyLink });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default JobController;
