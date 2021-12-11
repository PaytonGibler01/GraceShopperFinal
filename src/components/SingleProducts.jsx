// import React from "react";
import React from "react";
import { Link } from "react-router-dom";

const SingleProducts = ({product}) => {
    return (
        <div key={product.id} className="product-card">
          <center><h4>{product.name}</h4>
          <img src={product.image} className="product-image"></img></center>
          <br></br>
          {/* <h4>{product.name}</h4> */}
          <p>Seller Name: {product.sellerName}</p>
          <p>Price: {product.price}</p>
          <hr></hr>
          <p>Description: {product.description}</p>
          </div>
          )
}



export default SingleProducts