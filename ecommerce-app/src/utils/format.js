/**
 * Format a number as USD currency, e.g. 129.9 -> "$129.90".
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

/**
 * Clamp a number between a min and max (inclusive).
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
