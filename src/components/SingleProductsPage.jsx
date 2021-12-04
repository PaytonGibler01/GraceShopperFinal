import React from "react";
import { useParams } from "react-router-dom";
import { SingleProducts } from ".";
import { getProductById } from "../api/products";
import { AddProductToCart } from "../api/users";
import { userId } from "./"

const SingleProductsPage = ({ products }) => {
  const {productId} = useParams();
  const compProduct = products.find((product) => product.id == productId)
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
    </div>


  );
};

export default SingleProductsPage;
