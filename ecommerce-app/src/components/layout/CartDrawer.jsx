import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';

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
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer__empty">Your cart is empty.</p>
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
                    Remove
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
