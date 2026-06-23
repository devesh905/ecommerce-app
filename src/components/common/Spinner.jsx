/**
 * Simple loading spinner. Pass `fullPage` to center it within a tall block
 * for page-level loading states.
 */
export default function Spinner({ fullPage = false }) {
  return (
    <div className={`spinner-wrap${fullPage ? ' spinner-wrap--full' : ''}`} role="status" aria-live="polite">
      <span className="spinner" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
