import axios from "axios";
import { storeToken, getToken, storeUser } from "../auth";

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
export async function getProductByIdRoute(productId) {

  try {
    const { data:[product] } = await axios.get(`http://localhost:5000/api/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return product;
  } catch (error) {
    throw error;
  }
}
export async function getReviews() {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/reviews`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteThisProduct(id) {
  const myToken = getToken();

  try {
    const { data } = await axios.delete(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  } 
}
