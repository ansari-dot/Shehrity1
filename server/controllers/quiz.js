import Quiz from "../models/Quiz.js";

class QuizController {
    //  Create new quiz (Admin Only)
    static async createQuiz(req, res) {
        try {


            const quiz = new Quiz(req.body);
            await quiz.save();
            res.status(201).json(quiz);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Get all quizzes User and admin 
    static async getAllQuizzes(req, res) {
        try {
            const quizzes = await Quiz.find();
            res.json(quizzes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Get single quiz by ID (Admin Only)
    static async getQuizById(req, res) {
            try {
                const userId = req.user.id;
                const existingUser = await User.findById(userId);
                if (!existingUser || existingUser.role !== "admin") {
                    return res.status(403).json({
                        message: "You are not authorized to get the quiz",
                        success: false
                    });
                }
                const quiz = await Quiz.findById(req.params.id);
                if (!quiz) return res.status(404).json({ message: "Quiz not found" });
                res.json(quiz);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
        //  Update quiz (Admin Only) udpoate quiz mae athe quiz questions can b update 
    static async updateQuiz(req, res) {
        try {
            const userId = req.user.id;
            const existingUser = await User.findById(userId);
            if (!existingUser || existingUser.role !== "admin") {
                return res.status(403).json({
                    message: "You are not authorized to update the quiz",
                    success: false
                });
            }
            const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!quiz) return res.status(404).json({ message: "Quiz not found" });
            res.json(quiz);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    //  Delete quiz (Admin Only)
    static async deleteQuiz(req, res) {
        try {
            /* const userId = req.user.id;
              const existingUser = await User.findById(userId);
             if (!existingUser || existingUser.role !== "admin") {
                 return res.status(403).json({
                     message: "You are not authorized to delete the Quiz",
                     success: false
                 });
             } */
            const quiz = await Quiz.findByIdAndDelete(req.params.id);
            if (!quiz) return res.status(404).json({ message: "Quiz not found" });
            res.json({ message: "Quiz deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default QuizController;