import express from "express"
const router = express.Router();
import { login, signup , logout} from "../controllers/auth.controller.js"
import { signUpValidation } from "../middlewares/signupValidation.js";
import { jwtAuthandSession } from "../middlewares/jwtAndSession.js";


router.post('/login', jwtAuthandSession, login);
router.post('/signup', signUpValidation, signup);
router.post('/logout', logout);

export default router;