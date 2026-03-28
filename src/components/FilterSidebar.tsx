"use client";

import { useState } from "react";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: false,
    rating: false,
  });

  function toggleSection(section: string) {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <aside className="filter-sidebar" aria-label="Product filters">
      <h2 className="filter-title">Filters</h2>

      {/* Category Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("categories")}
          aria-expanded={openSections.categories}
        >
          <span>CATEGORY</span>
          <span className="filter-chevron">{openSections.categories ? "▲" : "▼"}</span>
        </button>
        {openSections.categories && (
          <ul className="filter-list" role="list">
            <li>
              <button
                className={`filter-item ${selectedCategory === "" ? "filter-item-active" : ""}`}
                onClick={() => onCategoryChange("")}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`filter-item ${selectedCategory === cat ? "filter-item-active" : ""}`}
                  onClick={() => onCategoryChange(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("price")}
          aria-expanded={openSections.price}
        >
          <span>PRICE RANGE</span>
          <span className="filter-chevron">{openSections.price ? "▲" : "▼"}</span>
        </button>
        {openSections.price && (
          <div className="filter-price">
            <p className="filter-price-label">All price ranges available</p>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("rating")}
          aria-expanded={openSections.rating}
        >
          <span>RATING</span>
          <span className="filter-chevron">{openSections.rating ? "▲" : "▼"}</span>
        </button>
        {openSections.rating && (
          <div className="filter-rating">
            <p className="filter-price-label">All ratings available</p>
          </div>
        )}
      </div>
    </aside>
  );
}
