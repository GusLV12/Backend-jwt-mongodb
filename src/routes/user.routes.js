import {Router} from 'express';
import { createUser, viewUsers } from '../controllers/user.controller';
import { isAdmin, isModerator, verifyToken } from '../middlewares/authjwt';
const router = Router();



export default router;