const client = require("./client");

const {
  createProduct,
  getProductByName,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductByTagName,
  getProductById,
} = require("./products");
const { createTags } = require("./tags");

async function createReview({ title, content, productId }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      ` INSERT INTO reviews(title, content, "productId")
            VALUES($1, $2, $3)
            RETURNING *;
            `,
      [title, content, productId]
    );
    return review;
  } catch (error) {
    console.log(error);
  }
}

async function getAllReviews() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM reviews;
        `);
// console.log(rows)
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteReview(id) {
  try {
    await client.query(
      ` DELETE FROM products
            WHERE id=$1;
            `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
};
