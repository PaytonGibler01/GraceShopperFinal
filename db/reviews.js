const client = require("./client")

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

// async function addReviewsToProduct(products) {
//     const productsToReturn = [...products];
//     const binds = products.map((_, index) => `$${index + 1}`).join(", ");
//     const productIds = products.map((product) => product.id);
//     if (!productIds?.length) return;
//   try {
//     const { rows: reviews } = await client.query(
//                 `
//                   SELECT reviews.*, product_reviews."productId", product_reviews."reviewId"
//                   FROM 
//                   JOIN routine_activities ON routine_activities."activityId" = activities.id
//                   WHERE routine_activities."routineId" IN (${binds});
//                 `,
//                 productIds
//               );
//               // loop over the routines
//               for (const product of productsToReturn) {
//                 // filter the activities to only include those that have this routineId
//                 const reviewsToAdd = reviews.filter(
//                   (review) => review.productId === product.id
//                 );
//                 // attach the activities to each single routine
//                //product.reviews = reviewsToAdd;
//               }
//               return productsToReturn;
//     // console.log(reviewList)
//     // await Promise.all(createProductReviewPromises);
//     // return await getProductById(productId);
//   } catch (error) {
//     throw error;
//   }
// }

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
