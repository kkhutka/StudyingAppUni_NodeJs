import express from 'express';
import { create,  getByCourse, getOne, remove, update } from '../../controllers/SubjectController.js';



const router  = express.Router();


router.route('/:id')
    .get(getOne)
    .put(update)
    .delete(remove);

router.route('/')
    .get(getByCourse)
    .post(create)





export default router;
