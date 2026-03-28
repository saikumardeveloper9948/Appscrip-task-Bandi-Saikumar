import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const rating = product.rating?.rate || 0;
  const reviewCount = product.rating?.count || 0;
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={`${product.title} - product image`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={styles.productImage}
          style={{ objectFit: 'contain' }}
        />
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          onClick={() => setWishlisted(!wishlisted)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? 'red' : 'none'} stroke={wishlisted ? 'red' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productCategory}>{product.category}</p>
        <div className={styles.ratingRow}>
          <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= fullStars
                    ? styles.starFilled
                    : star === fullStars + 1 && hasHalf
                    ? styles.starHalf
                    : styles.starEmpty
                }
              >
                ★
              </span>
            ))}
          </div>
          <span className={styles.reviewCount}>({reviewCount})</span>
        </div>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
}
