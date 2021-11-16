// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'grace-shopper-db'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// line 13, might need for later, might need quotes around username and password
async function CreateUser({username, password, userEmail, isSeller, isAdmin }){
try {
  const { rows:[user], } = await client.query(`
      INSERT INTO users(username, password, "userEmail", "isSeller", "isAdmin") 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
  `,[username, password, userEmail, isSeller, isAdmin])
  return user
} catch (error) {
  throw error;
}}

module.exports = {
  CreateUser,
  client,
}