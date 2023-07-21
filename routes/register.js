import express from 'express';
const router = express.Router();
import {newUser} from '../controllers/RegisterControllers/RegisterController.js';

router.post('/', newUser);

export default router;
