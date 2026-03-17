import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Floral Tumbler – Blush Pink', price: 899, originalPrice: 1199, badge: 'Bestseller', category: 'Tumblers' },
  { id: 2, name: 'Aesthetic Water Bottle', price: 649, originalPrice: 899, badge: 'New', category: 'Bottles' },
  { id: 3, name: 'Soy Wax Candle – Rose', price: 499, originalPrice: 699, badge: null, category: 'Candles' },
  { id: 4, name: 'Gift Hamper – Deluxe', price: 1499, originalPrice: 1999, badge: 'Popular', category: 'Gifting' },
  { id: 5, name: 'Personalised Photo Album', price: 799, originalPrice: 999, badge: 'New', category: 'Photobook' },
  { id: 6, name: 'Neon LED Light – Custom', price: 1299, originalPrice: 1799, badge: null, category: 'Neon' },
  { id: 7, name: 'Borosilicate Glass Bottle', price: 549, originalPrice: 749, badge: 'Sale', category: 'Glassware' },
  { id: 8, name: '2025 Planner – Floral', price: 399, originalPrice: 599, badge: 'Hot', category: 'Planner' },
];

const badgeColors = {
  Bestseller: 'bg-[#8b5e52] text-white',
  New: 'bg-[#6e4a3e] text-white',
  Popular: 'bg-[#a07060] text-white',
  Sale: 'bg-rose-400 text-white',
  Hot: 'bg-[#8b5e52] text-white',
};

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative border border-[#f0e0d8]">
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide ${badgeColors[product.badge] || 'bg-[#8b5e52] text-white'}`}>
          {product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={() => setWishlisted(w => !w)}
        className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-1.5 hover:bg-white shadow-sm transition"
      >
        <svg
          className={`w-4 h-4 transition-colors ${wishlisted ? 'text-rose-400 fill-rose-400' : 'text-[#c4a090]'}`}
          fill={wishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image placeholder */}
      <div className="w-full h-48 bg-[#f5e8df] group-hover:bg-[#ead5c5] transition-colors duration-300 flex items-center justify-center">
        <svg className="w-14 h-14 text-[#c4a090]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>

      {/* Card Info */}
      <div className="p-4">
        <p className="text-[10px] font-bold text-[#a07060] uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-inter font-semibold text-sm text-[#2e1a14] leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-[#2e1a14] text-base">₹{product.price}</span>
          <span className="text-xs text-[#c4a090] line-through">₹{product.originalPrice}</span>
          <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">{discount}% off</span>
        </div>
        <button className="w-full bg-[#8b5e52] hover:bg-[#6e4a3e] text-white text-[11px] font-bold py-3 rounded-full transition-all duration-200 active:scale-95 tracking-[0.15em] shadow-sm">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => (
  <section className="bg-[#faf0eb] py-16 px-6">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#2e1a14]">Featured Products</h2>
          <p className="font-inter text-sm text-[#a07060] mt-1">Handpicked just for you</p>
        </div>
        <a href="#" className="text-sm font-semibold text-[#8b5e52] hover:underline underline-offset-4 transition hidden sm:block">
          View All →
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="mt-8 sm:hidden flex justify-center">
        <a href="#" className="text-sm font-semibold text-[#8b5e52] border border-[#8b5e52] px-8 py-2.5 rounded-full hover:bg-[#8b5e52] hover:text-white transition">
          View All Products
        </a>
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
