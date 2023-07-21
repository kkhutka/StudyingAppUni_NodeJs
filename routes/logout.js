import express from 'express';
const router = express.Router();
import {handleLogOut} from '../controllers/RegisterControllers/LogOutController.js';

router.get('/', handleLogOut);

export default router;
