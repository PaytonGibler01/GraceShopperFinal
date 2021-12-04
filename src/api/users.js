import axios from 'axios';
import { storeToken, getToken,storeUser } from "../auth";

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
      // console.log(data,"!!!!!!!!!!!!!!!!!")
      // try to add email element?
      // console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }
  export async function getCart() {
    try {
      const { data } = await axios.get(`/api/users/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(data,"THIS IS CART STUFF")
      return data;
    } catch (error) {
      throw error;
    }
  }