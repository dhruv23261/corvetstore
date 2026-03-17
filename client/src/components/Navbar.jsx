import React, { useState } from 'react';

const Navbar = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#faf0eb] border-b border-[#e8d0c4] sticky top-0 z-50 shadow-sm">
      {/* ─── Desktop ─── */}
      <div className="hidden md:flex items-center justify-between px-10 py-5 max-w-screen-xl mx-auto">

        {/* Left: Search */}
        <div className="flex items-center w-1/3">
          {searchOpen ? (
            <input
              autoFocus
              onBlur={() => setSearchOpen(false)}
              className="border border-[#c4a090] bg-white/80 rounded-full px-5 py-2 text-sm outline-none w-64 transition-all shadow-sm"
              placeholder="Search products..."
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#6b4540] hover:text-[#8b5e52] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          )}
        </div>

        {/* Center: Logo (text only) */}
        <div className="flex flex-col items-center flex-shrink-0 select-none">
          <p className="font-playfair font-bold text-2xl leading-none tracking-widest text-[#2e1a14]">
            <span className="text-3xl text-[#8b5e52]">A</span>REN
          </p>
          <p className="font-inter text-[9px] tracking-[0.4em] text-[#a07060] font-semibold mt-0.5">
            STORE
          </p>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6 justify-end w-1/3">

          {/* Wishlist */}
          <button className="relative text-[#6b4540] hover:text-[#8b5e52] transition-colors group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8b5e52] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button className="text-[#6b4540] hover:text-[#8b5e52] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>

          {/* Cart */}
          <button className="flex items-center gap-2.5 text-[#6b4540] hover:text-[#8b5e52] transition-colors">
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#8b5e52] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </div>
            <div className="text-left leading-tight">
              <p className="text-[10px] text-[#a07060] font-semibold">My cart</p>
              <p className="text-sm font-bold text-[#2e1a14]">₹0.00</p>
            </div>
          </button>
        </div>
      </div>

      {/* ─── Mobile ─── */}
      <div className="flex md:hidden items-center justify-between px-4 py-3.5">
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#2e1a14]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Logo center */}
        <div className="flex flex-col items-center select-none">
          <p className="font-playfair font-bold text-lg leading-none tracking-widest text-[#2e1a14]">
            <span className="text-xl text-[#8b5e52]">A</span>REN
          </p>
          <p className="font-inter text-[7px] tracking-[0.35em] text-[#a07060] font-semibold">STORE</p>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="text-[#6b4540]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
          <button className="relative text-[#6b4540]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-[#8b5e52] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          <button className="relative text-[#6b4540]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-[#8b5e52] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#faf0eb] border-t border-[#e8d0c4] px-5 py-3 space-y-1">
          {['Home', 'All Categories', 'New Arrivals', 'Bestsellers', 'Gifting', 'About Us'].map(item => (
            <a
              key={item}
              href="#"
              className="block py-2.5 text-sm font-medium text-[#2e1a14] hover:text-[#8b5e52] border-b border-[#ead5c5] last:border-0 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
