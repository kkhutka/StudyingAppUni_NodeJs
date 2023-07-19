import express from 'express'
import { createSession, getSession, submitSession, updateAnswer } from '../../controllers/sessionController.js';


const router = express.Router();



router.route('/')
    .post(createSession);


router.route('/:id')
    .get(getSession);


router.route('/submit/:id')
    .put(submitSession)
    
router.route('/:id')
    .put(updateAnswer)


export default router;