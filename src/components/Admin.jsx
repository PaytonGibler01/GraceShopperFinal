import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { deleteThisProduct } from "../api/products";

const Admin = ({allUsers, products}) => {
    return (
      <>
        <div className="products-main-container">
          {products.length
          ? products.map((product) => {
            return product.id ? (
              <div>
                <Link
                  to={`/products/${product.id}`}
                  key={`admin:${product.id}`}
                  className="link-tag"
                >
                  <h4 className="Product">{product.name} </h4>
                </Link>
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    try {
                      deleteThisProduct(product.id);
                      history.push("/products")
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            ) : null;
          })
          : null}
        </div>
      </>
    );
  };
  
  export default Admin;