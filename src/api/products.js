import axios from "axios";
import { storeToken, getToken, storeUser } from "../auth";

export async function getProducts() {
  try {
    const { data } = await axios.get(`http://blooming-caverns-77947.herokuapp.com/api/products`, {
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
    const { data:[product] } = await axios.get(`blooming-caverns-77947.herokuapp.com${productId}`, {
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
      `blooming-caverns-77947.herokuapp.com/api/products/reviews`,
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
    const { data } = await axios.delete(`blooming-caverns-77947.herokuapp.com/api/products/${id}`, {
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
