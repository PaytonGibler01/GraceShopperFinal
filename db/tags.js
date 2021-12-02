const client = require("./client")

const {getProductById} = require("./products")

async function createCategories(categoryList) {
  if (categoryList.length === 0 || !categoryList) {
    return;
  }

  const insertValues = categoryList.map((_, index) => `$${index + 1}`).join(`), (`);

  const selectValues = categoryList.map((_, index) => `$${index + 1}`).join(`, `);

  try {
    await client.query(
      `
      INSERT INTO categories(name)
      VALUES (${insertValues})
      ON CONFLICT (name) DO NOTHING;
      `,
      categoryList
    );

    const { rows } = await client.query(
      `
      SELECT * FROM categories
      WHERE name
      IN (${selectValues});
      `,
      categoryList
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM tags;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

// async function createProductTag(productId, tagId) {
//   try {
//     await client.query(
//       `
//     INSERT INTO product_tags("productId", "tagId")
//     VALUES ($1, $2)
//     ON CONFLICT ("productId", "tagId") DO NOTHING;
//     `,
//       [productId, tagId]
//     );
//   } catch (error) {
//     throw error;
//   }
// }

// async function addTagsToProduct(productId, tagList) {
//   try {
//     const createProductTagPromises = tagList.map((tag) =>
//       createProductTag(productId, tag.id)
//     );
//     await Promise.all(createProductTagPromises);
//     return await getProductById(productId);
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  createCategories,
  getAllTags,
  // createProductTag,
  // addTagsToProduct,
};
