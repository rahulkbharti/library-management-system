import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mainRouter from './routes.js';

const app = express();
const PORT = process.env.PORT || 8001;
const ALLOWED_LIST = ['http://localhost:3001', 'http://localhost:3000', "http://localhost:5173"];

// Use CORS middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || ALLOWED_LIST.includes(origin)) {
            callback(null, true);
        } else {
            console.log(chalk.bgRed(`Request from origin ${origin} blocked by CORS`));
            // Continue processing the request without setting headers
            callback(null, false);
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type',
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Middleware for logging request time
app.use((req, res, next) => {
    console.log(chalk.red(`Request [${req.method}] :`), chalk.yellow(new Date()));
    console.log(chalk.red('User Agent:'), chalk.yellow(req.get('user-agent')));
    next();
});

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System');
});
app.use('/', mainRouter);

// Start the server
app.listen(PORT, () => {
    console.log(chalk.green('Server listening on PORT'), chalk.cyan(PORT));
});
