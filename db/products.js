const client = require("./client")

async function createProduct({ name, description, price, image, sellerName, tag }) {
  try {
    const { rows: product } = await client.query(
      `
        INSERT INTO products(name, description, price, image, "sellerName", tag)
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `,
      [name, description, price, image, sellerName, tag]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductByName(name) {
  try {
    const { rows: product } = await client.query(
      `
        SELECT * FROM products
        WHERE name=$1;
        `,
      [name]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const { rows: product } = await client.query(
      `
        SELECT * FROM products
        WHERE id=$1;
        `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(productId, fields = {}) {
  const { tags } = fields;
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE products
        SET ${setString}
        WHERE id=${productId}
        RETURNING *;
        `,
        Object.values(fields)
      );

      if (tags === undefined) {
        return await getProductById(productId);
      }
    }
  } catch (error) {}
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM products;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(id){
    try {
        await client.query(`
    DELETE FROM products
    WHERE id=$1
    RETURNING *;
    `, [id])
    } catch (error) {
        throw error
    }
}

module.exports = {
  createProduct,
  getProductByName,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductById
};
