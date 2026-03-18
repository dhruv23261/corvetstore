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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('admin_token'));

  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront */}
        <Route path="/" element={<Home />} />

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
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
