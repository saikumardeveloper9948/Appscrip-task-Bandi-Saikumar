import { useState, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import styles from './ProductGrid.module.css';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'RECOMMENDED' },
  { value: 'newest', label: 'NEWEST FIRST' },
  { value: 'popular', label: 'POPULAR' },
  { value: 'price-high', label: 'PRICE: HIGH TO LOW' },
  { value: 'price-low', label: 'PRICE: LOW TO HIGH' },
];

export default function ProductGrid({ products }) {
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilter, setShowFilter] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    switch (sortBy) {
      case 'price-high':
        return arr.sort((a, b) => b.price - a.price);
      case 'price-low':
        return arr.sort((a, b) => a.price - b.price);
      case 'popular':
        return arr.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
      case 'newest':
        return arr.sort((a, b) => b.id - a.id);
      default:
        return arr;
    }
  }, [products, sortBy]);

  return (
    <div className={styles.productGridWrapper}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.itemCount}>{products.length} ITEMS</span>
          <button
            className={styles.filterToggle}
            onClick={() => setShowFilter(!showFilter)}
            aria-pressed={showFilter}
          >
            {showFilter ? 'HIDE FILTER' : 'SHOW FILTER'}
          </button>
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setMobileFilterOpen(true)}
            aria-label="Open filters"
          >
            FILTER
          </button>
        </div>
        <div className={styles.toolbarRight}>
          <label htmlFor="sort-select" className={styles.srOnly}>Sort by</label>
          <select
            id="sort-select"
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.contentRow}>
        {showFilter && (
          <div className={styles.desktopFilter}>
            <FilterSidebar isVisible={true} />
          </div>
        )}
        {mobileFilterOpen && (
          <div className={styles.mobileFilterOverlay}>
            <FilterSidebar isVisible={true} onClose={() => setMobileFilterOpen(false)} />
          </div>
        )}
        <div className={`${styles.grid} ${!showFilter ? styles.gridFull : ''}`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
