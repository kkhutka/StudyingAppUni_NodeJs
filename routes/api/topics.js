import express from 'express';
import { getBySubjectAndCourse, create, getOne, update, remove} from '../../controllers/TopicController.js';



const router  = express.Router();


router.route('/')
    .get(getBySubjectAndCourse)
    .post(create)

router.route('/:id')
    .get(getOne)
    .put(update)
    .delete(remove);




export default router;

