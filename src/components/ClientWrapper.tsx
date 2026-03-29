"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import Header from "./Header";
import ProductListing from "./ProductListing";

interface ClientWrapperProps {
  products: Product[];
  categories: string[];
}

export default function ClientWrapper({
  products,
  categories,
}: ClientWrapperProps) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = searchQuery.trim() === ""
    ? products
    : products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleAddToCart = (productTitle: string) => {
    setCartCount((prev) => prev + 1);
    console.log(`Added to cart: ${productTitle}`);
  };

  const handleAddToWishlist = () => {
    setWishlistCount((prev) => prev + 1);
    console.log(`Added to wishlist`);
  };

  const handleRemoveFromWishlist = () => {
    setWishlistCount((prev) => Math.max(0, prev - 1));
    console.log(`Removed from wishlist`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Search query: ${query}`);
  };

  return (
    <>
      {/* Header with dynamic cart and wishlist counts */}
      <Header 
        cartCount={cartCount} 
        wishlistCount={wishlistCount}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      {/* Hero section */}
      <section className="hero-section" aria-label="Hero banner">
        <div className="hero-content">
          <h1 className="hero-title">DISCOVER OUR PRODUCTS</h1>
          <p className="hero-subtitle">
            Lorem ipsum dolor sit amet consectetur. Amet est placerat in erat
            pellentesque nec lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </section>

      {/* Product listing with filters and sorting */}
      <section id="shop" className="products-section">
        <ProductListing
          products={filteredProducts}
          categories={categories}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
        />
      </section>
    </>
  );
}
