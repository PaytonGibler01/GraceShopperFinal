const { Client } = require('pg');
const { products } = require('./products');
const { tags, addTagsToProduct } = require('./tags');

async function createReview({
    authorId,
    title,
    content,
    tags = []
}) {
    try {
        const { rows: [ post ] } = await client.query(
            ` INSERT INTO products("authorId", title content)
            VALUES($1, $2, $3)
            RETURNING *;
            `, [authorId, title, content]
        );

        const tagList = await createTags(tags);

        return await addTagsToProduct(product.id, tagList);
    } catch (error) {
        console.log(error)
    }
};


async function getReviewByProductId(productId) {
    try {
        const { rows: [product] } = await client.query(`
        SELECT id, name, location
        FROM products
        WHERE id=${ productId }
        `);

        if (!product) {
            return null
        };

        return product;
    } catch (error) {
        throw error;
    }
};

async function getAllReviewsByProductId() {
    try {
        const { rows: productIds } = await client.query(
            `SELECT id
            FROM products
            `
        );

        const products = await Promise.all(productIds.map(
            product => getProductById( product.id )
        ));

        return products;
    } catch (error) {
        throw error;
    }
};

async function deleteReview(id) {
    try {
        
        await client.query(
            ` DELETE FROM products
            WHERE "authorId"=$1;
            `, [id]);
        
        const { rows: [product] } = await client.query(
            ` DELETE FROM products
            WHERE id=$1
            RETURNING *;
            `, [id]);

        return product;
    } catch (error) {
        throw error
    };
};

module.exports = {
    createReview,
    getReviewByProductId,
    getAllReviewsByProductId,
    deleteReview
};