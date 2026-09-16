import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DBCAL_PASSWORD,
//   database: process.env.DB_NAME,
//   //port: process.env.DB_PORT ? parseInt(process.env.DB_LOCAL_PORT) : 3306, // పోర్ట్ నంబర్ కోసం
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   // క్లౌడ్ డేటాబేస్ కోసం SSL కాన్ఫిగరేషన్ ఇక్కడ యాడ్ చేశాము 👇
//   ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false,
// });

// pool
//   .getConnection()
//   .then((conn) => {
//     console.log("Successfully connected to MySQL database!");
//     conn.release(); // Release it back to the pool
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err.message);
//   });

// export default pool;
