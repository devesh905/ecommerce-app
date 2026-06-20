/**
 * Renders a 5-star rating as filled/half/empty stars plus the numeric
 * value and review count. Purely presentational.
 */
export default function StarRating({ rating, reviewCount, size = 'md' }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const threshold = i + 1;
    if (rating >= threshold) return 'full';
    if (rating >= threshold - 0.5) return 'half';
    return 'empty';
  });

  return (
    <div className={`rating rating--${size}`} aria-label={`Rated ${rating} out of 5 stars`}>
      <span className="rating__stars" aria-hidden="true">
        {stars.map((type, i) => (
          <span key={i} className={`rating__star rating__star--${type}`}>
            ★
          </span>
        ))}
      </span>
      {reviewCount !== undefined && <span className="rating__count">({reviewCount})</span>}
    </div>
  );
}
