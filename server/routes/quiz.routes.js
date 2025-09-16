import QuizController from '../controllers/quiz.js'
import { Router } from 'express'
import { auth } from '../middleware/auth.js'
const router = Router()

router.post('/quiz/add', auth, QuizController.createQuiz)
router.delete('/quiz/delete/:id',auth, QuizController.deleteQuiz)
router.get('/quiz/get', QuizController.getAllQuizzes)

export default router