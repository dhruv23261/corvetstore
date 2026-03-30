import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products')
      .then(r => setProducts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F6EFE9] py-10 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="h-8 bg-[#EFE3DA] rounded-xl w-56 mb-6 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-[#EFE3DA]" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-[#EFE3DA] rounded w-3/4" />
                  <div className="h-3 bg-[#EFE3DA] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (!products.length) return null;

  return (
    <section className="bg-[#F6EFE9] py-10 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#3C2F2A]">Products</h2>
            <p className="text-sm text-[#8B776E] font-inter mt-0.5">Handpicked just for you</p>
          </div>
          <a href="#" className="text-xs font-semibold text-[#8B776E] hover:text-[#3C2F2A] hover:underline underline-offset-4 transition hidden sm:block">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map(p => (
            <ProductCard 
              key={p._id} 
              product={p} 
              onClick={() => navigate(`/product/${p._id}`)} 
            />
          ))}
        </div>
        <div className="mt-8 sm:hidden flex justify-center">
          <a href="#" className="text-xs font-semibold text-[#8B776E] border border-[#8B776E] px-8 py-2.5 rounded-full hover:bg-[#8B776E] hover:text-white transition-all">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
