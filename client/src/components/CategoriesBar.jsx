import React from 'react';

const CategoriesBar = () => (
  <div className="hidden md:flex bg-[#EFE3DA]/70 border-b border-[#DCC8BC]/70 px-10">
    <div className="max-w-screen-xl mx-auto w-full flex items-center gap-1">
      <button 
        onClick={() => alert('Opening full category browser...')}
        className="flex items-center gap-2.5 bg-[#8B776E] text-white text-xs font-semibold px-6 py-4 hover:bg-[#6E5B54] transition-colors tracking-wider flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        ALL CATEGORIES
      </button>
      {['Home', 'New Arrivals', 'Bestsellers', 'Gifting', 'Tumblers', 'Candles', 'Bottles', 'About Us'].map(item => (
        <button key={item} 
          onClick={() => alert(`Showing ${item} page...`)}
          className="px-4 py-4 text-xs font-semibold text-[#3C2F2A] hover:text-[#8B776E] hover:bg-[#EFE3DA] transition-all whitespace-nowrap tracking-wide">
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default CategoriesBar;
