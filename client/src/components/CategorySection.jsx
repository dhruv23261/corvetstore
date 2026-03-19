import React from 'react';

const categories = [
  { id: 1, label: 'Canvas Wall Art' },
  { id: 2, label: 'Blossom Light' },
  { id: 3, label: 'Gifting', image: '/category_gifting.png' },
  { id: 4, label: 'Bottles', image: '/category_bottles.png' },
  { id: 5, label: 'Personalised Photobook' },
  { id: 6, label: 'Neon Lights' },
  { id: 7, label: 'Tumblers', image: '/category_tumblers.png' },
  { id: 8, label: 'Glassware' },
  { id: 9, label: '2026 Planner Book' },
  { id: 10, label: 'Candles', image: '/category_candles.png' },
];

const CategorySection = () => (
  <section className="bg-[#F6EFE9] py-14 px-6">
    <div className="max-w-screen-xl mx-auto">
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#3C2F2A] mb-2 text-center md:text-left">
        Aren Collection
      </h2>
      <p className="font-inter text-sm text-[#8B776E] mb-8 text-center md:text-left">
        Explore our curated categories
      </p>
      <div className="flex gap-7 overflow-x-auto hide-scrollbar pb-2">
        {categories.map(cat => (
          <button key={cat.id} className="flex flex-col items-center gap-3 flex-shrink-0 group">
            <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full bg-[#EFE3DA] border-[2.5px] border-[#DCC8BC]
              group-hover:border-[#8B776E] group-hover:scale-105 group-hover:shadow-md
              transition-all duration-200 flex items-center justify-center shadow-sm overflow-hidden">
              {cat.image ? (
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-7 h-7 text-[#8B776E]/45 group-hover:text-[#8B776E] transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              )}
            </div>
            <span className="text-[11px] md:text-xs font-inter font-semibold text-[#3C2F2A] text-center leading-tight max-w-[80px] group-hover:text-[#8B776E] transition-colors">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
