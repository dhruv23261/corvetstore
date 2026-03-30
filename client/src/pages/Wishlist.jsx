import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#F6EFE9] flex flex-col font-inter pt-[108px] md:pt-[172px]">
      <Navbar />
      <div className="flex-1 max-w-screen-xl mx-auto px-4 py-12 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-[#3C2F2A]">My Wishlist</h1>
            <p className="text-[#8B776E] mt-1">{wishlistItems.length} items</p>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#DCC8BC]/40 p-16 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-[#EFE3DA] rounded-full flex items-center justify-center mb-5 text-[#8B776E]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#3C2F2A] mb-2">Your wishlist is empty</h2>
            <p className="text-[#8B776E] mb-6">Save items you love here and come back to them later.</p>
            <Link to="/" className="bg-[#8B776E] text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-[#6E5B54] transition-all tracking-wider text-sm uppercase">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map(item => (
              <div key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EFE3DA] hover:shadow-lg transition-all group group/card relative">
                <button 
                  onClick={() => removeWishlist(item._id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm text-rose-500 hover:scale-110 hover:bg-rose-50 transition-all opacity-0 group-hover/card:opacity-100"
                  title="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Link to={`/product/${item._id}`}>
                  <div className="w-full aspect-square bg-[#EFE3DA] relative overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><svg className="w-12 h-12 text-[#8B776E]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1 line-clamp-1">{item.category}</p>
                  <Link to={`/product/${item._id}`}>
                    <h3 className="font-semibold text-sm text-[#3C2F2A] leading-snug line-clamp-2 min-h-[2.5em] mb-2 hover:text-[#8B776E]">{item.name}</h3>
                  </Link>
                  <div className="font-bold text-[#3C2F2A] text-sm mb-4">₹{item.price.toLocaleString('en-IN')}</div>
                  <button 
                    onClick={() => addToCart(item, 1)}
                    className="w-full bg-[#F6EFE9] text-[#8B776E] hover:bg-[#8B776E] hover:text-white font-bold py-2.5 rounded-xl border border-[#DCC8BC]/50 transition-colors uppercase tracking-widest text-[10px]"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
