import axios from 'axios';
import { storeToken, getToken, storeUser, storeCart } from "../auth";

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
      const { data } = await axios.post(`http://localhost:5000/api/users/login`, {
       
          username: userName,
          password: password,
        
      });
      storeToken(data.token);
      storeUser(data.user.username);
      storeCart(data.cart);

      console.log("DATA", data.cart)
      return data;
    } catch (error) {
      throw error;
    }
  }
  export async function registerUser(userName, password, email) {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users/register`, {
       
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

  export async function createUserCart() {
    try {
      const { data } = await axios.get(`/api/users/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function AddProductToCart( productId, cartId ) {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users/cart/add`, {
       
        productId: productId,
        cartId : cartId ,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
