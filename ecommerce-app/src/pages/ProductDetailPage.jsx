import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getProductById, getRelatedProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatPrice, clamp } from '../utils/format';
import ProductGallery from '../components/product/ProductGallery';
import ProductGrid from '../components/product/ProductGrid';
import StarRating from '../components/common/StarRating';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const { data: product, isLoading, error } = useAsync(() => getProductById(productId), [productId]);
  const { data: relatedProducts } = useAsync(() => getRelatedProducts(productId), [productId]);

  // Reset transient UI state whenever the user navigates to a different product.
  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container section">
        <Spinner fullPage />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container section">
        <ErrorMessage message="We couldn't find that product." />
        <Link to="/" className="btn btn--secondary">
          Back to home
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product, quantity);
    setJustAdded(true);
  }

  function handleQuantityChange(delta) {
    setQuantity((q) => clamp(q + delta, 1, product.stock || 1));
  }

  return (
    <div className="container section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/category/${product.categoryId}`}>{product.categoryId}</Link> /{' '}
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-detail">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="product-detail__info">
          <h1>{product.name}</h1>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          <p className="product-detail__price">{formatPrice(product.price)}</p>
          <p className="product-detail__description">{product.description}</p>

          <dl className="product-detail__specs">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="product-detail__spec-row">
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <p className="product-detail__stock">
            {product.stock > 0 ? (
              <span className="text-success">In stock ({product.stock} available)</span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </p>

          {product.stock > 0 && (
            <div className="product-detail__purchase">
              <div className="quantity-control" aria-label="Quantity">
                <button type="button" onClick={() => handleQuantityChange(-1)} aria-label="Decrease quantity">
                  −
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">
                  +
                </button>
              </div>
              <button type="button" className="btn btn--primary" onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          )}

          {justAdded && (
            <p className="confirmation-message" role="status">
              Added {quantity} {quantity === 1 ? 'item' : 'items'} to your cart.
            </p>
          )}
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="section">
          <h2 className="section__title">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
