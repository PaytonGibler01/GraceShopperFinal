const { client } = require("./index");
const {
  createProduct,
  getProductByName,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductByTagName,
} = require("./products");
const { createTags, addTagsToProduct } = require("./tags");

async function createReview({ title, content}) {
  try {
    const {
      rows: [review],
    } = await client.query(
      ` INSERT INTO reviews(title, content)
            VALUES($1, $2)
            RETURNING *;
            `,
      [title, content]
    );
        return review
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

async function createProductReview(productId, reviewId) {
  try {
    await client.query(
      `
      INSERT INTO product_reviews("productId", "reviewId")
      VALUES ($1, $2)
      ON CONFLICT ("productId", "reviewId") DO NOTHING;
      `,
      [productId, reviewId]
    );
  } catch (error) {
    throw error;
  }
}

async function addReviewsToProduct(productId, reviewList) {
  try {
    console.log(reviewList)
    await Promise.all(createProductReviewPromises);
    return await getProductById(productId);
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
  addReviewsToProduct,
  deleteReview,
};
