import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mainRouter from './routes.js';
import apiV2 from "./apis/index.js";
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

// // Middleware for logging request time
// app.use((req, res, next) => {
//     // console.log(chalk.red(`Request [${req.method}] :`), chalk.yellow(new Date()));
//     // console.log(chalk.red('User Agent:'), chalk.yellow(req.get('user-agent')));
//     console.log("--------------------------------------------------");
//     console.log(chalk.red('Request Time:'), chalk.yellow(new Date()));
//     console.log(chalk.red('Request URL:'), chalk.yellow(req.originalUrl));
//     console.log(chalk.red('Request Type:'), chalk.yellow(req.method));
//     console.log(chalk.red('Request IP:'), chalk.yellow(req.ip));
//     console.log(chalk.red('Session Data:'), chalk.yellow(req.session));
//     console.log("------------------------------------------------");
//     next();
// });

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System');
});
app.use('/', mainRouter);
app.use('/api/v2', apiV2);


// Start the server
app.listen(PORT, () => {
    console.log(chalk.green('Server listening on PORT'), chalk.cyan(PORT));
});
