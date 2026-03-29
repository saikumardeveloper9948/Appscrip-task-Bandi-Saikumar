import { Product } from "@/types/product";

// Using ReactBD Mirror of FakeStore API (more stable than fakestoreapi.com)
// Alternative: https://api.escuelajs.co/api/v1 (Platzi API)
const API_BASE_URL = "https://fakestoreapi.reactbd.com";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`);
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
