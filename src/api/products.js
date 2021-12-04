import axios from 'axios';
import { storeToken, getToken,storeUser } from "../auth";

export async function getProducts() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function getProductById(productId) {
    try {
      
      const {data} = await axios.get(`http://localhost:5000/api/products/${productId}`, {
        headers: {"Content-Type": "application/json"}
      })
      return data
    } catch (error) {
      throw error
    }
  }