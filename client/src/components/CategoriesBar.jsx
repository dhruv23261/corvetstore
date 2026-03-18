import React from 'react';

const CategoriesBar = () => (
  <div className="hidden md:flex bg-[#FFF0EC]/60 border-b border-[#F2C4C8] px-10">
    <div className="max-w-screen-xl mx-auto w-full flex items-center gap-1">
      <button className="flex items-center gap-2.5 bg-[#D4868C] text-white text-xs font-semibold px-6 py-4 hover:bg-[#5C3D42] transition-colors tracking-wider flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        ALL CATEGORIES
      </button>
      {['Home', 'New Arrivals', 'Bestsellers', 'Gifting', 'Tumblers', 'Candles', 'Bottles', 'About Us'].map(item => (
        <a key={item} href="#"
          className="px-4 py-4 text-xs font-semibold text-[#5C3D42] hover:text-[#D4868C] hover:bg-[#FFF0EC] transition-all whitespace-nowrap tracking-wide">
          {item}
        </a>
      ))}
    </div>
  </div>
);

export default CategoriesBar;
