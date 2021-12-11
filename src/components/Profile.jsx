import React from "react";
import { SingleProducts } from ".";
import { Link } from "react-router-dom";
import {getUser} from "../auth/index"
// import "./Products.css"

const Profile = ({ products,allUsers }) => {
  const user = getUser()
  console.log(user, "profile user")
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

export default Profile;