import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useAsync } from '../../hooks/useAsync';
import { getCategories } from '../../services/api';

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const { data: categories } = useAsync(getCategories, []);
  const location = useLocation();

  // Handle theme class application
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('theme-light');
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
      root.classList.add('theme-light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close the cart drawer automatically on navigation
  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app-shell">
      <Header
        categories={categories ?? []}
        onCartClick={() => setIsCartOpen(true)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
