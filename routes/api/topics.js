import express from 'express';
import { getBySubjectAndCourse, create, getOne, update, remove} from '../../controllers/TopicController.js';

import verifyRoles from '../../middleware/verifyRoles.js';

const router  = express.Router();


router.route('/')
    .get(getBySubjectAndCourse)
    .post(verifyRoles("admin"),create)

router.route('/:id')
    .get(getOne)
    .put(verifyRoles("admin"),update)
    .delete(verifyRoles("admin"),remove);




export default router;

