import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
  </svg>
);

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven&rsquo;t added anything yet.</p>
        <Link to="/" className="btn btn--primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Your cart</h1>

      <div className="cart-page">
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="cart-table__product">
                    <img src={item.image} alt="" loading="lazy" />
                    <span>{item.name}</span>
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{formatPrice(item.price * item.quantity)}</td>
                  <td>
                    <button
                      type="button"
                      className="cart-table__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button type="button" className="btn btn--primary btn--full">
            Proceed to checkout
          </button>
          <button type="button" className="btn btn--text btn--full" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
