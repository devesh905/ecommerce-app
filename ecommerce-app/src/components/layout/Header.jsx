import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Header({ categories, onCartClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();
    const term = searchTerm.trim();
    navigate(term ? `/search?q=${encodeURIComponent(term)}` : '/search');
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header__bar container">
        <Link to="/" className="header__logo" onClick={() => setMenuOpen(false)}>
          Shopfront
        </Link>

        <form className="header__search" role="search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search">
            🔍
          </button>
        </form>

        <div className="header__actions">
          <button
            type="button"
            className="cart-trigger"
            onClick={onCartClick}
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
          >
            🛒
            {itemCount > 0 && <span className="cart-trigger__badge">{itemCount}</span>}
          </button>
          <button
            type="button"
            className="header__menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>
      </div>

      <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`} aria-label="Product categories">
        <ul className="container">
          <li>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              All Products
            </NavLink>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink to={`/category/${category.id}`} onClick={() => setMenuOpen(false)}>
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
