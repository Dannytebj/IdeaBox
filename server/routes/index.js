import express from 'express';
import userController from '../controllers/userControllers';
import validateInputs from '../middlewares/Validator';

const router = express.Router();
router.post('/api/v1/signUp', validateInputs, userController.signUp);
router.post('/api/v1/signIn', userController.signIn);
router.post('/api/v1/resetPassword', userController.resetPassword);
router.put('/api/v1/updatePassword/:hash', userController.updatePassword);


export default router;

