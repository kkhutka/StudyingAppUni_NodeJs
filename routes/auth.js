import express from 'express';
const router = express.Router();
import {login} from '../controllers/RegisterControllers/AuthController';

router.post('/', login);

export default router;
