import React from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../auth";
import { Reviews, SingleProducts } from ".";
import { getProductById } from "../api/products";
import { AddProductToCart, getCurrentUser } from "../api/users";
import { deleteThisProduct } from "../api/products";
// import { userId } from "./"

const SingleProductsPage = ({
  products,
  allReviews,
  isSeller,
  setIsSeller,
  currentUser,
  setCurrentUser
}) => {
  console.log(currentUser,"current user")
  const { productId } = useParams();
  const compProduct = products.find((product) => {
    return product.id == productId;
  });
  const compReview = allReviews.find((review) => review.productId == productId);
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
            console.log(user.id);
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
