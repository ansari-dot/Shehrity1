import express from "express";
import team from "../controllers/team.js";
import { upload } from "../utils/multer.js";
import { auth } from '../middleware/auth.js'
const router = express.Router();

// Add team member (admin only)
router.post("/team/add", auth, upload.single('image'), (req, res) => team.addMember(req, res));

//  Get all team members (public)
router.get("/team/get", (req, res) => team.getMembers(req, res));
//  Delete team member (admin only)
router.delete("/team/delete/:id", auth, (req, res) => team.deleteMember(req, res));

export default router;