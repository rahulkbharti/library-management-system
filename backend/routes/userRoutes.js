import express from 'express';
import UserController from "../controllers/userController.js";
const router = express.Router();
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:email', UserController.getUserByEmail);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
export default router;