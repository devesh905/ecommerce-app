const SORT_OPTIONS = [
  { value: '', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'name', label: 'Name (A–Z)' },
];

export default function SortControl({ value, onChange, resultCount }) {
  return (
    <div className="sort-control">
      <span className="sort-control__count">
        {resultCount} {resultCount === 1 ? 'product' : 'products'}
      </span>
      <label className="sort-control__label">
        Sort by
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
