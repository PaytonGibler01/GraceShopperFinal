const client = require("./index");


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
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return;
    }

    if (user.password !== password) {
      return;
    }

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
};

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
    getUser,
    getUserById,
    getUserByUsername
}

