import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: DashboardIcon },
  { label: 'Products', path: '/admin/products', icon: ProductsIcon },
  { label: 'Orders', path: '/admin/orders', icon: OrdersIcon },
  { label: 'Customers', path: '/admin/customers', icon: CustomersIcon },
  { label: 'Settings', path: '/admin/settings', icon: SettingsIcon },
];

export default function AdminLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    onLogout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#FFF8F6] font-inter">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-[#F2C4C8]/30
        transform transition-transform duration-200 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#F2C4C8]/20">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFF0EC] to-[#F2C4C8] flex items-center justify-center shadow-sm">
            <span className="text-[#D4868C] font-playfair font-bold text-xl">A</span>
          </div>
          <div>
            <span className="font-playfair font-semibold text-[#5C3D42] text-lg block leading-tight">Aren Admin</span>
            <span className="text-[10px] text-[#D4868C]">Store Management</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150
                ${isActive
                  ? 'bg-[#FFF0EC] text-[#5C3D42] shadow-sm'
                  : 'text-[#D4868C] hover:bg-[#FFF0EC]/50 hover:text-[#5C3D42]'}`}>
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#F2C4C8]/20">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#FFF0EC] flex items-center justify-center text-[#D4868C] font-semibold text-sm">
              {adminUser.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#5C3D42] truncate">{adminUser.name || 'Admin'}</p>
              <p className="text-[10px] text-[#D4868C] truncate">{adminUser.email || ''}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#F2C4C8]/20 flex items-center justify-between px-6 shrink-0">
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-2xl hover:bg-[#FFF0EC]/50 transition-colors" aria-label="Open sidebar">
            <svg className="w-5 h-5 text-[#D4868C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm text-[#D4868C]">Welcome back, <span className="text-[#5C3D42] font-medium">{adminUser.name || 'Admin'}</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-2xl hover:bg-[#FFF0EC]/50 transition-colors" aria-label="Notifications">
              <svg className="w-5 h-5 text-[#D4868C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-px h-6 bg-[#F2C4C8]/30" />
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm text-[#D4868C] hover:bg-red-50 hover:text-red-600 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* --- Icons --- */
function DashboardIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm10-2a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" /></svg>;
}
function ProductsIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
}
function OrdersIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
}
function CustomersIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
function SettingsIcon() {
  return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
