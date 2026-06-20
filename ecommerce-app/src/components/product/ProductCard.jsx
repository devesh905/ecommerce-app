import { Link } from 'react-router-dom';
import StarRating from '../common/StarRating';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../context/CartContext';

/**
 * Compact product summary used in grid listings. Clicking the card
 * navigates to the detail page; the "Add to cart" button is stopped from
 * bubbling so it doesn't also trigger navigation.
 */
export default function ProductCard({ product }) {
  const { addItem } = useCart();

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();
    addItem(product, 1);
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.images[0]} alt={product.name} className="product-card__image" loading="lazy" />
        {product.stock === 0 && <span className="badge badge--out">Out of stock</span>}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>

      <button
        type="button"
        className="btn btn--primary btn--full"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Unavailable' : 'Add to cart'}
      </button>
    </Link>
  );
}
