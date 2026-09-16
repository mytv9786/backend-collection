import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "s123",
//   database: "collection",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "s123",
  database: process.env.DB_NAME || "collection",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306, // పోర్ట్ నంబర్ కోసం
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("Successfully connected to MySQL database!");
    conn.release(); // Release it back to the pool
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

export default pool;
