import React from "react";
import { useParams } from "react-router-dom";

import { Reviews, SingleProducts } from ".";

import { getProductById } from "../api/products";
import { AddProductToCart } from "../api/users";
// import { userId } from "./"
let userId = 1
// ^ THIS IS A HACK

const SingleProductsPage = ({ products, allReviews }) => {
  const {productId} = useParams();
  const compProduct = products.find((product) => product.id == productId)
  const compReview = allReviews.find((review) => {
    console.log(review, "Inner Log")  
    return review.productId == productId})
  console.log(compReview, "compreview Log")

  if (!compProduct) {
    return (
      <div className="product-card">
        <h3> The product with id {productId} was not found</h3>
      </div>
    );
  }
  return (
    <div className="products-main-container">
      <SingleProducts product={compProduct} 
      /><button
            type="submit"
            onClick={()=>{
              console.log(myUser.id)
              AddProductToCart(productId, userId)
            }}
            >Add to Cart
            </button>

      
      <Reviews review={compReview} />

    </div>


  );
};

export default SingleProductsPage;
