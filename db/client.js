const { Client } = require("pg");

const DB_NAME = "grace-shopper-db";
const DB_URL =
  process.env.DATABASE_URL 

const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined
});

module.exports = client;