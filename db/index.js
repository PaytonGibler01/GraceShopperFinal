// Connect to DB
const { Client } = require("pg");
const DB_NAME = "change-this-name";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const {
  createProduct,
  getProductByName,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductByTagName,
  createTags,
  getAllTags,
  createProductTag,
  addTagsToProduct,
} = require("/products");

// database methods

// export
module.exports = {
  client,
  ...require("./users"),
  // db methods
};
