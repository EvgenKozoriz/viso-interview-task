import axios from "axios";
import { ApiResponse } from "../types";


export const fetchProducts = async () => {
  try {
    const response = await axios.get<ApiResponse>(
      "https://dummyjson.com/products"
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};