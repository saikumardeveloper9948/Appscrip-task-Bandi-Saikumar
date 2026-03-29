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
      // Normalize primary API data
      return data.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category || "",
        image: p.image || "",
        rating: p.rating || { rate: 0, count: 0 }
      }));
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
        // Normalize data to FakeStore format
        data = data.map((p: any) => {
          // Handle different API formats
          const image = p.images?.[0] || p.image || "";
          const category = typeof p.category === "string" 
            ? p.category 
            : (p.category?.name || p.category || "");
          const rating = p.rating || { rate: 0, count: 0 };
          
          return {
            id: p.id,
            title: p.title,
            price: p.price,
            description: p.description,
            category: category,
            image: image,
            rating: rating
          };
        });
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
