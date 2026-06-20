import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useAsync } from '../../hooks/useAsync';
import { getCategories } from '../../services/api';

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: categories } = useAsync(getCategories, []);
  const location = useLocation();

  // Close the cart drawer automatically on navigation so it doesn't
  // stay open over a page the user didn't expect.
  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Header categories={categories ?? []} onCartClick={() => setIsCartOpen(true)} />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
