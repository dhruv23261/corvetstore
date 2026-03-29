import React from 'react';

const AnnouncementBar = () => (
  <div className="flex flex-col">
    {/* Upper row: Brown */}
    <div className="bg-[#8B776E] text-white text-[10px] py-2 px-6 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-10">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="flex items-center gap-2">
            ✨ Enjoy Free Shipping & 5% Off on Prepaid Orders!
          </span>
        ))}
      </div>
    </div>
    
    {/* Lower row: Cream */}
    <div className="bg-[#F6EFE9] text-[#3C2F2A] text-[10px] py-1.5 px-10 flex items-center justify-between border-b border-[#DCC8BC]/40">
      <div className="flex items-center gap-6">
        <span>Enjoy Free Shipping all orders</span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L33.43 8.909a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          corvet@gmail.com
        </span>
      </div>
    </div>
  </div>
);

export default AnnouncementBar;
