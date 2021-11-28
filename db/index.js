// Connect to DB
// const { Client } = require("pg");

// const DB_NAME = "grace-shopper-db";
// const DB_URL =
//   process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

// const client = new Client({
//   connectionString: DB_URL,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : undefined
// });
// console.log(client, "index")

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
  getAllUsers,
} = require("./users");

const { createCart, createCart_Item, addItemToCart } = require("./cart");
const { createReview, addReviewsToProduct } = require("./reviews");
const client = require("./client");

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

async function createInitialReviews() {
  try {
    console.log("Starting to create reviews...");

    await createReview({
      title: "Test",
      content: "This is only a test",
      productId: 1,
    });
    await createReview({
      title: "Second Test",
      content: "Another test",
      productId: 2,
    });
    await createReview({
      title: "Third Test",
      content: "Final Test",
      productId: 3,
    });

    console.log("Finished creating reviews!");
  } catch (error) {
    console.error("Error creating reviews!", error);
  }
}

async function createInitialTags() {
  try {
    console.log("Starting to create tags...");

    const [happy, sad, inspo, catman] = await createTags([
      "#happy",
      "#worst-day-ever",
      "#youcandoanything",
      "#catmandoeverything",
    ]);

    const [postOne, postTwo, postThree] = await getAllProducts();

    await addTagsToProduct(postOne.id, [happy, inspo]);
    await addTagsToProduct(postTwo.id, [sad, inspo]);
    await addTagsToProduct(postThree.id, [happy, catman, inspo]);
    console.log("Finished creating tags!");
  } catch (error) {
    console.error("Error creating tags!", error);
  }
}

async function createInitialCart() {
  try {
    console.log("Creating cart");
    await createCart(1);
    await createCart_Item({ productId: 1, cartId: 1 });
    // await addItemToCart({productId: 1, cartId: 1});
    console.log("Finished creating cart!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createInitialUsers,
  createInitialProducts,
  createInitialReviews,
  createInitialTags,
  createInitialCart,
};
