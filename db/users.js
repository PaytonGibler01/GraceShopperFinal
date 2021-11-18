const client = require("./client");

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

}
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username, name, "userEmail", "isSeller", "isAdmin"
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}
    
module.exports = {
    CreateUser,
    getAllUsers,
  };