import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Image
          src={product.image}
          alt={`${product.title} - ${product.category} product image`}
          width={300}
          height={300}
          className="product-image"
          title={product.title}
          loading="lazy"
        />
        <button className="wishlist-btn" aria-label={`Add ${product.title} to wishlist`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="product-info">
        <h2 className="product-name">{product.title}</h2>
        <p className="product-category">{product.category}</p>
        <div className="product-price-row">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating" aria-label={`Rating: ${product.rating.rate} out of 5`}>
            ★ {product.rating.rate}
            <span className="product-rating-count">({product.rating.count})</span>
          </span>
        </div>
      </div>
    </article>
  );
}
