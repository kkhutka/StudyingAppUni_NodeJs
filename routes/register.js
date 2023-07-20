import express from 'express';
const router = express.Router();
import {newUser} from '../controllers/RegisterControllers/RegisterController';

router.post('/', newUser);

export default router;
