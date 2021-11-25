const { Client } = require("pg");

const DB_NAME = "grace-shopper-db";
const DB_URL =
  // process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
  process.env.DATABASE_URL || `postgres://postgres@localhost:5433/${DB_NAME}`;

const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined
});

module.exports = client;