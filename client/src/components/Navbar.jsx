import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen, cartTotal } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-[#DCC8BC]/60 sticky top-0 z-50 shadow-sm">
      {/* Desktop */}
      <div className="hidden md:flex flex-col bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#DCC8BC]/40 shadow-sm">
        <div className="flex items-center justify-between px-10 py-6 max-w-screen-xl mx-auto w-full">
          {/* Left: Spacer to keep logo center */}
          <div className="w-1/3" />

          {/* Center: Logo */}
          <Link to="/" className="flex flex-col items-center select-none pt-2">
            <div className="relative border border-[#3C2F2A] border-b-0 w-12 h-12 flex items-end justify-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 border-t border-l border-[#3C2F2A] rotate-45 bg-white transition-colors"></div>
              <span className="font-playfair text-[#8B776E] text-2xl font-bold leading-none mb-1">C</span>
            </div>
            <p className="font-playfair font-bold text-xl tracking-[0.15em] text-[#3C2F2A] mt-1">
              CORVET <span className="text-[#8B776E] font-inter text-[9px] uppercase tracking-[0.4em] ml-1">Store</span>
            </p>
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-6 justify-end w-1/3 text-[#3C2F2A]">
            <button className="relative hover:text-[#8B776E] transition-colors" onClick={() => alert('Wishlist feature coming soon!')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            <Link to={localStorage.getItem('user_token') ? '/profile' : '/login'} className="hover:text-[#8B776E] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <svg className="w-7 h-7 text-[#3C2F2A] group-hover:text-[#8B776E]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold tracking-tighter animate-bounce">{cartCount}</span>}
              </div>
              <div className="text-left hidden lg:block leading-none">
                <p className="text-[9px] font-bold text-[#8B776E] tracking-tight group-hover:text-[#3C2F2A]">My cart</p>
                <p className="text-xs font-bold text-[#3C2F2A]">Rs. {cartTotal.toLocaleString('en-IN')}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex xl:hidden items-center justify-between px-4 py-3 bg-[#F6EFE9] border-b border-[#DCC8BC]/40">
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#3C2F2A] p-1 flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center select-none pt-1">
          <p className="font-playfair font-bold text-lg leading-none tracking-widest text-[#3C2F2A]">
            <span className="text-xl text-[#8B776E]">C</span>ORVET <span className="text-[#8B776E] text-xs font-inter uppercase tracking-[0.1em] ml-0.5">Store</span>
          </p>
        </Link>

        {/* Action Icons */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-[#3C2F2A]">
          <button className="p-1 hover:text-[#8B776E] relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          <Link to="/admin" className="p-1 hover:text-[#8B776E]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-1 hover:text-[#8B776E] relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#DCC8BC]/60 px-5 py-3 space-y-0.5 animate-fade-in">
          {['Home', 'All Categories', 'New Arrivals', 'Bestsellers', 'Gifting', 'About Us'].map(item => (
            <a key={item} href="#"
              className="block py-3 text-sm font-medium text-[#3C2F2A] hover:text-[#8B776E] border-b border-[#DCC8BC]/50 last:border-0 transition-colors">
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
