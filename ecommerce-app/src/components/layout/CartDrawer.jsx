import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
  </svg>
);

export default function CartDrawer({ isOpen, onClose }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <>
      <div
        className={`drawer-overlay${isOpen ? ' drawer-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`cart-drawer${isOpen ? ' cart-drawer--open' : ''}`} aria-label="Shopping cart" aria-hidden={!isOpen}>
        <div className="cart-drawer__header">
          <h2>Your cart</h2>
          <button type="button" onClick={onClose} aria-label="Close cart" className="cart-drawer__close">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt="" className="cart-item__image" loading="lazy" />
                  <div className="cart-item__details">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">{formatPrice(item.price)}</p>
                    <div className="cart-item__quantity">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <Link to="/cart" className="btn btn--primary btn--full" onClick={onClose}>
                View cart &amp; checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
