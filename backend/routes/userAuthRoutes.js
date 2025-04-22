import express from 'express';
import UserAuthController from '../controllers/userAuthController.js';

const router = express.Router();

router.post('/register', UserAuthController.register);
router.post('/login', UserAuthController.login);
router.post('/logout', UserAuthController.logout);
router.put('/update', UserAuthController.isAuthenticated, UserAuthController.updateAccount);
router.delete('/delete', UserAuthController.isAuthenticated, UserAuthController.deleteAccount);

export default router;
