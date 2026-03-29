"use client";

import { useState } from "react";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  selectedRatings: number[];
  onRatingsChange: (ratings: number[]) => void;
  idealForFilter: string[];
  onIdealForChange: (values: string[]) => void;
  occasionFilter: string[];
  onOccasionChange: (values: string[]) => void;
  workFilter: string[];
  onWorkChange: (values: string[]) => void;
  fabricFilter: string[];
  onFabricChange: (values: string[]) => void;
  segmentFilter: string[];
  onSegmentChange: (values: string[]) => void;
  suitableForFilter: string[];
  onSuitableForChange: (values: string[]) => void;
  rawMaterialsFilter: string[];
  onRawMaterialsChange: (values: string[]) => void;
  patternFilter: string[];
  onPatternChange: (values: string[]) => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedRatings,
  onRatingsChange,
  idealForFilter,
  onIdealForChange,
  occasionFilter,
  onOccasionChange,
  workFilter,
  onWorkChange,
  fabricFilter,
  onFabricChange,
  segmentFilter,
  onSegmentChange,
  suitableForFilter,
  onSuitableForChange,
  rawMaterialsFilter,
  onRawMaterialsChange,
  patternFilter,
  onPatternChange,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: false,
    rating: false,
    idealFor: false,
    occasion: false,
    work: false,
    fabric: false,
    segment: false,
    suitableFor: false,
    rawMaterials: false,
    pattern: false,
  });

  const ratingOptions = [
    { value: 5, label: "5 ★" },
    { value: 4, label: "4★ & above" },
    { value: 3, label: "3★ & above" },
    { value: 2, label: "2★ & above" },
    { value: 1, label: "1★ & above" },
  ];

  function toggleSection(section: string) {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  const handlePriceChange = (rangeType: "min" | "max", value: number) => {
    console.log(`Price ${rangeType} changed to: $${value}`);
    onPriceRangeChange({
      ...priceRange,
      [rangeType]: value,
    });
  };

  const handleRatingToggle = (ratingValue: number) => {
    const newRatings = selectedRatings.includes(ratingValue)
      ? selectedRatings.filter((r) => r !== ratingValue)
      : [...selectedRatings, ratingValue];
    onRatingsChange(newRatings);
    console.log(`Rating filter toggled: ${ratingValue}★`);
  };

  const clearFilters = () => {
    console.log("Clearing all filters");
    onCategoryChange("");
    onPriceRangeChange({ min: 0, max: 1000 });
    onRatingsChange([]);
    onIdealForChange([]);
    onOccasionChange([]);
    onWorkChange([]);
    onFabricChange([]);
    onSegmentChange([]);
    onSuitableForChange([]);
    onRawMaterialsChange([]);
    onPatternChange([]);
  };


  const isFiltersActive =
    selectedRatings.length > 0 ||
    priceRange.min > 0 ||
    priceRange.max < 1000 ||
    selectedCategory !== "" ||
    idealForFilter.length > 0 ||
    occasionFilter.length > 0 ||
    workFilter.length > 0 ||
    fabricFilter.length > 0 ||
    segmentFilter.length > 0 ||
    suitableForFilter.length > 0 ||
    rawMaterialsFilter.length > 0 ||
    patternFilter.length > 0;

  return (
    <aside className="filter-sidebar" aria-label="Product filters">
      <div className="filter-header">
        <h2 className="filter-title">Filters</h2>
        {isFiltersActive && (
          <button className="clear-filters-btn" onClick={clearFilters} aria-label="Clear all filters">
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("categories")}
          aria-expanded={openSections.categories}
        >
          <span>CUSTOMIZABLE</span>
          <span className="filter-chevron">{openSections.categories ? "▲" : "▼"}</span>
        </button>
        {openSections.categories && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategory === ""}
                  onChange={() => onCategoryChange("")}
                  aria-label="All products"
                />
                <span>All</span>
              </label>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <label className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat}
                    onChange={() => onCategoryChange(selectedCategory === cat ? "" : cat)}
                    aria-label={`Filter by ${cat}`}
                  />
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </label>
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
          <span>PRICE</span>
          <span className="filter-chevron">{openSections.price ? "▲" : "▼"}</span>
        </button>
        {openSections.price && (
          <div className="filter-price">
            <div className="price-range-inputs">
              <div className="price-input-group">
                <label htmlFor="min-price" className="price-label">
                  Min
                </label>
                <input
                  id="min-price"
                  type="number"
                  min="0"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                  className="price-input"
                  aria-label="Minimum price"
                />
              </div>
              <span className="price-separator">-</span>
              <div className="price-input-group">
                <label htmlFor="max-price" className="price-label">
                  Max
                </label>
                <input
                  id="max-price"
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                  className="price-input"
                  aria-label="Maximum price"
                />
              </div>
            </div>

            <div className="price-range-slider">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.min}
                onChange={(e) => handlePriceChange("min", Number(e.target.value))}
                className="price-slider min-slider"
                aria-label="Minimum price slider"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => handlePriceChange("max", Number(e.target.value))}
                className="price-slider max-slider"
                aria-label="Maximum price slider"
              />
            </div>

            <div className="price-selected">
              Price: ${priceRange.min} - ${priceRange.max}
            </div>
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
            {ratingOptions.map((option) => (
              <label key={option.value} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(option.value)}
                  onChange={() => handleRatingToggle(option.value)}
                  aria-label={`Filter by ${option.label} rating`}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Additional Filter Sections */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("idealFor")}
          aria-expanded={openSections.idealFor}
        >
          <span>IDEAL FOR</span>
          <span className="filter-chevron">{openSections.idealFor ? "▲" : "▼"}</span>
        </button>
        {openSections.idealFor && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Ideal for all" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Ideal for men" />
                <span>Men</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Ideal for women" />
                <span>Women</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Ideal for unisex" />
                <span>Unisex</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("occasion")}
          aria-expanded={openSections.occasion}
        >
          <span>OCCASION</span>
          <span className="filter-chevron">{openSections.occasion ? "▲" : "▼"}</span>
        </button>
        {openSections.occasion && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="All occasions" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Casual occasion" />
                <span>Casual</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Formal occasion" />
                <span>Formal</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Party occasion" />
                <span>Party</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Wedding occasion" />
                <span>Wedding</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("work")}
          aria-expanded={openSections.work}
        >
          <span>WORK</span>
          <span className="filter-chevron">{openSections.work ? "▲" : "▼"}</span>
        </button>
        {openSections.work && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="All work types" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Hand-embroidered work" />
                <span>Hand-embroidered</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Hand-painted work" />
                <span>Hand-painted</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Machine-made work" />
                <span>Machine-made</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("fabric")}
          aria-expanded={openSections.fabric}
        >
          <span>FABRIC</span>
          <span className="filter-chevron">{openSections.fabric ? "▲" : "▼"}</span>
        </button>
        {openSections.fabric && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="All fabrics" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Cotton fabric" />
                <span>Cotton</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Silk fabric" />
                <span>Silk</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Wool fabric" />
                <span>Wool</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Linen fabric" />
                <span>Linen</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("segment")}
          aria-expanded={openSections.segment}
        >
          <span>SEGMENT</span>
          <span className="filter-chevron">{openSections.segment ? "▲" : "▼"}</span>
        </button>
        {openSections.segment && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="All segments" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Premium segment" />
                <span>Premium</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Luxury segment" />
                <span>Luxury</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Budget segment" />
                <span>Budget</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("suitableFor")}
          aria-expanded={openSections.suitableFor}
        >
          <span>SUITABLE FOR</span>
          <span className="filter-chevron">{openSections.suitableFor ? "▲" : "▼"}</span>
        </button>
        {openSections.suitableFor && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Suitable for all" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Suitable for summer" />
                <span>Summer</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Suitable for winter" />
                <span>Winter</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Suitable for all seasons" />
                <span>All Seasons</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("rawMaterials")}
          aria-expanded={openSections.rawMaterials}
        >
          <span>RAW MATERIALS</span>
          <span className="filter-chevron">{openSections.rawMaterials ? "▲" : "▼"}</span>
        </button>
        {openSections.rawMaterials && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="All raw materials" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Natural materials" />
                <span>Natural</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Organic materials" />
                <span>Organic</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Recycled materials" />
                <span>Recycled</span>
              </label>
            </li>
          </ul>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection("pattern")}
          aria-expanded={openSections.pattern}
        >
          <span>PATTERN</span>
          <span className="filter-chevron">{openSections.pattern ? "▲" : "▼"}</span>
        </button>
        {openSections.pattern && (
          <ul className="filter-list" role="list">
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="All patterns" />
                <span>All</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Solid pattern" />
                <span>Solid</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Striped pattern" />
                <span>Striped</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Floral pattern" />
                <span>Floral</span>
              </label>
            </li>
            <li>
              <label className="filter-checkbox-label">
                <input type="checkbox" aria-label="Geometric pattern" />
                <span>Geometric</span>
              </label>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
}
