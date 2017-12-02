import express from 'express';
import userController from '../controllers/userControllers';
import ideaController from '../controllers/ideaControllers';
import validators from '../middlewares/validators';

const router = express.Router();
router.post('/api/v1/signUp', validators.validateSignUp, userController.signUp);
router.post('/api/v1/signIn', userController.signIn);
router.post('/api/v1/resetPassword', userController.resetPassword);
router.put('/api/v1/updatePassword/:hash', userController.updatePassword);
router.post('/api/v1/idea', validators.validateToken, validators.validateIdea, ideaController.create);


export default router;

