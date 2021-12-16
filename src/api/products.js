import axios from "axios";
import { storeToken, getToken, storeUser } from "../auth";
const BASE = 'https://blooming-caverns-77947.herokuapp.com/api'


export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE}/products`, {
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
  console.log(productId,"productId at api product")
  try {
    const { data:[product] } = await axios.get(`${BASE}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(product,"data at api products")
    return product;
  } catch (error) {
    throw error;
  }
}
export async function getReviews() {
  try {
    const { data } = await axios.get(
      `${BASE}/products/reviews`,
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
    const { data } = await axios.delete(`${BASE}/products/${id}`, {
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
