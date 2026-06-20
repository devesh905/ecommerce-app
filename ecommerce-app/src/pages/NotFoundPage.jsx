import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container section empty-state">
      <h1>404</h1>
      <p>We couldn&rsquo;t find the page you&rsquo;re looking for.</p>
      <Link to="/" className="btn btn--primary">
        Back to home
      </Link>
    </div>
  );
}
