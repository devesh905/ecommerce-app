/**
 * Displays an error state with an optional retry action. Used wherever
 * useAsync surfaces a fetch failure.
 */
export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-box__text">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
