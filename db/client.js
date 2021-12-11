require('dotenv').config(); 
const { Client } = require("pg");

const DB_URL =
  process.env.DATABASE_URL 
console.log(DB_URL, "DB URL")
const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined
});

module.exports = client;