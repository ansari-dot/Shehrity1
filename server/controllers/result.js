import Result from "../models/Result.js";
import User from "../models/User.js";

class ResultController {
    // Method to add result user
    async addResult(req, res) {
        try {
            
            const { userId, obtainNumber, totalNumber } = req.body;

            // Find user
             const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    message: "User not found",
                    success: false,
                });
            } 

           
            let result = await Result.findOne({ userId: user._id });

            if (result) {
                if (result.attempt >= 2) {
                    return res.status(400).json({
                        message: "You have already applied 2 times",
                        success: false,
                    });
                }

                result.attempt = result.attempt + 1;
                result.obtainNumber = obtainNumber;
                result.totalNumber = totalNumber;
                result.percentage = (obtainNumber / totalNumber) * 100;

                await result.save();

                return res.status(200).json({
                    message: "Result updated successfully",
                    success: true,
                    data: result,
                });
            }
 
            const percentage = (obtainNumber / totalNumber) * 100;
            const newResult = await Result.create({
                obtainNumber,
                totalNumber,
                percentage,
                attempt: 1,
                userId: user._id,
            });

            return res.status(201).json({
                message: "Result added successfully",
                success: true,
                data: newResult,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Get all results (for admin)
    async getResult(req, res) {
        try {
            const results = await Result.find()
                .populate("userId", "username email")
                .sort({ certificate: 1 });

            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No results found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Results found",
                data: results,
            });
        } catch (error) {
            console.error("Error in getResult:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Get user's own results
    async getMyResults(req, res) {
        try {
            const userId = req.user.id;
            const results = await Result.find({ userId })
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: "Results found",
                data: results,
            });
        } catch (error) {
            console.error("Error in getMyResults:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Get user's latest result
    async getLatestResult(req, res) {
        try {
            const userId = req.user.id;
            const result = await Result.findOne({ userId })
                .sort({ createdAt: -1 });

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "No results found",
                });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in getLatestResult:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new ResultController();
