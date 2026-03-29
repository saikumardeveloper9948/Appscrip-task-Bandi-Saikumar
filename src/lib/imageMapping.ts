// Mapping of product IDs to local image file names in /public/images
// This ensures consistent image references across the app
export const productImageMap: { [key: number]: string } = {
  1: "/images/product-1.jpg",
  2: "/images/product-2.jpg",
  3: "/images/product-3.jpg",
  4: "/images/product-4.jpg",
  5: "/images/product-5.jpg",
  6: "/images/product-6.jpg",
  7: "/images/product-7.jpg",
  8: "/images/product-8.jpg",
  9: "/images/product-9.jpg",
  10: "/images/product-10.jpg",
  11: "/images/product-11.jpg",
  12: "/images/product-12.jpg",
  13: "/images/product-13.jpg",
  14: "/images/product-14.jpg",
  15: "/images/product-15.jpg",
  16: "/images/product-16.jpg",
  17: "/images/product-17.jpg",
  18: "/images/product-18.jpg",
  19: "/images/product-19.jpg",
  20: "/images/product-20.jpg",
};

// Get local image path for a product, fallback to original if not mapped
export function getProductImagePath(productId: number, originalUrl?: string): string {
  return productImageMap[productId] || originalUrl || "";
}
