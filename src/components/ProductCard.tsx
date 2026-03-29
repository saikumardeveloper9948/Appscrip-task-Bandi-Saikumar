"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productTitle: string) => void;
  onAddToWishlist?: () => void;
  onRemoveFromWishlist?: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Generate SVG placeholder as fallback
  const placeholderSvg = useMemo(() => {
    const categoryText = product.category.substring(0, 20);
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect fill='%23f0f0f0' width='300' height='300'/%3E%3Ccircle cx='150' cy='120' r='35' fill='%23d0d0d0'/%3E%3Cpath d='M 80 180 Q 150 160 220 180' fill='none' stroke='%23d0d0d0' stroke-width='2'/%3E%3Ctext x='150' y='260' text-anchor='middle' font-family='Arial' font-size='11' fill='%23999'%3E${categoryText}%3C/text%3E%3C/svg%3E`;
  }, [product.category]);

  // Convert image URL to use our API proxy to bypass CORS
  // This works on both localhost and production (Vercel)
  const imageUrl = useMemo(() => {
    if (!product.image) return placeholderSvg;
    // Use our /api/image proxy route (handles CORS on server-side)
    return `/api/image?url=${encodeURIComponent(product.image)}`;
  }, [product.image, placeholderSvg]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInWishlist(!isInWishlist);
    
    if (!isInWishlist && onAddToWishlist) {
      onAddToWishlist();
    } else if (isInWishlist && onRemoveFromWishlist) {
      onRemoveFromWishlist();
    }
    
    console.log(`${isInWishlist ? "Remove from" : "Add to"} wishlist: ${product.title}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(product.title);
    }
    
    console.log(`Add to cart: ${product.title}`);
  };

  const handleProductClick = () => {
    console.log(`Product clicked: ${product.title}`);
    // Navigate to product details page
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(!isQuickViewOpen);
    console.log(`Quick view: ${product.title}`);
  };

  return (
    <article className="product-card" onClick={handleProductClick}>
      <div className="product-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${product.title} - ${product.category} product image`}
          className="product-image"
          title={product.title}
          loading="lazy"
          onError={(e) => {
            // If proxied image fails, show SVG placeholder
            const img = e.target as HTMLImageElement;
            img.src = placeholderSvg;
          }}
        />

        {/* Overlay Actions */}
        <div className="product-overlay">
          <button
            className="product-action-btn add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
            title="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 2a1 1 0 000 2h.01a1 1 0 100-2H9zm-5 0a1 1 0 000 2h.01a1 1 0 100-2H4zm0 6a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 100 2 1 1 0 000-2zm13-4a1 1 0 100 2h3l-3-6H7L4 4h3l.894 2.789a1 1 0 00.894.211h9.024a1 1 0 00.894-.89l1.789-8.9A1 1 0 0018 2h-2.905a1 1 0 000 2H17l-1 5h-9l-.553 2.763a1 1 0 00.084.869l1.613 2.413a1 1 0 001.772-.26l1.757-5.144H17z" />
            </svg>
            Add to Bag
          </button>
          <button
            className="product-action-btn quick-view-btn"
            onClick={handleQuickView}
            aria-label={`Quick view ${product.title}`}
            title="Quick view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isInWishlist ? "in-wishlist" : ""}`}
          onClick={handleWishlistToggle}
          aria-label={`${isInWishlist ? "Remove from" : "Add to"} wishlist`}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill={isInWishlist ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="product-info">
        <h2 className="product-name" title={product.title}>
          {product.title}
        </h2>
        <p className="product-category">{product.category}</p>
        <div className="product-price-row">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span
            className="product-rating"
            aria-label={`Rating: ${product.rating.rate} out of 5, ${product.rating.count} reviews`}
          >
            ★ {product.rating.rate}
            <span className="product-rating-count">({product.rating.count})</span>
          </span>
        </div>

        {/* Product Description */}
        {/* <p className="product-description">{product.description}</p> */}

        {/* Sign in to see price note */}
        <p className="product-signin-note">
          Sign in or Create an account to see pricing
        </p>
      </div>
    </article>
  );
}
