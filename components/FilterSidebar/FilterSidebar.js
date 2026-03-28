import { useState } from 'react';
import styles from './FilterSidebar.module.css';

const STATIC_FILTER_GROUPS = [
  { id: 'occasion', label: 'OCCASION', options: ['Casual', 'Formal', 'Party', 'Sports'] },
  { id: 'work', label: 'WORK', options: ['Office', 'Outdoor', 'Travel'] },
  { id: 'fabric', label: 'FABRIC', options: ['Cotton', 'Polyester', 'Silk', 'Wool', 'Linen'] },
  { id: 'segment', label: 'SEGMENT', options: ['Luxury', 'Premium', 'Economy'] },
  { id: 'suitableFor', label: 'SUITABLE FOR', options: ['Summer', 'Winter', 'Rainy', 'All Season'] },
  { id: 'rawMaterials', label: 'RAW MATERIALS', options: ['Organic', 'Recycled', 'Synthetic'] },
  { id: 'pattern', label: 'PATTERN', options: ['Solid', 'Striped', 'Checked', 'Printed', 'Embroidered'] },
];

function FilterGroup({ group, selectedFilters, onFilterChange }) {
  const [open, setOpen] = useState(false);
  const activeOptions = selectedFilters[group.id] || [];
  const allSelected = activeOptions.length === 0;

  return (
    <div className={styles.filterGroup}>
      <button
        className={styles.groupHeader}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`filter-${group.id}`}
      >
        <span>{group.label}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>&#8964;</span>
      </button>
      {open && (
        <ul id={`filter-${group.id}`} className={styles.optionsList}>
          <li>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => onFilterChange(group.id, null)}
              />
              All
            </label>
          </li>
          {group.options.map((option) => (
            <li key={option}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={activeOptions.includes(option)}
                  onChange={() => onFilterChange(group.id, option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FilterSidebar({ categories = [], selectedFilters, onFilterChange, isVisible = true, onClose }) {
  const categoryGroup = {
    id: 'category',
    label: 'CATEGORY',
    options: categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
  };

  const filterGroups = categories.length > 0
    ? [categoryGroup, ...STATIC_FILTER_GROUPS]
    : STATIC_FILTER_GROUPS;

  if (!isVisible) return null;

  return (
    <aside className={styles.sidebar} aria-label="Product Filters">
      <div className={styles.sidebarHeader}>
        <h2 className={styles.filterTitle}>FILTERS</h2>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">&#10005;</button>
        )}
      </div>
      {filterGroups.map((group) => (
        <FilterGroup
          key={group.id}
          group={group}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
        />
      ))}
    </aside>
  );
}
