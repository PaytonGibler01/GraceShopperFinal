// import React from "react";
import React from "react";
import { Link } from "react-router-dom";

const SingleProducts = ({product}) => {
    return (
        <div key={product.id} className="product-card">
          <img src={product.image}></img>
          <h4>{product.name}</h4>
          <p>Price: {product.price}</p>
          </div>
          )
}



export default SingleProducts
// export default SingleProducts;