import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Floral Tumbler – Blush Pink', price: 899, originalPrice: 1199, badge: 'Bestseller', category: 'Tumblers' },
  { id: 2, name: 'Aesthetic Water Bottle', price: 649, originalPrice: 899, badge: 'New', category: 'Bottles' },
  { id: 3, name: 'Soy Wax Candle – Rose', price: 499, originalPrice: 699, badge: null, category: 'Candles' },
  { id: 4, name: 'Gift Hamper – Deluxe', price: 1499, originalPrice: 1999, badge: 'Popular', category: 'Gifting' },
  { id: 5, name: 'Personalised Photo Album', price: 799, originalPrice: 999, badge: 'New', category: 'Photobook' },
  { id: 6, name: 'Neon LED Light – Custom', price: 1299, originalPrice: 1799, badge: null, category: 'Neon' },
  { id: 7, name: 'Borosilicate Glass Bottle', price: 549, originalPrice: 749, badge: 'Sale', category: 'Glassware' },
  { id: 8, name: '2026 Planner – Floral', price: 399, originalPrice: 599, badge: 'Hot', category: 'Planner' },
];

const badgeColors = {
  Bestseller: 'bg-[#8B776E] text-white',
  New: 'bg-[#B79B8E] text-white',
  Popular: 'bg-[#E7D6CB] text-[#3C2F2A]',
  Sale: 'bg-[#B79B8E] text-white',
  Hot: 'bg-[#8B776E] text-white',
};

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative border border-[#DCC8BC]/60">
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide shadow-sm ${badgeColors[product.badge] || 'bg-[#8B776E] text-white'}`}>
          {product.badge}
        </span>
      )}
      <button onClick={() => setWishlisted(w => !w)}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-md transition-all hover:scale-110">
        <svg className={`w-4 h-4 transition-colors ${wishlisted ? 'text-[#8B776E] fill-[#8B776E]' : 'text-[#8B776E]/35'}`}
          fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <div className="w-full h-52 bg-gradient-to-br from-[#EFE3DA] to-[#E7D6CB]/55 group-hover:from-[#E7D6CB]/70 group-hover:to-[#EFE3DA] transition-all duration-500 flex items-center justify-center">
        <svg className="w-14 h-14 text-[#8B776E]/20 group-hover:text-[#8B776E]/35 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>
      <div className="p-4 md:p-5">
        <p className="text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5">{product.category}</p>
        <h3 className="font-inter font-semibold text-sm text-[#3C2F2A] leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-[#3C2F2A] text-base">₹{product.price}</span>
          <span className="text-xs text-[#6A5A53]/55 line-through">₹{product.originalPrice}</span>
          <span className="text-[10px] font-bold text-[#6E5B54] bg-[#F6EFE9] px-2 py-0.5 rounded-full border border-[#DCC8BC]/70">{discount}% off</span>
        </div>
        <button className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white text-[11px] font-bold py-3 rounded-full transition-all duration-200 active:scale-95 tracking-[0.15em] shadow-sm hover:shadow-md">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => (
  <section className="bg-[#F6EFE9] py-16 md:py-20 px-5 md:px-6">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-end justify-between mb-10 md:mb-12">
        <div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#3C2F2A]">Featured Products</h2>
          <p className="font-inter text-sm text-[#8B776E] mt-1.5">Handpicked just for you</p>
        </div>
        <a href="#" className="text-sm font-semibold text-[#8B776E] hover:text-[#3C2F2A] hover:underline underline-offset-4 transition hidden sm:block">View All →</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="mt-10 sm:hidden flex justify-center">
        <a href="#" className="text-sm font-semibold text-[#8B776E] border border-[#8B776E] px-8 py-2.5 rounded-full hover:bg-[#8B776E] hover:text-white transition-all">
          View All Products
        </a>
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
