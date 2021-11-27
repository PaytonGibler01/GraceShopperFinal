const { client } = require("./client");

async function addToCart({ cartOwner, itemId }) {
  try {
    const { rows: cart } = await client.query(
      `
        INSERT INTO cart("cartOwner", "itemId")
        VALUES ($1, $2)
        ON CONFLICT "itemId" DO NOTHING
        `,
      [cartOwner, itemId]
    );

    return cart
  } catch (error) {
    throw error;
  }
}



async function deleteCart(id){
    try {
        await client.query(`
        DELETE FROM cart 
        WHERE id=$1
        `, [id])
    } catch (error) {
        throw error
    }
}

module.exports = {
  addToCart,
  deleteCart
};
