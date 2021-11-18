// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'grace-shopper-db'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;

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
} = require("./products");
const {getAllUsers} = require('./users')

// line 13, might need for later, might need quotes around username and password




module.exports = {
  CreateUser,
  client,
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
  getAllUsers,

  ...require("./users"),
  // db methods


}




