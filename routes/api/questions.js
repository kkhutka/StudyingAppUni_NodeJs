import express from 'express';
import { createQuestion, getQuestioncreateQuestion, getQuestioncreateQuestionsByCourseAndSubjectAndTopic, removeQuestioncreateQuestion, updateQuestioncreateQuestion } from '../../controllers/QuestionController.js';

const router  = express.Router();


router.route('/')
    .get(getQuestioncreateQuestionsByCourseAndSubjectAndTopic)
    .post(createQuestion)
 

router.route('/:id')
    .get(getQuestioncreateQuestion)
    .put(updateQuestioncreateQuestion)
    .delete(removeQuestioncreateQuestion);


export default router;
