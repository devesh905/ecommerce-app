import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getCategories, getProducts } from '../services/api';
import CategoryCard from '../components/category/CategoryCard';
import ProductGrid from '../components/product/ProductGrid';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function HomePage() {
  const { data: categories, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } =
    useAsync(getCategories, []);
  const { data: products, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useAsync(
    () => getProducts({ sortBy: 'rating' }),
    []
  );

  const featured = products?.slice(0, 4) ?? [];

  return (
    <div>
      <section className="hero">
        <div className="container hero__content">
          <h1>Everything you need, in one place</h1>
          <p>Browse curated electronics, fashion, home goods, and outdoor gear.</p>
          <Link to="/category/electronics" className="btn btn--primary">
            Shop electronics
          </Link>
        </div>
      </section>

      <section className="container section">
        <h2 className="section__title">Shop by category</h2>
        {categoriesLoading && <Spinner />}
        {categoriesError && <ErrorMessage message="Couldn't load categories." onRetry={refetchCategories} />}
        {categories && (
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      <section className="container section">
        <h2 className="section__title">Top rated products</h2>
        {productsLoading && <Spinner />}
        {productsError && <ErrorMessage message="Couldn't load products." onRetry={refetchProducts} />}
        {products && <ProductGrid products={featured} />}
      </section>
    </div>
  );
}
