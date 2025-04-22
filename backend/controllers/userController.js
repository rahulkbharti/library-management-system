import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import db from '../config/db.js'; // Assume this exports a MySQL connection instance

const userModel = new UserModel(db);

export default class UserController {
    static async createUser(req, res) {
        const { name, email, password, role, department } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const result = await userModel.createUser({ name, email, hashedPassword, role, department });

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

    // Logic For User Self Operations
    // REGISTER
    static async register(req, res) {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const query = 'INSERT INTO Users (name, password, email) VALUES (?, ?, ?)';
            const result = await db.query(query, [username, hashedPassword, email]);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error in register:', error);
            res.status(500).json({ message: 'Failed to register user', error: error.message });
        }
    }
    // LOGIN 
    static async login(req, res) {
        const { username, password } = req.body;

        try {
            const query = 'SELECT * FROM Users WHERE email = ?';
            const [user] = await db.query(query, [username]);

            if (user && await bcrypt.compare(password, user.password)) {
                req.session.user = { id: user.user_id, username: user.username };  // Storing user in session
                res.status(200).json({ message: 'Logged in successfully', user: req.session.user });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error in login:', error);
            res.status(500).json({ message: 'Failed to log in', error: error.message });
        }
    }
    // LOGOUT
    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out' });
            }

            res.status(200).json({ message: 'Logged out successfully' });
        });
    }

}
