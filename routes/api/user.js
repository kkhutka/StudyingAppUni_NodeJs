import express from 'express';
import { getByUsername, getOne, remove } from '../../controllers/UserController.js';
import { verifyJWT } from '../../middleware/verifyJWT.js';


const router  = express.Router();


router.route('/:id')
    .get(verifyJWT,getOne)

router.route('/')
    .get(getByUsername)
    .delete(remove);

export default router;
