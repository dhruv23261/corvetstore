import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const badgePalette = {
  Bestseller: 'bg-[#8B776E] text-white',
  New:        'bg-emerald-500 text-white',
  Trending:   'bg-rose-400 text-white',
  Sale:       'bg-amber-400 text-[#3C2F2A]',
  Popular:    'bg-[#B79B8E] text-white',
  Limited:    'bg-purple-500 text-white',
};

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product._id);
  
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group border border-[#EFE3DA]">
      {/* Image area */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-[#EFE3DA] to-[#F6EFE9] overflow-hidden">
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 z-10 text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wide ${badgePalette[product.badge] || 'bg-[#8B776E] text-white'}`}>
            {product.badge}
          </span>
        )}
        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all">
          <svg className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-[#8B776E]/50'}`}
            fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            onClick={onClick}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center cursor-pointer" onClick={onClick}>
            <svg className="w-12 h-12 text-[#8B776E]/20" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 cursor-pointer" onClick={onClick}>
        <p className="text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-inter font-semibold text-[12px] md:text-sm text-[#3C2F2A] leading-snug line-clamp-2 min-h-[2.5em] mb-2">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          <span className="font-bold text-[#3C2F2A] text-sm">₹{product.price.toLocaleString('en-IN')}</span>
          {discount > 0 && (
            <>
              <span className="text-[10px] text-[#8B776E]/60 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{discount}% off</span>
            </>
          )}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
          className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white text-[10px] font-bold py-2.5 rounded-xl transition-all duration-200 active:scale-95 tracking-[0.12em] uppercase shadow-sm hover:shadow-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
