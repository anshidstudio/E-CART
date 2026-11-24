import express from 'express';
import { getUser, login, logout, register } from '../controllers/authController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, getUser);

export default router;