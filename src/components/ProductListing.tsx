"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

interface ProductListingProps {
  products: Product[];
  categories: string[];
}

const SORT_OPTIONS = [
  { value: "recommended", label: "RECOMMENDED" },
  { value: "newest", label: "NEWEST FIRST" },
  { value: "popular", label: "POPULAR" },
  { value: "price-asc", label: "PRICE: LOW TO HIGH" },
  { value: "price-desc", label: "PRICE: HIGH TO LOW" },
];

export default function ProductListing({ products, categories }: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilter, setShowFilter] = useState(true);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

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
  }, [products, selectedCategory, sortBy]);

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

        <div className="sort-container">
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
      </div>

      <div className="listing-body">
        {/* Filter sidebar */}
        {showFilter && (
          <div id="filter-sidebar">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        {/* Product grid */}
        <div className={`product-grid ${showFilter ? "with-filter" : "full-width"}`}>
          {filteredAndSortedProducts.length === 0 ? (
            <p className="no-products">No products found.</p>
          ) : (
            filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
