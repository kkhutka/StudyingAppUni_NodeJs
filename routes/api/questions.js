import express from 'express';
import { createQuestion, getQuestion, getQuestionsByCourseAndSubjectAndTopic, removeQuestion, updateQuestion } from '../../controllers/QuestionController.js';
import verifyRoles from '../../middleware/verifyRoles.js';
const router  = express.Router();



router.route('/')
    .get(getQuestionsByCourseAndSubjectAndTopic)
    .post(verifyRoles("admin"),createQuestion)
 

router.route('/:id')
    .get(getQuestion)
    .put(verifyRoles("admin"),updateQuestion)
    .delete(verifyRoles("admin"),removeQuestion);


export default router;
