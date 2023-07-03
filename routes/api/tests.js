import express from 'express';
import { createTest, getTest, getTestsByCourseAndSubjectAndTopic, removeTest, updateTest } from '../../controllers/TestController.js';

const router  = express.Router();


router.route('/')
    .get(getTestsByCourseAndSubjectAndTopic)
    .post(createTest)
 

router.route('/:id')
    .get(getTest)
    .put(updateTest)
    .delete(removeTest);


export default router;
