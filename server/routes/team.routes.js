import express from "express";
import team from "../controllers/team.js";
import { upload } from "../utils/multer.js";
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Add team member (admin only)
router.post(
  "/team/add", 
  auth, 
  upload.single('image'), 
  team.addMember
);

// Get all team members (public)
// Optional query param: ?type=digital or ?type=physical
router.get("/team/get", team.getMembers);

// Delete team member (admin only)
router.delete(
  "/team/delete/:id", 
  auth, 
  team.deleteMember
);

export default router;