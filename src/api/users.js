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
      const { data } = await axios.post(`/login`, {
       
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
  export async function registerUser(userName, password) {
    try {
      const { data } = await axios.post(`/register`, {
       
          username: userName,
          password: password
        
      });
  
      // try to add email element?
      // console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }