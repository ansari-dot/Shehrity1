import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true } // correct answer
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: Number, default: 20 }, // minutes
    questions: [questionSchema]
});
const quiz = mongoose.model('quiz', quizSchema);
export default quiz;