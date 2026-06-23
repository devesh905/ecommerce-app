import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getProducts } from '../services/api';
import ProductGrid from '../components/product/ProductGrid';
import SortControl from '../components/product/SortControl';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [sortBy, setSortBy] = useState('');

  const { data: products, isLoading, error, refetch } = useAsync(
    () => getProducts({ search: query, sortBy }),
    [query, sortBy]
  );

  return (
    <div className="container section">
      <header className="page-header">
        <h1>{query ? `Search results for "${query}"` : 'Search'}</h1>
      </header>

      {isLoading && <Spinner />}
      {error && <ErrorMessage message="Couldn't load search results." onRetry={refetch} />}
      {products && (
        <>
          <SortControl value={sortBy} onChange={setSortBy} resultCount={products.length} />
          <ProductGrid products={products} />
        </>
      )}
    </div>
  );
}
