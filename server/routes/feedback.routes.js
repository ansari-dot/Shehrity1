import express from 'express';
import feedback from '../controllers/feedback.js';
import { auth } from '../middleware/auth.js'

const router = express.Router();

// the route to add feedback

router.post('/add/feedback', (req, res) => feedback.addFeedback(req, res));

// the route to get the feedback  to admin
router.get('/get/feedback', auth, (req, res) => feedback.getFeedback(req, res));

// the route to delete the feedback (as it can only do by admin no others)
router.delete('/delete/feedback/:feedbackId', auth, (req, res) => feedback.deleteFeedback(req, res));

export default router;