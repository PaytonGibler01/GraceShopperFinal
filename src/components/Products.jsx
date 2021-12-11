import React from "react";
import { SingleProducts } from ".";
import { Link } from "react-router-dom";

import "./Products.css"

const Products = ({ products }) => {
  return (
    <div className="products-main-container">
      {products.length
        ? products.map((product) => {
            return product.id ? (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="link-tag"
              >
                <SingleProducts product={product} />
              </Link>
            ) : null;
          })
        : null}
    </div>
  );
};

export default Products;
