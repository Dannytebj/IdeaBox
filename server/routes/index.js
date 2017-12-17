import express from 'express';
import userController from '../controllers/userControllers';
import ideaController from '../controllers/ideaControllers';
import commentController from '../controllers/commentController';
import validators from '../middlewares/validators';

const router = express.Router();
router.post('/api/v1/user/signUp', validators.validateSignUp, userController.signUp);
router.post('/api/v1/user/signIn', userController.signIn);
router.post('/api/v1/user/resetPassword', userController.resetPassword);
router.put('/api/v1/user/updatePassword/:hash', userController.updatePassword);
router.put('/api/v1/user/updateProfile', validators.validateToken, validators.validateProfile, userController.updateProfile);
router.post('/api/v1/idea', validators.validateToken, validators.validateIdea, ideaController.create);
router.delete('/api/v1/idea/:ideaId', validators.validateToken, ideaController.delete);
router.put('/api/v1/idea', validators.validateToken, validators.validateIdea, ideaController.editIdea);
router.post('/api/v1/search', ideaController.publicIdeas);
router.post('/api/v1/idea/category', ideaController.getCategory);
router.get('/api/v1/user/ideas', validators.validateToken, ideaController.getUsersIdeas);
router.post('/api/v1/comment', validators.validateToken, commentController.create);
router.get('/api/v1/comment/:ideaId', commentController.fetchComment);

export default router;

