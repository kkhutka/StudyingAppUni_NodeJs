import express from 'express';
import { createQuestion, getQuestion, getQuestionsByCourseAndSubjectAndTopic, removeQuestion, updateQuestion } from '../../controllers/QuestionController.js';

const router  = express.Router();


router.route('/')
    .get(getQuestionsByCourseAndSubjectAndTopic)
    .post(createQuestion)
 

router.route('/:id')
    .get(getQuestion)
    .put(updateQuestion)
    .delete(removeQuestion);


export default router;
