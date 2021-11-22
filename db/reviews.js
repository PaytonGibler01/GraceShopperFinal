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
const { createTags, addTagsToProduct } = require("./tags");

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

async function getReviewByProductId(productId) {
  try {
    const {
      rows: [reviews],
    } = await client.query(`
        SELECT id, title, content
        FROM product_reviews
        WHERE "productId"=${productId}
        `);

    if (!reviews) {
      return null;
    }

    return reviews;
  } catch (error) {
    throw error;
  }
}

async function getAllReviewsByProductId(productId) {
  try {
    const { rows: reviews } = await client.query(
      `SELECT * FROM product_reviews
      WHERE "productId"=$1
            `,
      [productId]
    );

    if (!reviews) {
      return null;
    }

    return reviews;
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
  getReviewByProductId,
  getAllReviewsByProductId,
  // addReviewsToProduct,
  deleteReview,
};
