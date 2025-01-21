import express from 'express';
import studentAuth from "./students.js";
import adminAuth from "./admins.js";

const router = express.Router();
router.use("/students", studentAuth);
router.use("/admins", adminAuth);
export default router;