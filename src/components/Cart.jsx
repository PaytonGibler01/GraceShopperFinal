import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getCart } from "../api/users";
import { getProductByIdRoute } from "../api/products";
import { deleteFromCart } from "../api/users";
import { useHistory } from "react-router-dom";



const Cart = ({ cartItems, setCartItems }) => {
  const [items, setItems] = useState([]);
  const history = useHistory()
  

  async function fetchCartItems() {
    let allCartItems = await Promise.all(
      cartItems.map((item) => {
        
        const product = getProductByIdRoute(item.productId);
        
        return product;
      })
    );
    console.log(allCartItems,"allCartItems")
    setItems(allCartItems);
  }

  useEffect(() => {
    fetchCartItems();
  }, [cartItems]);
  return (
    <>
      <header>
       
        {items && items.length
          ? items.map((item) => {
            
              return (
                <div key={`cartItemsId:${item.id}`}>
                  <h1> {item.name} </h1>
                  <p> {item.description}</p>
                  <button
        className="cartDeleteProduct"
          type="submit"
          href="my-cart"
          onClick={() => {
            try {
              deleteFromCart(item.id);
              history.push("/my-cart")
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Delete
        </button>
                </div>
              );
            })
          : null}

      </header>
    </>
  );

};

export default Cart;
