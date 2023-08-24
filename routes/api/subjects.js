import express from 'express';
import { create,  getByCourse, getOne, remove, update } from '../../controllers/SubjectController.js';

import verifyRoles from '../../middleware/verifyRoles.js';

const router  = express.Router();



router.route('/:id')
    .get(getOne)
    .put(verifyRoles("admin"),update)
    .delete(verifyRoles("admin"),remove);

router.route('/')
    .get(getByCourse)
    .post(verifyRoles("admin"),create)

export default router;
