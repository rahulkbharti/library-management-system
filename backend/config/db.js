import mysql from 'mysql';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    connectionLimit: 5,
};

const db = mysql.createPool(dbOptions);
db.getConnection((err, connection) => {
    if (err) {
        console.error(chalk.red('Database connection error:'), err);
    } else {
        console.log(chalk.blue('Database connected successfully'));
        connection.release();
    }
});
// console.log(chalk.blue('MySQL connection pool created successfully'));

export default db;
