// code to build and initialize DB goes here
const client = require("./client");

const {
  createInitialProducts,
  createInitialReviews,
  createInitialUsers,
  createInitialTags,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();
    await client.query(`
    DROP TABLE IF EXISTS product_reviews;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS product_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    // drop tables in correct order

    // build tables in correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "userEmail" VARCHAR(255) NOT NULL,
        "isSeller" BOOLEAN DEFAULT 'false',
        "isAdmin" BOOLEAN DEFAULT 'false'
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255) UNIQUE NOT NULL,
        "sellerName" VARCHAR(255) NOT NULL,
        price BIGINT NOT NULL
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE product_tags(
        "productId" INTEGER REFERENCEs products(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE("productId", "tagId")
      );
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        content VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE product_reviews (
        "productId" INTEGER REFERENCES products(id),
        "reviewId" INTEGER REFERENCES reviews(id),
        UNIQUE("productId", "reviewId")
      )
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialTags();
    await createInitialReviews();
  } catch (error) {
    throw error;
  }
}

populateInitialData()
  .catch(console.error)
  .finally(() => client.end());
