import axios from 'axios';
import { storeToken, getToken,storeUser } from "../auth";

async function getProducts() {
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

