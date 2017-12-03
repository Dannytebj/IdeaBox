import express from 'express';
import userController from '../controllers/userControllers';
import ideaController from '../controllers/ideaControllers';
import validators from '../middlewares/validators';

const router = express.Router();
router.post('/api/v1/signUp', validators.validateSignUp, userController.signUp);
router.post('/api/v1/signIn', userController.signIn);
router.post('/api/v1/resetPassword', userController.resetPassword);
router.put('/api/v1/updatePassword/:hash', userController.updatePassword);
router.put('/api/v1/updateProfile/:userId', validators.validateProfile, userController.updateProfile);
router.post('/api/v1/idea', validators.validateToken, validators.validateIdea, ideaController.create);
router.delete('/api/v1/idea/:ideaId', ideaController.delete);
router.put('/api/v1/idea/:ideaId', ideaController.editIdea);
router.get('/api/v1/search/:searchQuery', ideaController.searchIdeas);
export default router;

