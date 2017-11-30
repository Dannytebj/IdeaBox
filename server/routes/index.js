import express from 'express';
import userController from '../controllers/userControllers';
import ValidateInputs from '../middlewares/Validator';

const router = express.Router();
router.post('/api/v1/signUp', ValidateInputs, userController.signUp);
router.post('/api/v1/signIn', userController.signIn);

export default router;

