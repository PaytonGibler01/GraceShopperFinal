const client = require("./client")

async function createUser({
  username,
  password,
  userEmail,
  isSeller,
  isAdmin,
}) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, "userEmail", "isSeller", "isAdmin") 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
  `,
      [username, password, userEmail, isSeller, isAdmin]
    );

    console.log(user, "User Log")
    return user;
  } catch (error) {
    throw error;
  }
}
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * 
        FROM users WHERE id = $1;
      `, [id]
    );

    if (!user) {
      return null
    };

    delete user.password
    return user;

  } catch (error) {
    throw error
  };
};

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    getAllUsers
}

