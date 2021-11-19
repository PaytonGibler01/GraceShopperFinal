const client = require("./index");

async function createTags(tagList) {
  if (tagList.length === 0 || !tagList) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join(`), (`);

  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(`, `);

  try {
    await client.query(
      `
      INSERT INTO tags(name)
      VALUES (${insertValues})
      ON CONFLICT (name) DO NOTHING;
      `,
      tagList
    );

    const { rows } = await client.query(
      `
      SELECT * FROM tags
      WHERE name
      IN (${selectValues});
      `,
      tagList
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

async function createProductTag(productId, tagId) {
  try {
    await client.query(
      `
    INSERT INTO product_tags("productId", "tagId")
    VALUES ($1, $2)
    ON CONFLICT ("productId", "tagId") DO NOTHING;
    `,
      [productId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToProduct(productId, tagList) {
  try {
    const createProductTagPromises = tagList.map((tag) =>
      createProductTag(productId, tag.id)
    );
    await Promise.all(createProductTagPromises);
    return await getProductById(productId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTags,
  getAllTags,
  createProductTag,
  addTagsToProduct,
};
