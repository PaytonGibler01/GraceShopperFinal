import React from "react";
import { SingleProducts } from ".";
import { Link } from "react-router-dom";

import { getUser } from "../auth/index";

import "./Products.css"

const Profile = ({ products }) => {
  const user = getUser();
  return (
    <div className="products-main-container">
      <h2>Your ships up for sale:</h2>
      {products
        ? products.map((product) => {
            if (product.sellerName === user.username) {
              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="link-tag"
                >
                  <SingleProducts product={product} />
                </Link>
              );
            }
          })
        : null}
    </div>
  );
};

export default Profile;
