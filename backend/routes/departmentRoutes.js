import express from 'express';
import DepartmentController from '../controllers/departmentController.js';

const router = express.Router();

// Route to create a new department
router.post('/', DepartmentController.createDepartment);

// Route to fetch all departments
router.get('/', DepartmentController.getAllDepartments);

// Route to fetch a single department by ID
router.get('/:departmentId', DepartmentController.getDepartmentById);

// Route to update an existing department by ID
router.put('/:departmentId', DepartmentController.updateDepartment);

// Route to delete a department by ID
router.delete('/:departmentId', DepartmentController.deleteDepartment);

export default router;