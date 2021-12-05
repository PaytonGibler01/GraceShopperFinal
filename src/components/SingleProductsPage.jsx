import React from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../auth";
import { Reviews, SingleProducts } from ".";
import { getProductById } from "../api/products";
import { AddProductToCart } from "../api/users";
import { deleteThisProduct } from "../api/products";
// import { userId } from "./"

const SingleProductsPage = ({
  products,
  allReviews,
  isSeller,
  setIsSeller,
}) => {
  const user = getUser();
  console.log(user, "user log");
  const { productId } = useParams();
  console.log(productId, products, "Product Id and Products Log");
  const compProduct = products.find((product) => {
    console.log(product, "product log");
    return product.id == productId;
  });
  const compReview = allReviews.find((review) => review.productId == productId);
  console.log(compProduct, "Comp Product Log");
// import { userId } from "./"
let userId = 1
// ^ THIS IS A HACK

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

      {isSeller ? (
        <button type="submit" onClick={() => deleteThisProduct(productId)}>
          Delete
        </button>
      ) : (
        <button
          type="submit"
          onClick={() => {
            console.log(myUser.id);
            AddProductToCart(productId, userId);
          }}
        >
          Add to Cart
        </button>
      )}
      <Reviews review={compReview} />
    </div>
  );
};

export default SingleProductsPage;
