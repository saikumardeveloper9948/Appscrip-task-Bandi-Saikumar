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

export default function ProductGrid({ products, categories }) {
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilter, setShowFilter] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  function handleFilterChange(groupId, option) {
    setSelectedFilters((prev) => {
      if (option === null) {
        return { ...prev, [groupId]: [] };
      }
      const current = prev[groupId] || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [groupId]: updated };
    });
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryFilter = selectedFilters.category || [];
      if (categoryFilter.length > 0) {
        const normalised = product.category.toLowerCase();
        const match = categoryFilter.some((f) => normalised.includes(f.toLowerCase()));
        if (!match) return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'popular':
        result = [...result].sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
        break;
      case 'newest':
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [products, sortBy, selectedFilters]);

  const sidebarProps = {
    categories,
    selectedFilters,
    onFilterChange: handleFilterChange,
    isVisible: true,
  };

  return (
    <div className={styles.productGridWrapper}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.itemCount}>{filteredAndSortedProducts.length} ITEMS</span>
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
            <FilterSidebar {...sidebarProps} />
          </div>
        )}
        {mobileFilterOpen && (
          <div className={styles.mobileFilterOverlay}>
            <FilterSidebar {...sidebarProps} onClose={() => setMobileFilterOpen(false)} />
          </div>
        )}
        <div className={`${styles.grid} ${!showFilter ? styles.gridFull : ''}`}>
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
