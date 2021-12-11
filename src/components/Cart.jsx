import React from "react";
import ReactDOM from "react-dom";
import{ getCart } from "../api/users"

const Cart = ({cartItems, setCartItems}) => {
    console.log(cartItems,"cart stuff inside cart component")
    return (
      <>
        <header>
          { ! cartItems.length ? (
            <>
            <h1>Nothing in Cart!</h1>
            </>
         ):(null)}

          {cartItems.length ? cartItems.map((item)=>{
           
            return (
            <> 
              <h2>{item.id}</h2>
            
            </> 
                    )
          }):(null)}
        </header>
      </>
    );
  };
  
  export default Cart;