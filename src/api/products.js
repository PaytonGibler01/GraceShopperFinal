import axios from 'axios';
import { storeToken, getToken,storeUser } from "../auth";

export async function getProducts() {
    try {
      const { data } = await axios.get(`/api/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getProducts,
  }