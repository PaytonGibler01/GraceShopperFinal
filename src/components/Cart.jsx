import React from "react";
import ReactDOM from "react-dom";
import{ getCart } from "../api/users"
import {getProductByIdRoute} from "../api/products"
const Cart = ({cartItems,setCartItems}) => {
  //made cartItems an array because cartItems.map "isn't a function"
     console.log(cartItems,"cart stuff inside cart component") //=== [{…}] 
     console.log(cartItems.length,"cartItems length")  // === 1 'arr length'
    return (
//       <>  

//         <header>
//         {cartItems.length ? cartItems.map(async(item)=>{
//           {/* returns cartItems correctly as true   */} 
//           console.log(cartItems,"cartItems inside cartItems.map") // ===  [{…}] : cartItems:{id: 1, productId: 1, cartId: 1} 
//           //          ^^^      cartItems is returning true but getting react child error
//           //                   page crash when u click on Cart, gives react child
//           //                   error but makes no sense because the cartItems was mapped 
//           //                   and returned correctly for a small second
//             console.log(item,"item inside of cartItems")
//             //          ^^^^   is returning correctly as individual products
//             // const product = await getProductByIdRoute(item.productId)
//             // console.log(product,"result of getProductByIdRoute")
//           return (
//             <>
//             {/* need to render the product name && creator */}
//               {/* <h2>{item.cartItems.productId}</h2> */}
//               <h2>Hello</h2>
//             </> 
//                 )
//           })
//           :(null)}

// {/* 
//           { ! arr.length ? (
//             <>
//             <h1>Nothing in Cart!</h1>
//             </>
//          ):(null)} */}
//          </header>
//       </>
//     );
    <>
    <h1>preventing error for cart page</h1>
    </>

)
  };
  
  export default Cart;