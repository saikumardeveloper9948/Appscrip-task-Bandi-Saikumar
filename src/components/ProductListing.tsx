"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

interface ProductListingProps {
  products: Product[];
  categories: string[];
  onAddToCart?: (productTitle: string) => void;
  onAddToWishlist?: () => void;
  onRemoveFromWishlist?: () => void;
}

const SORT_OPTIONS = [
  { value: "recommended", label: "RECOMMENDED" },
  { value: "newest", label: "NEWEST FIRST" },
  { value: "popular", label: "POPULAR" },
  { value: "price-asc", label: "PRICE: LOW TO HIGH" },
  { value: "price-desc", label: "PRICE: HIGH TO LOW" },
];

export default function ProductListing({
  products,
  categories,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilter, setShowFilter] = useState(true);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  
  // Price filter
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  
  // Rating filter
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  // Other filters
  const [idealForFilter, setIdealForFilter] = useState<string[]>([]);
  const [occasionFilter, setOccasionFilter] = useState<string[]>([]);
  const [workFilter, setWorkFilter] = useState<string[]>([]);
  const [fabricFilter, setFabricFilter] = useState<string[]>([]);
  const [segmentFilter, setSegmentFilter] = useState<string[]>([]);
  const [suitableForFilter, setSuitableForFilter] = useState<string[]>([]);
  const [rawMaterialsFilter, setRawMaterialsFilter] = useState<string[]>([]);
  const [patternFilter, setPatternFilter] = useState<string[]>([]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    // Rating filter
    if (selectedRatings.length > 0) {
      result = result.filter((p) => selectedRatings.some((r) => p.rating.rate >= r));
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    selectedCategory,
    sortBy,
    priceRange,
    selectedRatings,
  ]);

  const getCurrentSortLabel = () => {
    return SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "RECOMMENDED";
  };

  return (
    <section className="product-listing-section">
      {/* Listing header */}
      <div className="listing-header">
        <div className="listing-header-left">
          <p className="listing-title">
            {filteredAndSortedProducts.length} ITEMS
          </p>
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilter(!showFilter)}
            aria-expanded={showFilter}
            aria-controls="filter-sidebar"
          >
            {showFilter ? "◀ HIDE FILTER" : "▶ SHOW FILTER"}
          </button>
        </div>

        {/* Desktop sort */}
        <div className="sort-container-desktop">
          <label htmlFor="sort-select" className="sr-only">Sort products</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile sort dropdown */}
        <div className="sort-container-mobile">
          <button
            className="filter-header-btn"
            onClick={() => setShowFilter(!showFilter)}
            aria-expanded={showFilter}
            aria-label="Toggle filter options"
          >
            FILTER
          </button>
          <button
            className="sort-dropdown-btn"
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            aria-expanded={sortDropdownOpen}
            aria-label="Sort products"
          >
            {getCurrentSortLabel()}
          </button>
        </div>
      </div>

      {sortDropdownOpen && (
        <div className="sort-dropdown-menu-mobile">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`sort-option ${sortBy === opt.value ? "active" : ""}`}
              onClick={() => {
                setSortBy(opt.value);
                setSortDropdownOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="listing-body">
        {/* Filter sidebar */}
        {showFilter && (
          <div id="filter-sidebar">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedRatings={selectedRatings}
              onRatingsChange={setSelectedRatings}
              idealForFilter={idealForFilter}
              onIdealForChange={setIdealForFilter}
              occasionFilter={occasionFilter}
              onOccasionChange={setOccasionFilter}
              workFilter={workFilter}
              onWorkChange={setWorkFilter}
              fabricFilter={fabricFilter}
              onFabricChange={setFabricFilter}
              segmentFilter={segmentFilter}
              onSegmentChange={setSegmentFilter}
              suitableForFilter={suitableForFilter}
              onSuitableForChange={setSuitableForFilter}
              rawMaterialsFilter={rawMaterialsFilter}
              onRawMaterialsChange={setRawMaterialsFilter}
              patternFilter={patternFilter}
              onPatternChange={setPatternFilter}
            />
          </div>
        )}

        {/* Product grid */}
        <div className={`product-grid ${showFilter ? "with-filter" : "full-width"}`}>
          {filteredAndSortedProducts.length === 0 ? (
            <p className="no-products">No products found.</p>
          ) : (
            filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onRemoveFromWishlist={onRemoveFromWishlist}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
