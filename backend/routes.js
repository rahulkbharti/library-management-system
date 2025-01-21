import express from 'express';
import db from './config/db.js';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import chalk from 'chalk';

import mainRoutes from "./routes/mainRoutes.js";

const router = express.Router();
const sessionStore = MySQLStore(session); // Initialize MySQLStore with session

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
router.use("/", mainRoutes);

export default router;
