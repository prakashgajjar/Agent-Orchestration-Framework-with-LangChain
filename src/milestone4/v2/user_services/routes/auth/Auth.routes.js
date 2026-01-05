import express from 'express';
import SignUp from '../../controllers/auth/SignUp.controller.js'
import SignIn from '../../controllers/auth/SignIn.controller.js';
import SignOut from '../../controllers/auth/SignOut.controller.js';
import auth from '../../middleware/Auth.middleware.js';
import { getMe } from '../../controllers/auth/GetMe.controller.js';

const router = express.Router();

router.post('/signup',SignUp);
router.post('/signin',SignIn);
router.post('/signout',SignOut);
router.get("/me", auth, getMe);

export default router;