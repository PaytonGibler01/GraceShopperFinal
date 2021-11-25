import axios from 'axios';
import { storeToken, getToken,storeUser } from "../auth";

async function getUsers() {
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

  module.exports = {
    getUsers,
  }