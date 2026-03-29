import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('admin_token'));

  return (
    <CartProvider>
      <BrowserRouter>
        <CartDrawer />
        <Routes>
          {/* Storefront */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/checkout" element={<Checkout />} />

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
  );
}

export default App;
