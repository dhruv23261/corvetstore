import React, { useState } from 'react';

const ProductDetailsModal = ({ product, onClose }) => {
  const [mainImg, setMainImg] = useState(product.imageUrl);
  const allImages = product.images && product.images.length > 0 ? product.images : [product.imageUrl, product.imageUrl, product.imageUrl];

  // If we have fewer than 3, pad with the main image to meet the user's "at least 3" requirement
  const displayImages = allImages.length >= 3 ? allImages : [...allImages, ...Array(3 - allImages.length).fill(product.imageUrl)];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#3C2F2A]/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-[#F6EFE9] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-[#3C2F2A] hover:bg-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Gallery Section */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-inner">
            <img src={mainImg} alt="Product" className="w-full h-full object-cover transition-all duration-500" />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2">
            {displayImages.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${mainImg === img ? 'border-[#8B776E] scale-105 shadow-md' : 'border-white hover:border-[#DCC8BC]'}`}
              >
                <img src={img} alt={`View ${i+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
          <p className="text-[#8B776E] font-bold text-xs tracking-[0.2em] mb-2 uppercase">{product.category}</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#3C2F2A] mb-4 leading-tight">{product.name}</h2>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-[#3C2F2A]">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <span className="text-[#8B776E]/60 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">In Stock</span>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <h4 className="text-[10px] font-bold text-[#3C2F2A] uppercase tracking-widest mb-1.5 opacity-60">Description</h4>
              <p className="text-sm text-[#6A5A53] leading-relaxed italic">{product.description || 'No description available for this curated item.'}</p>
            </div>
            {product.dimensions && (
              <div>
                <h4 className="text-[10px] font-bold text-[#3C2F2A] uppercase tracking-widest mb-1.5 opacity-60">Dimensions</h4>
                <p className="text-sm text-[#6A5A53]">{product.dimensions}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            <button className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm uppercase tracking-[0.15em]">
              Add to Cart
            </button>
            <button className="w-full border-2 border-[#DCC8BC] text-[#8B776E] hover:bg-[#EFE3DA] font-bold py-4 rounded-2xl transition-all text-sm uppercase tracking-[0.15em]">
              Wishlist Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
