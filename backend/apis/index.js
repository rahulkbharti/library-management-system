import chalk from "chalk";
import express from "express";
import db from "../config/db.js";
import session from "express-session";
import MySQLStore from "express-mysql-session";
const router = express.Router();
const sessionStore = MySQLStore(session); // Initialize MySQLStore with session

import auth from "./auth/auth.js";
import books from "./book/books.js";
import transactions from "./transaction/transactions.js";

const store = new sessionStore({
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutes
    expiration: 86400000, // 1 day
}, db);

// Configure the session middleware
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store,
}));
// Middleware for logging request time
router.use((req, res, next) => {
    // console.log(chalk.red(`Request [${req.method}] :`), chalk.yellow(new Date()));
    // console.log(chalk.red('User Agent:'), chalk.yellow(req.get('user-agent')));
    console.log("--------------------------------------------------");
    console.log(chalk.red('Request Time:'), chalk.yellow(new Date()));
    console.log(chalk.red('Request URL:'), chalk.yellow(req.originalUrl));
    console.log(chalk.red('Request Type:'), chalk.yellow(req.method));
    console.log(chalk.red('Request IP:'), chalk.yellow(req.ip));
    console.log(chalk.red('Session Data:'), chalk.yellow(JSON.stringify(req.session)));
    console.log("------------------------------------------------");
    next();
});
router.get('/', (req, res) => {
    res.send('Welcome to the Library Management System Version 2');
});
router.use('/auth', auth);
router.use('/books', books);
router.use('/transactions', transactions);

export default router;