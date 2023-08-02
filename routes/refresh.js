import express from 'express';
const router = express.Router();
import { handleRefreshToken} from '../controllers/RegisterControllers/RefreshTokenController.js';

router.get('/',handleRefreshToken);

export default router;
