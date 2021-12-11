const client = require("./client");

const {
  createInitialProducts,
  createInitialReviews,
  createInitialUsers,
  createInitialCategories,
  createInitialCart,
} = require("./index");
const { getAllUsers } = require("./users");

async function buildTables() {
  try {
    client.connect();
    console.log("Dropping tables!");
    await client.query(`

    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS product_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropped tables!");


    console.log("Building tables.");
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "userEmail" VARCHAR(255) UNIQUE NOT NULL,
        "isSeller" BOOLEAN DEFAULT 'false',
        "isAdmin" BOOLEAN DEFAULT 'false'
      );

      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255) UNIQUE NOT NULL,
        "sellerName" VARCHAR(255) REFERENCES users(username) NOT NULL,
        price BIGINT NOT NULL,
        tag VARCHAR(255) REFERENCES categories(name) NOT NULL
      );
      
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL
      );
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) NOT NULL,
        "isOrdered" BOOLEAN DEFAULT 'false'
      );
      CREATE TABLE cart_items(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "cartId" INTEGER REFERENCES carts(id)
      );
    `);

    console.log("Finished building tables!");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    await buildTables();
    await createInitialUsers();
    await createInitialCategories();
    await createInitialProducts();
    await createInitialReviews();
    await createInitialCart();
  } catch (error) {
    throw error;
  }
}

populateInitialData()
  .catch(console.error)
  .finally(() => client.end());
