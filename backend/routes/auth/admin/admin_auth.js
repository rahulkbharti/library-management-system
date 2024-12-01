// authRoutes.js
import chalk from 'chalk';
import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../../config/db.js';

import AdminModel from '../../../models/admin_model.js';
import StudentModel from '../../../models/student_model.js';

const router = express.Router();

const adminModel = new AdminModel(db);
const studentModel = new StudentModel(db);

router.post('/signup', async (req, res) => {
    const { username, password, full_name, email } = req.body;

    const user = await adminModel.getUserByUserName(username);
    // Check if the username is already taken
    if (user) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const hashed_password = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await adminModel.createUser(username, hashed_password, full_name, email);

    req.session.user = newUser; // Automatically log in the user after signup
    req.session.type = "admin";
    res.json({ message: 'Signup successful', user: newUser });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    const user = await adminModel.getUserByUserName(username);

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.hashed_password);
        if (passwordMatch) {
            // Authentication successful
            req.session.user = {
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                role: "admin"
            }; // Log in the user
            req.session.type = "admin";
            req.session.cookie.maxAge = 1000 * 60;
            //req.session.cookie.maxAge = 3600000 * 24; // expire after 24 hours
            res.json({ message: 'Login successful', user: req.session.user });
        }
        else {
            res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized: Invalid username or password' });
    }
});


const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.type == "admin") {
        // User is authenticated, proceed to the next middleware or route
        return next();
    } else {
        // User is not authenticated, redirect or handle accordingly
        res.json({ message: " Bad Credentials", status: "401" }); // You can redirect to a login page, for example
    }
};

router.get('/profile', isAuthenticated, (req, res) => {
    const user = req.session.user;
    res.json({ message: 'This is a admin protected route', user });
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
});

router.get('/getAllStudents', async (req, res) => {
    const students = await studentModel.getAllUsers();

    res.json({ message: 'All Students', list: students });

    //  res.status(401).json({message:" Bad Credentials"});
});
router.get('/getStudent', async (req, res) => {
    const { roll_number } = req.query;
    if (!roll_number) {
        return res.status(400).json({ message: 'roll_number is required' });
    }
    const student = await studentModel.getStudent(roll_number);
    if (student) {
        return res.json({ message: 'Student Details', student: student });
    }
    return res.status(400).json({ message: 'Student not found' });
});

export default router;


