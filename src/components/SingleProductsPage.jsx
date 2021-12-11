import React from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../auth";
import { Reviews, SingleProducts } from ".";
import { AddProductToCart } from "../api/users";
import { deleteThisProduct } from "../api/products";

const SingleProductsPage = ({
  products,
  allReviews,
  isSeller,
  setIsSeller,
  allUsers,
}) => {

  const username = getUser();

  console.log("USERNAME", username)

  const { productId } = useParams();
  const compProduct = products.find((product) => {
    if (username === product.sellerName) setIsSeller(true);
    return product.id == productId;
  });
  const compReview = allReviews.find((review) => review.productId == productId);
  console.log(compProduct, "Comp Product Log");
  let userId = 1;

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
        <button
          type="submit"
          onClick={() => {
            event.preventDefault();
            try {
              deleteThisProduct(productId);
              history.push("/products")
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Delete
        </button>
      ) : (
        <button
          type="submit"
          onClick={() => {

            AddProductToCart(productId, username.id);
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
