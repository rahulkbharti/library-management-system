import DepartmentModel from '../models/departmentModel.js';
import db from '../config/db.js';

const departmentModel = new DepartmentModel(db);

export default class DepartmentController {
    static async createDepartment(req, res) {
        const { name, description } = req.body;

        try {
            const result = await departmentModel.createDepartment({ name, description });

            if (result.success) {
                return res.status(201).json({ message: 'Department created successfully', departmentId: result.departmentId });
            }

            res.status(500).json({ message: 'Failed to create department', error: result.error });
        } catch (error) {
            console.error('Error in createDepartment:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllDepartments(req, res) {
        try {
            const result = await departmentModel.getAllDepartments();

            if (result.success) {
                return res.status(200).json(result.departments);
            }

            res.status(500).json({ message: 'Failed to fetch departments', error: result.error });
        } catch (error) {
            console.error('Error in getAllDepartments:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getDepartmentById(req, res) {
        const { departmentId } = req.params;

        try {
            const result = await departmentModel.getDepartmentById(departmentId);

            if (result.success) {
                if (result.department) {
                    return res.status(200).json(result.department);
                }
                return res.status(404).json({ message: 'Department not found' });
            }

            res.status(500).json({ message: 'Failed to fetch department', error: result.error });
        } catch (error) {
            console.error('Error in getDepartmentById:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateDepartment(req, res) {
        const { departmentId } = req.params;
        const { name, description } = req.body;

        try {
            const result = await departmentModel.updateDepartment(departmentId, { name, description });

            if (result.success) {
                return res.status(200).json({ message: 'Department updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update department', error: result.error });
        } catch (error) {
            console.error('Error in updateDepartment:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteDepartment(req, res) {
        const { departmentId } = req.params;

        try {
            const result = await departmentModel.deleteDepartment(departmentId);

            if (result.success) {
                return res.status(200).json({ message: 'Department deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete department', error: result.error });
        } catch (error) {
            console.error('Error in deleteDepartment:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
