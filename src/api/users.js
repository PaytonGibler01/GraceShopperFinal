import axios from 'axios';
import { storeToken, getToken, storeUser } from "../auth";

export async function getUsers() {
    try {
      const { data } = await axios.get(`/api/users`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  export async function loginUser(userName, password) {
    try {
      const { data } = await axios.post(`blooming-caverns-77947.herokuapp.com/api/users/login`, {
       
          username: userName,
          password: password,
        
      });
      storeToken(data.token);
      storeUser(data.user.username);


      // console.log("DATA", data.cart)
      return data;
    } catch (error) {
      throw error;
    }
  }
  export async function registerUser(userName, password, email) {
    try {
      const { data } = await axios.post(`blooming-caverns-77947.herokuapp.com/api/users/register`, {
       
          username: userName,
          password: password,
          userEmail: email,
          isSeller: false,
          isAdmin: false
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function getCartRoute() {

    try {
      const { data }  = await axios.get(`/api/users/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //  console.log(data,"at api getCart data")
      // console.log(cartItems,"at api getCart data")
      // const arr = []
      // arr.push(data)
      // console.log(arr,"at api getCart arr")
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function AddProductToCart( productId, cartId ) {
    try {
      const { data } = await axios.post(`blooming-caverns-77947.herokuapp.com/users/cart/add`, {
       
        productId: productId,
        cartId : cartId ,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }


  export async function deleteFromCart(id) {
    const myToken = getToken();
  
    try {
      const { data } = await axios.delete(`blooming-caverns-77947.herokuapp.com/api/users/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      });

      console.log("DATA", data)
      return data;
    } catch (error) {
      throw error;
    } 
  }
  