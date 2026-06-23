import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getCategoryById, getProducts } from '../services/api';
import ProductGrid from '../components/product/ProductGrid';
import SortControl from '../components/product/SortControl';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState('');

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useAsync(() => getCategoryById(categoryId), [categoryId]);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch,
  } = useAsync(() => getProducts({ categoryId, sortBy }), [categoryId, sortBy]);

  if (categoryError) {
    return (
      <div className="container section">
        <ErrorMessage message="This category doesn't exist." />
        <Link to="/" className="btn btn--secondary">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      {categoryLoading ? (
        <Spinner />
      ) : (
        category && (
          <header className="page-header">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </header>
        )
      )}

      {productsLoading && <Spinner />}
      {productsError && <ErrorMessage message="Couldn't load products." onRetry={refetch} />}
      {products && (
        <>
          <SortControl value={sortBy} onChange={setSortBy} resultCount={products.length} />
          <ProductGrid products={products} />
        </>
      )}
    </div>
  );
}
