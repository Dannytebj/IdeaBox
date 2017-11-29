import express from 'express';
import User from '../models/User';
import userController from '../controllers/userControllers';

const router = express.Router();
router.get('/api/v1/signUp', userController.signUp);

export default router;

