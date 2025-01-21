import UserModel from '../models/userModel.js';
import db from '../config/db.js'; // Assume this exports a MySQL connection instance

const userModel = new UserModel(db);

export default class UserController {
    static async createUser(req, res) {
        const { name, email, password, role, department } = req.body;

        try {
            const result = await userModel.createUser({ name, email, password, role, department });

            if (result.success) {
                return res.status(201).json({ message: 'User created successfully', userId: result.userId });
            }

            res.status(500).json({ message: 'Failed to create user', error: result.error });
        } catch (error) {
            console.error('Error in createUser:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getUserByEmail(req, res) {
        const { email } = req.params;

        try {
            const result = await userModel.getUserByEmail(email);

            if (result.success) {
                if (result.user) {
                    return res.status(200).json(result.user);
                }
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(500).json({ message: 'Failed to fetch user', error: result.error });
        } catch (error) {
            console.error('Error in getUserByEmail:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const result = await userModel.getAllUsers();

            if (result.success) {
                return res.status(200).json(result.users);
            }

            res.status(500).json({ message: 'Failed to fetch users', error: result.error });
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async updateUser(req, res) {
        const { userId } = req.params;
        const updates = req.body;

        try {
            const result = await userModel.updateUser(userId, updates);

            if (result.success) {
                return res.status(200).json({ message: 'User updated successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to update user', error: result.error });
        } catch (error) {
            console.error('Error in updateUser:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async deleteUser(req, res) {
        const { userId } = req.params;

        try {
            const result = await userModel.deleteUser(userId);

            if (result.success) {
                return res.status(200).json({ message: 'User deleted successfully', affectedRows: result.affectedRows });
            }

            res.status(500).json({ message: 'Failed to delete user', error: result.error });
        } catch (error) {
            console.error('Error in deleteUser:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
