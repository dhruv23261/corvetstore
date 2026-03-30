import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// New ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
import Home from './pages/Home';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Settings from './pages/admin/Settings';
import HeroManagement from './pages/admin/HeroManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import ProductPage from './pages/ProductPage';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserProfile from './pages/UserProfile';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import CategoryPage from './pages/CategoryPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('admin_token'));

  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <CartDrawer />
          <Routes>
            {/* Storefront */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/profile" element={<UserProfile />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/wishlist" element={<Wishlist />} />
             <Route path="/category/:categoryName" element={<CategoryPage />} />

            {/* Admin Login */}
          <Route
            path="/admin/login"
            element={
              isLoggedIn
                ? <Navigate to="/admin" replace />
                : <Login onLogin={() => setIsLoggedIn(true)} />
            }
          />

          {/* Admin Panel (protected) */}
          <Route
            path="/admin"
            element={
              isLoggedIn
                ? <AdminLayout onLogout={() => setIsLoggedIn(false)} />
                : <Navigate to="/admin/login" replace />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="products" element={<Products />} />
            <Route path="banners" element={<HeroManagement />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </WishlistProvider>
  );
}

export default App;
