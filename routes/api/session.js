import express from 'express'
import { createSession, getSession, submitAnswers } from '../../controllers/sessionController.js';


const router = express.Router();



router.route('/')
    .post(createSession);


router.route('/:id')
    .get(getSession);


router.route('/submit/:id')
    .put(submitAnswers)

export default router;