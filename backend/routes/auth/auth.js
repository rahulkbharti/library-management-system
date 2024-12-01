import express from 'express';
import adminAuth from './admin/admin_auth.js';
import studentAuth from './student/student_auth.js';

const router = express.Router();
// 
router.use('/admin', adminAuth);
router.use('/student', studentAuth);

export default router;