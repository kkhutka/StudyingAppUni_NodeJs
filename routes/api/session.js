import express from 'express'
import { createSession, getSession, isSessionStarted, submitSession, updateAnswer } from '../../controllers/sessionController.js';


const router = express.Router();



router.route('/')
    .post(createSession);


router.route('/:id')
    .get(getSession);


router.route('/submit/:id')
    .put(submitSession)
    
router.route('/:id')
    .put(updateAnswer)


router.route('/started/:id')
    .get(isSessionStarted)


export default router;