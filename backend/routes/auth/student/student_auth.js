// authRoutes.js
import chalk from 'chalk';
import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../../config/db.js';
import StudentModel from '../../../models/student_model.js';

const router = express.Router();
const studentModel = new StudentModel(db);

router.post('/signup', async (req, res) => {
    const { roll_number, full_name, email, username, password, branch, year, address } = req.body;

    const user = await studentModel.getUserByUserName(username);
    // Check if the username is already taken
    if (user) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const hashed_password = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await studentModel.createUser(roll_number, full_name, email, username, hashed_password, branch, year, address);
    if (newUser.status === 500) {
        return res.status(500).json({ error: newUser.error });
    }
    req.session.user = newUser.user; // Automatically log in the user after signup
    req.session.type = "student";
    res.json({ message: 'Signup successful', user: newUser.user });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(chalk.red(`username :${username}, password :${password}`));
    // Check if the user exists and the password is correct
    const user = await studentModel.getUserByUserName(username);

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.hashed_password);
        if (passwordMatch) {
            // Authentication successful
            req.session.user = user; // Log in the user
            req.session.type = "student";
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
    }
});

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.type === 'student') {
        // User is authenticated, proceed to the next middleware or route
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
        res.json({ message: 'Bad Credentials', status: 401 }); // You can redirect to a login page, for example
    }
};

router.get('/profile', isAuthenticated, (req, res) => {
    const student = req.session.user;
    res.json({ message: 'This is a student protected route', student });
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
});

export default router;
