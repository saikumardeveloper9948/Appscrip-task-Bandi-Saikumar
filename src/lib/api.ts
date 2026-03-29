import { Product } from "@/types/product";

// Primary API and fallback APIs
const PRIMARY_API = "https://fakestoreapi.com";
const FALLBACK_APIS = [
  "https://fakestoreapi.reactbd.com",
  "https://api.escuelajs.co/api/v1"
];

export async function fetchProducts(): Promise<Product[]> {
  // Try primary API first
  try {
    const res = await fetch(`${PRIMARY_API}/products`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Primary API failed:", error);
  }

  // Try fallback APIs
  for (const apiUrl of FALLBACK_APIS) {
    try {
      const res = await fetch(`${apiUrl}/products`);
      if (res.ok) {
        let data = await res.json();
        // Convert ReactBD/Escuelajs format to FakeStore format if needed
        if (data[0] && data[0].images && !data[0].image) {
          data = data.map((p: any) => ({
            ...p,
            image: p.images?.[0] || p.image || ""
          }));
        }
        return data;
      }
    } catch (error) {
      console.error(`Fallback API failed:`, error);
    }
  }

  return [];
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${PRIMARY_API}/products/categories`);
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
  return [];
}
