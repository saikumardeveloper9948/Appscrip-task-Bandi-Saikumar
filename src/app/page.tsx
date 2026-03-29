import { fetchProducts, fetchCategories } from "@/lib/api";
import { Product } from "@/types/product";
import ClientWrapper from "@/components/ClientWrapper";

// Force dynamic SSR — data is always fetched at request time on the server
export const dynamic = "force-dynamic";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fAn8sQ4lL._AC_UX679_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
    price: 695.0,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168.0,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_FMwebp_QL65_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg",
    rating: { rate: 3.0, count: 400 },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description: "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_FMwebp_QL65_.jpg",
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive",
    price: 64.0,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109.0,
    description: "Easy upgrade for faster boot up, shutdown, and application launch.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title: "Silicon Power 256GB SSD 3D NAND",
    price: 109.0,
    description: "3D NAND flash are applied to deliver high transfer speeds.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title: "WD 4TB Gaming Drive Works with Playstation 4",
    price: 114.0,
    description: "Expand your PS4 gaming experience, Play anywhere.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 400 },
  },
];

const FALLBACK_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default async function HomePage() {
  // Server-side data fetching (SSR)
  let products: Product[] = FALLBACK_PRODUCTS;
  let categories: string[] = FALLBACK_CATEGORIES;

  try {
    const [fetchedProducts, fetchedCategories] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);
    products = fetchedProducts;
    categories = fetchedCategories;
  } catch {
    // Use fallback data if the API is unavailable
  }

  // JSON-LD Schema markup for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "mettā muse",
    description:
      "Shop handcrafted and artisan products from around the world at mettā muse.",
    url: "https://mettamuse.com",
    logo: "https://mettamuse.com/logo.png",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Artisan Products",
      numberOfItems: products.length,
    },
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Client wrapper for state management */}
      <ClientWrapper products={products} categories={categories} />
    </>
  );
}
