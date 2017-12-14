import express from 'express';
import userController from '../controllers/userControllers';
import ideaController from '../controllers/ideaControllers';
import commentController from '../controllers/commentController';
import validators from '../middlewares/validators';

const router = express.Router();
router.post('/api/v1/signUp', validators.validateSignUp, userController.signUp);
router.post('/api/v1/signIn', userController.signIn);
router.post('/api/v1/resetPassword', userController.resetPassword);
router.put('/api/v1/updatePassword/:hash', userController.updatePassword);
router.put('/api/v1/updateProfile', validators.validateToken, validators.validateProfile, userController.updateProfile);
router.post('/api/v1/idea', validators.validateToken, validators.validateIdea, ideaController.create);
router.delete('/api/v1/idea/delete/:ideaId', validators.validateToken, ideaController.delete);
router.put('/api/v1/idea', validators.validateToken, validators.validateIdea, ideaController.editIdea);
router.post('/api/v1/search', ideaController.publicIdeas);
router.get('/api/v1/user/ideas', validators.validateToken, ideaController.getUsersIdeas);
router.post('/api/v1/comment', validators.validateToken, commentController.create);
router.get('/api/v1/comment/:ideaId', commentController.fetchComment);

export default router;

