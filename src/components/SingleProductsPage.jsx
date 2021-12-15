import React from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../auth";
import { Reviews, SingleProducts } from ".";
import { AddProductToCart } from "../api/users";
import { deleteThisProduct } from "../api/products";
import "./Products.css"

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
    if (username.username === product.sellerName) {setIsSeller(true);}
    else {setIsSeller(false);}
    console.log(isSeller, "11111111111111111111111111111111111111111111111111111111111")
    return product.id == productId;
  });
  console.log(allReviews, "77777777")
  const compReview = allReviews.find((review) => review.productId == productId);

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
        className="sellerDelete-product"
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
        className="addProduct-cart"
          type="submit"
          onClick={() => {

            AddProductToCart(productId, username.id);
          }}
        >
          Add to Cart
        </button>
      )}
      <Reviews review={compReview} className="reviews"/>
    </div>
  );
};

export default SingleProductsPage;
