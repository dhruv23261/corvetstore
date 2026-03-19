import React from 'react';

const ShopByVideo = () => (
  <section className="bg-[#EFE3DA] py-16 md:py-20 px-5 md:px-6">
    <div className="max-w-screen-xl mx-auto">
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#3C2F2A] mb-2 text-center">Shop By Video</h2>
      <p className="font-inter text-sm text-[#8B776E] mb-10 md:mb-12 text-center">Watch, discover, and shop</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i}
            className="relative bg-gradient-to-b from-[#E7D6CB]/70 to-[#EFE3DA] rounded-3xl overflow-hidden aspect-[9/16] max-h-72 flex items-center justify-center group cursor-pointer hover:shadow-xl transition-all duration-300 border border-[#DCC8BC]/60">
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C2F2A]/25 to-transparent group-hover:from-[#3C2F2A]/35 transition flex items-end justify-center pb-6">
              <div className="w-12 h-12 rounded-full bg-white/80 group-hover:bg-white group-hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-200">
                <svg className="w-5 h-5 text-[#8B776E] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </div>
            </div>
            <span className="text-xs text-[#6A5A53] font-medium opacity-25">Video {i}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ShopByVideo;
