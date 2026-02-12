import express from "express";
import { registerSchema, loginSchema } from "../validation/authValidation.js";
import validate from "../middleware/validateMiddleware.js";
import authController from '../controllers/authController.js';  
const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
