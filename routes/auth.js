import express from 'express';
const router = express.Router();
import {login} from '../controllers/RegisterControllers/AuthController.js';

router.post('/', login);

export default router;
