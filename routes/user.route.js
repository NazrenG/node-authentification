import express from 'express';
import { loginUser,refreshToken,registerUser,logoutUser } from '../controllers/user.controller';

const router = express.Router();
//login user
router.post('/login', loginUser);
//register user
router.post('/register', registerUser);
//logout user
router.post('/logout', logoutUser);
//refresh token
router.post('/refresh', refreshToken);

export default router;