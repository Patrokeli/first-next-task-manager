// db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'task_user', // Replace with 'root' if you didn't create a new user
  password: 'password', // Replace with your password
  database: 'task_manager',
});

export default pool;
