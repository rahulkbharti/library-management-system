import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import db from '../config/db.js';

// Assuming userModel is already instantiated with the database connection
const userModel = new UserModel(db);

class UserAuthController {
    // Register a new user
    static async register(req, res) {
        const { name, email, password, role, department } = req.body;

        try {
            // Check if user already exists
            const { success, user } = await userModel.getUserByEmail(email);
            if (!success) throw new Error('Error checking existing user');
            if (user) return res.status(400).json({ message: 'Email already registered' });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const result = await userModel.createUser({
                name,
                email,
                hashedPassword,
                role,
                department,
            });
            if (!result.success) throw new Error(result.error);

            res.status(201).json({ message: 'User registered successfully', userId: result.userId });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // Login a user
    static async login(req, res) {
        const { email, password } = req.body;
        console.log(req.body);

        try {
            // Check if user exists
            const { success, user } = await userModel.getUserByEmail(email);
            if (!success) throw new Error('Error fetching user');
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Validate password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

            // Set session
            req.session.userId = user.user_id;
            req.session.role = user.role;

            res.status(200).json({ message: 'Login successful', userId: user.user_id });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // Logout a user
    static async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) return res.status(500).json({ message: 'Logout failed', error: err.message });
                res.clearCookie('connect.sid'); // Clear session cookie
                res.status(200).json({ message: 'Logout successful' });
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // Middleware to ensure the user is authenticated
    static isAuthenticated(req, res, next) {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }

    // Middleware to ensure the user is an admin
    static isAdmin(req, res, next) {
        if (req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
        next();
    }

    // Update user account
    static async updateAccount(req, res) {
        const userId = req.session.userId;
        const updates = req.body;

        try {
            if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            const result = await userModel.updateUser(userId, updates);
            if (!result.success) throw new Error(result.error);

            res.status(200).json({ message: 'Account updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // Delete user account
    static async deleteAccount(req, res) {
        const userId = req.session.userId;

        try {
            if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            const result = await userModel.deleteUser(userId);
            if (!result.success) throw new Error(result.error);

            // Destroy session after account deletion
            req.session.destroy((err) => {
                if (err) return res.status(500).json({ message: 'Account deleted but session cleanup failed' });
                res.clearCookie('connect.sid');
                res.status(200).json({ message: 'Account deleted successfully' });
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

export default UserAuthController;
