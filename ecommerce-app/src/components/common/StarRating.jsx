// Star icon with custom color bindings and gradients
const StarIcon = ({ type, id }) => {
  let fillVal = 'var(--color-border)';
  if (type === 'full') {
    fillVal = 'var(--color-accent)';
  } else if (type === 'half') {
    fillVal = `url(#halfGrad-${id})`;
  }

  return (
    <svg
      className={`rating__star rating__star--${type}`}
      viewBox="0 0 24 24"
      fill={fillVal}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', width: '1em', height: '1em' }}
    >
      {type === 'half' && (
        <defs>
          <linearGradient id={`halfGrad-${id}`}>
            <stop offset="50%" stopColor="var(--color-accent)" />
            <stop offset="50%" stopColor="var(--color-border)" />
          </linearGradient>
        </defs>
      )}
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export default function StarRating({ rating, reviewCount, size = 'md' }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const threshold = i + 1;
    if (rating >= threshold) return 'full';
    if (rating >= threshold - 0.5) return 'half';
    return 'empty';
  });

  // Unique ID prefix for gradients to prevent namespace collisions in lists
  const randomId = Math.random().toString(36).substr(2, 9);

  return (
    <div className={`rating rating--${size}`} aria-label={`Rated ${rating} out of 5 stars`}>
      <span className="rating__stars" aria-hidden="true">
        {stars.map((type, i) => (
          <StarIcon key={i} type={type} id={`${randomId}-${i}`} />
        ))}
      </span>
      {reviewCount !== undefined && <span className="rating__count">({reviewCount})</span>}
    </div>
  );
}
