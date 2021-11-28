const client = require("./client");

async function createCart(userId) {
  try {
    console.log("Creating your cart");
    const { rows: [cart] } = await client.query(
      `
        INSERT INTO cart("userId") 
        VALUES ($1);
        `,
      [userId]
    );
    console.log("Finished creating your cart");
    return cart;
  } catch (error) {
    throw error;
  }
}

async function createCart_Item({ productId, cartId }) {
  try {
    console.log("Creating Your Item");
    const { rows: [cart_item] } = await client.query(
      `
        INSERT INTO cart_items("productId", "cartId")
        VALUES ($1, $2);
        `,
      [productId, cartId]
    );
    console.log("Finished creating your item");
    return cart_item;
  } catch (error) {
    throw error;
  }
}

// async function addItemToCart({ productId, cartId }) {
//   try {
//     console.log("Adding item to cart");
//     const {
//       rows: [item],
//     } = await client.query(
//       `
//       SELECT * FROM cart_items
//       JOIN cart ON cart.id = cart_items."cartId"
//       WHERE "cartId" = ${cartId};
//     `,
//       [productId, cartId]
//     );
//     console.log("Finished adding item");
//     return item;
//   } catch (error) {
//     throw error;
//   }
// }

async function removeItemFromCart(productId) {
  try {
    await client.query(
      `
        DELETE FROM cart 
        WHERE "productId"=$1
        `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  createCart_Item,
//   addItemToCart,
  removeItemFromCart,
};
