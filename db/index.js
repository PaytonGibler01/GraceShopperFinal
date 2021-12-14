const {
  createProduct,
  getProductByName,
  updateProduct,
  getAllProducts,
  deleteProduct,
} = require("./products");

const {
  createCategories,
  getAllCategories,
} = require("./tags");

const {
  createUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
} = require("./users");

const { createCart, createCart_Item, getAllItemsByCartId, getCartItems} = require("./cart");
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
      username: "Dr. William Weir",
      password: "LiveDeliciously",
      userEmail: "DrWeir@gmail.com",
      isSeller: "true",
      isAdmin: "false",
    });
    await createUser({
      username: "Weyland-Yutani",
      password: "Xenomorph",
      userEmail: "Weyland@gmail.com",
      isSeller: "true",
      isAdmin: "false",
    });
    await createUser({
      username: "Concordance Extraction Corporation",
      password: "Necromorph",
      userEmail: "Concordance@gmail.com",
      isSeller: "true",
      isAdmin: "false",
    });
    await createUser({
      username: "Imperial Navy",
      password: "GodEmperor",
      userEmail: "Warhammer@gmail.com",
      isSeller: "true",
      isAdmin: "false",
    });
    await createUser({
      username: "Sunbeam Omnistellar",
      password: "SwanSong",
      userEmail: "SwanSong@gmail.com",
      isSeller: "true",
      isAdmin: "false",
    });
    await createUser({
      username: "HeadBoss",
      password: "AssumingDirectControl",
      userEmail: "harbinger@gmail.com",
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
      sellerName: "Dr. William Weir",
      tag: "Preowned",
    });
    await createProduct({
      name: "USG Ishimura",
      description:
        "A first of its kind planet cracking mining vessel perfect for the entrepreneur looking to grow their business! This ship features a fresh new coat of paint and one of a king acoustics. Warning: Do not interact with strange relics found on board.",
      price: 5000000000,
      image:
        "https://i.pinimg.com/originals/5b/5d/1f/5b5d1fb77feb19d5c5f0525ae5d99aa8.jpg",
      sellerName: "Concordance Extraction Corporation",
      tag: "New",
    });
    await createProduct({
      name: "Nostromo",
      description:
        "A commercial shipping vessel made for a standard crew of 7, 6 humans and 1 android. Android not included. Warning: Do not interfere with unusual eggs.",
      price: 150000000,
      image:
        "https://www.grafxwork.com/projets/sta/img/vaisseaux/nostromo/nostromo-01.jpg",
      sellerName: "Weyland-Yutani",
      tag: "Preowned",
    });
    await createProduct({
      name: "Dominus Astra",
      description:
        "The Dominus Astra is an Emperor Class Battleship of the Imperial Navy. It was pivotal in the Battle of Macragge during the First Tyrannic War. Warning: Do not engage warp drive without first activating the Geller Field",
      price: 1500000000,
      image:
        "https://i.pinimg.com/originals/68/e1/27/68e127ac2eaa8f3e837607817a804ba1.jpg",
      sellerName: "albert",
      tag: "Preowned",
    });
    await createProduct({
      name: "Bulk Freighter",
      description:
        "The Bulk Freighter Hull is perfect for short range mass cargo transport. While slow and unarmored this freighter can carry thousands of tonnes of cargo with ease. Comes with a standard Tier 1 Spike-Drive. Additional Fittings and Systems sold separately.",
      price: 5000000,
      image:
        "https://i.pinimg.com/originals/d5/8f/eb/d58feb9b53d1dc69c96e189f26b2ad1f.jpg",
      sellerName: "Sunbeam Omnistellar",
      tag: "Hull",
    });
    await createProduct({
      name: "Corvette",
      description:
        "The Corvette Hull is the standard for most naval forces. While it lacks maneuverability this standard hull has thick armor. Comes with a standard Tier 1 Spike-Drive. Additional Fittings and Systems sold separately.",
      price: 4000000,
      image:
        "https://static.turbosquid.com/Preview/2016/02/23__13_47_59/Corvette01.jpgfb17b6a7-4f7f-4b8c-bd23-ff1f8db203c3Original.jpg",
      sellerName: "Sunbeam Omnistellar",
      tag: "Hull",
    });
    await createProduct({
      name: "Free Merchant",
      description:
        "The Free Merchant Hull is the most popular hull option sold by Sunbeam Omnistellar. Perfect for a start crew of up to 6 people to explore the stars! Comes with a standard Tier 1 Spike-Drive. Additional Fittings and Systems sold separately.",
      price: 500000,
      image:
        "https://external-preview.redd.it/8UcfDj50dnKhjdBBZPXtvGMG4zWxnwMKp3lTCFJg3vQ.jpg?auto=webp&s=efc19f05178fb41bf6a88d611bba2b2d99d05958",
      sellerName: "Sunbeam Omnistellar",
      tag: "Hull",
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
      title: "Evil",
      content: "Do not buy this ship! It is alive and it is evil! 1 Star!",
      productId: 1,
    });
    await createReview({
      title: "Beware Pillars",
      content:
        "The ship is huge! Practically a floating city. But there's this strange pillar and you should avoid that at all costs.",
      productId: 2,
    });
    await createReview({
      title: "Follow Quarantine",
      content: "You're going to want to break protocol. Don't do it.",
      productId: 3,
    });

    console.log("Finished creating reviews!");
  } catch (error) {
    console.error("Error creating reviews!", error);
  }
}

async function createInitialCategories() {
  try {
    console.log("Starting to create categories...");

    await createCategories([
      "Preowned",
      "New",
      "Hull",
      "Fitting",
      "Weapon System",
    ]);

    console.log("Finished creating tags!");
  } catch (error) {
    console.error("Error creating tags!", error);
  }
}

async function createInitialCart() {
  try {
    console.log("Creating cart");
    const cart = await createCart(1);
    console.log(cart, "Cart Log");
    await createCart_Item({ productId: 1, cartId: 1 });
    await createCart_Item({ productId: 2, cartId: 1 });
    await getAllItemsByCartId({ cartId: 1 });
    await getCartItems()
    console.log("Finished creating cart!");

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createInitialUsers,
  createInitialProducts,
  createInitialReviews,
  createInitialCategories,
  createInitialCart,
 
};
