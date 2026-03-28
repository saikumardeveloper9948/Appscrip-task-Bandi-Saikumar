import { useState } from 'react';
import styles from './FilterSidebar.module.css';

const FILTER_GROUPS = [
  { id: 'idealFor', label: 'IDEAL FOR', options: ['Men', 'Women', 'Baby & Kids'] },
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
                checked={!selectedFilters[group.id] || selectedFilters[group.id].length === 0}
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
                  checked={selectedFilters[group.id]?.includes(option) || false}
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

export default function FilterSidebar({ isVisible = true, onClose }) {
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

  if (!isVisible) return null;

  return (
    <aside className={styles.sidebar} aria-label="Product Filters">
      <div className={styles.sidebarHeader}>
        <h2 className={styles.filterTitle}>FILTERS</h2>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">&#10005;</button>
        )}
      </div>
      {FILTER_GROUPS.map((group) => (
        <FilterGroup
          key={group.id}
          group={group}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      ))}
    </aside>
  );
}
