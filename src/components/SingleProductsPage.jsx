import React from "react";
import { useParams } from "react-router-dom";
import { SingleProducts } from ".";
import { getProductById } from "../api/products";

const SingleProductsPage = ({ products }) => {
  const { productId } = useParams();
  console.log(productId, "Product ID Single Products Page")
    console.log(products, "Single Products Page Log")
  const compProduct = products.find((product) => product.id == productId)
    console.log(compProduct, "compProduct Log")
  if (!compProduct) {
    return (
      <div className="product-card">
        <h3> The product with id {productId} was not found</h3>
      </div>
    );
  }

  return (
    <div className="products-main-container">
      <SingleProducts product={compProduct} />
    </div>
  );
};

export default SingleProductsPage;
