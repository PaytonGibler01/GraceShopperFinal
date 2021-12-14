import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getCart } from "../api/users";
import { getProductByIdRoute } from "../api/products";
const Cart = ({ cartItems, setCartItems }) => {
  const [items, setItems] = useState([]);
  //made cartItems an array because cartItems.map "isn't a function"
  

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
                </div>
              );
            })
          : null}
        {/* {cartItems.length
          ? cartItems.map(async (item) => {
              {
                /* returns cartItems correctly as true   */}
        {/* console.log(cartItems, "cartItems inside cartItems.map"); // ===  [{…}] : cartItems:{id: 1, productId: 1, cartId: 1}
              //          ^^^      cartItems is returning true but getting react child error
              //                   page crash when u click on Cart, gives react child
              //                   error but makes no sense because the cartItems was mapped
              //                   and returned correctly for a small second
              console.log(item, "item inside of cartItems");
              //          ^^^^   is returning correctly as individual products
              const product = await getProductByIdRoute(item.productId);
              console.log(product, "result of getProductByIdRoute");
              return ( */}
        {/* <> */}
        {/* need to render the product name && creator */}
        {/* <h2>{item.cartItems.productId}</h2> */}
       
        {/* </> */}
        {/* ); */}
        {/* }) */}
        {/* : null} */}

        {/* 
          { ! arr.length ? (
            <>
            <h1>Nothing in Cart!</h1>
            </>
         ):(null)} */}
      </header>
    </>
  );
  // <>
  // <h1>preventing error for cart page</h1
};

export default Cart;
