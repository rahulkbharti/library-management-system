import express from 'express';
import db from './config/db.js';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';

import auth from './routes/auth/auth.js';
// import auth1 from './routes/auth/session_auth';

import book from './routes/book/book.js';
import transaction from './routes/transaction/transaction.js';

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

router.use('/auth', auth);
router.use('/book', book);
router.use('/transaction', transaction);

// router.use('/auth1', auth1);

export default router;
