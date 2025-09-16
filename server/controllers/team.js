import Team from "../models/Team.js";
import User from "../models/User.js";

class TeamController {
    // Add a member (only admin)
    async addMember(req, res) {
        try {
            const { name, role, twitter, linkedin, facebook } = req.body;
              console.log("Body:", req.body);
            console.log("File:", req.file);
          //  const userId = req.user.id;

            if (!req.file) {
                return res.status(400).json({ message: "Please upload an image" });
            }

         /*   const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found", success: false });
            }

            if (user.role !== "admin") {
                return res.status(403).json({ message: "You are not authorized", success: false });
            } */


            const newMember = await Team.create({
                name,
                role,
                image:`/uploads/services/${req.file.filename}`,
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
            const members = await Team.find();
            return res.status(200).json({ success: true, data: members });
        } catch (err) {
            return res.status(500).json({ message: `Server Error: ${err.message}`, success: false });
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
