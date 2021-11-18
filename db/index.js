// Connect to DB
const { Client } = require("pg");

const DB_NAME = "grace-shopper-db";
const DB_URL = process.env.DATABASE_URL || `postgres://postgres@localhost:5432/${DB_NAME}`;

const client = new Client({
  connectionString: DB_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

const {
  createProduct,
  getProductByName,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductByTagName,
} = require("./products");

const {
  createTags,
  getAllTags,
  createProductTag,
  addTagsToProduct,
} = require("./tags");

const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./users");

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({
      username: "albert",
      password: "bertie99",
      userEmail: "joegmail.com",
      isSeller: "false",
      isAdmin: "false",
    });
    await createUser({
      username: "sandra",
      password: "2sandy4me",
      userEmail: "sandragmail.com",
      isSeller: "true",
      isAdmin: "false",
    });
    await createUser({
      username: "glamgal",
      password: "soglam",
      userEmail: "glamgmail.com",
      isSeller: "true",
      isAdmin: "true",
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    await createProduct({
      name: "Event Horizon",
      description:
        "The Event Horizon is a research class vessel equipped with an experimental hyperspace drive. Disclaimer: Passengers may experience disturbing visions.",
      price: 1000000000000,
      image: "https://screengoblin.files.wordpress.com/2014/11/event.jpg",
      sellerName: "Dr, William Weir",
    });
    await createProduct({
      name: "USG Ishimura",
      description:
        "A first of its kind planet cracking mining vessel perfect for the entrepreneur looking to grow their business! This ship features a fresh new coat of paint and one of a king acoustics. Warning: Do not interact with strange relics found on board.",
      price: 5000000000,
      image:
        "https://i.pinimg.com/originals/5b/5d/1f/5b5d1fb77feb19d5c5f0525ae5d99aa8.jpg",
      sellerName: "Concordance Extraction Corporation",
    });
    await createProduct({
      name: "Nostromo",
      description:
        "A commercial shipping vessel made for a standard crew of 7, 6 humans and 1 android. Android not included. Warning: Do not interfere with unusual eggs",
      price: 150000000,
      image:
        "https://www.grafxwork.com/projets/sta/img/vaisseaux/nostromo/nostromo-01.jpg",
      sellerName: "Weyland-Yutani Corporation",
    });

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

module.exports = {
  createInitialUsers,
  createInitialProducts,
  client,
};
