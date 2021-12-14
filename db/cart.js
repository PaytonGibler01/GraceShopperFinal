const client = require("./client");

async function createCart(userId) {
  try {
    console.log("Creating your cart");
    const { rows: [cart] } = await client.query(
      `
        INSERT INTO carts("userId") 
        VALUES ($1)
        RETURNING *;
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
        VALUES ($1, $2)
        RETURNING *;
        `,
      [productId, cartId]
    );
    console.log(cart_item, "Cart Item Log")
    console.log("Finished creating your item");
    return cart_item;
  } catch (error) {
    throw error;
  }
}


async function getAllItemsByCartId({cartId}){
    try {
        const {rows} = await client.query(`
        SELECT * FROM cart_items
        WHERE "cartId"=$1;
        `, [cartId])
        console.log(rows, "Get All Logs")
        return rows
    } catch (error) {
        
    }  
}

async function addItemToCart({ productId, cartId }) {
  try {
    console.log("Adding item to cart");
    const {
      rows: [item],
    } = await client.query(
      `
      SELECT * FROM cart_items
      JOIN carts ON cart.id = cart_items."cartId"
      WHERE "cartId" = ${cartId};
    `,
      [productId, cartId]
    );
    console.log("Finished adding item");
    return item;
  } catch (error) {
    throw error;
  }
}

async function removeItemFromCart(productId) {
  try {
    await client.query(
      `
        DELETE FROM cart_items
        WHERE "productId"=$1;
        `,
      [productId]
    );
  } catch (error) {
    throw error;
  }
}

async function getCartByUserId(userId) {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM carts
      WHERE "userId" = $1
        
        `,
      [userId]
    );
    return rows
  } catch (error) {
    throw error;
  }
}

async function getCartItemsById(cartId) {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM cart_items
      WHERE "cartId" = $1
        
        `,
      [cartId]
    );
    return rows
  } catch (error) {
    throw error;
  }
}
async function getCartByUserId(userId) {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM carts
      WHERE "userId" = $1
        
        `,
      [userId]
    );
    return rows
  } catch (error) {
    throw error;
  }
}
async function getCartItems() {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM cart_items
        `
    );
    console.log(rows,"db rows getCartItems")
    return rows
   
  } catch (error) {
    throw error;
  }
}
async function getCart() {
  try {
    const { rows } = await client.query(
      `
      SELECT * 
      FROM carts
        `
    );
    return rows
  } catch (error) {
    throw error;
  }
}



module.exports = {
  createCart,
  createCart_Item,
  getAllItemsByCartId,
  addItemToCart,
  removeItemFromCart,
  getCartByUserId,
  getCartItems,
  getCart,
  getCartItemsById,
};
