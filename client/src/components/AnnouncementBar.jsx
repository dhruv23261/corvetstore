import React from 'react';

const AnnouncementBar = () => (
  <div className="bg-[#F2C4C8] text-[#5C3D42] text-xs py-2.5 px-6 flex items-center justify-between tracking-wide">
    <span className="font-inter font-medium">🚚 Enjoy Free Shipping on all orders above ₹499</span>
    <span className="hidden sm:flex items-center gap-1.5 text-[#5C3D42]/70">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
      arenstore@gmail.com
    </span>
  </div>
);

export default AnnouncementBar;
