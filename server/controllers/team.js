import Team from "../models/Team.js";
import User from "../models/User.js";

class TeamController {
    // Add a member (only admin)
    async addMember(req, res) {
        try {
            const { name, role, type = 'physical', twitter, linkedin, facebook } = req.body;
            console.log("Body:", req.body);
            console.log("File:", req.file);

            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload an image",
                    success: false
                });
            }

            // Validate member type
            if (!['digital', 'physical'].includes(type)) {
                return res.status(400).json({
                    message: "Invalid member type. Must be 'digital' or 'physical'",
                    success: false
                });
            }

            const newMember = await Team.create({
                name,
                role,
                type,
                image: `/uploads/team/${req.file.filename}`,
                socialLinks: {
                    twitter: twitter || "",
                    linkedin: linkedin || "",
                    facebook: facebook || "",
                },
            });

            return res.status(201).json({
                message: "Team member added successfully",
                success: true,
                data: newMember,
            });
        } catch (err) {
            return res.status(500).json({ message: `Server Error: ${err.message}`, success: false });
        }
    }

    // Get all members (public)
    async getMembers(req, res) {
        try {
            const { type } = req.query;
            const query = {};

            // Filter by type if provided
            if (type && ['digital', 'physical'].includes(type)) {
                query.type = type;
            }

            const members = await Team.find(query).sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                members
            });
        } catch (err) {
            return res.status(500).json({
                message: `Server Error: ${err.message}`,
                success: false
            });
        }
    }

    // Delete a member (only admin)
    async deleteMember(req, res) {
        try {

            const { id } = req.params;
            const deletedMember = await Team.findByIdAndDelete(id);

            if (!deletedMember) return res.status(404).json({ message: "Team member not found", success: false });

            return res.status(200).json({ message: "Team member deleted successfully", success: true });
        } catch (err) {
            return res.status(500).json({ message: `Server Error: ${err.message}`, success: false });
        }
    }
}

export default new TeamController();