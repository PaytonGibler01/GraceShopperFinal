import React from "react";
import ReactDOM from "react-dom";
import{ getCart } from "../api/users"
import {getProductByIdRoute} from "../api/products"
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

          {cartItems.length ? cartItems.map(async(item)=>{
           const product = await getProductByIdRoute(item.productId)
           console.log(product)
            return (
            <>  
              <h2>{item.id}</h2>
              {/* <h2>{product}</h2> */}
              <h2>{item.cartId}</h2>
            
            </> 
                    )
          }):(null)}
        </header>
      </>
    );
  };
  
  export default Cart;