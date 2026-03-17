import React from 'react';

const CategoriesBar = () => (
  <div className="hidden md:flex bg-[#f5e8df] border-b border-[#e8d0c4] px-10">
    <div className="max-w-screen-xl mx-auto w-full flex items-center gap-1">
      {/* All Categories button */}
      <button className="flex items-center gap-2.5 bg-[#8b5e52] text-white text-xs font-semibold px-6 py-4 hover:bg-[#6e4a3e] transition-colors tracking-wider flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        ALL CATEGORIES
      </button>

      {/* Nav links */}
      {['Home', 'New Arrivals', 'Bestsellers', 'Gifting', 'Tumblers', 'Candles', 'Bottles', 'About Us'].map(item => (
        <a
          key={item}
          href="#"
          className="px-4 py-4 text-xs font-semibold text-[#2e1a14] hover:text-[#8b5e52] hover:bg-[#faf0eb] transition-all whitespace-nowrap tracking-wide"
        >
          {item}
        </a>
      ))}
    </div>
  </div>
);

export default CategoriesBar;
