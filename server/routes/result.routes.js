import express from 'express';
import ResultController from '../controllers/result.js';
const router = express.Router();
import { auth } from '../middleware/auth.js'
// the method to add the result  


router.post('/result/add', auth, (req, res) => ResultController.addResult(req, res));
router.get('/result/get',  (req, res) => ResultController.getResult(req, res));
router.get('/result/my', auth, (req, res) => ResultController.getMyResults(req, res));
router.get('/result/latest', auth, (req, res) => ResultController.getLatestResult(req, res));

export default router;