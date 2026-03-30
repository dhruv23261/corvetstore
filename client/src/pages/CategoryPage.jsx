import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products');
        // Filter by category name
        const filtered = res.data.filter(p => p.category === categoryName);
        setProducts(filtered);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-[#F6EFE9] flex flex-col pt-[108px] md:pt-[172px]">
      <Navbar />
      
      <main className="flex-1 max-w-screen-xl mx-auto px-4 py-8 md:py-12 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8B776E] mb-6">
          <Link to="/" className="hover:text-[#3C2F2A]">Home</Link>
          <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          <span className="text-[#3C2F2A]">{categoryName}</span>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#3C2F2A] mb-2 capitalize">
              {categoryName}
            </h1>
            <p className="text-sm text-[#8B776E] font-inter">
              Showing {products.length} elegant pieces
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#8B776E] hover:text-[#3C2F2A] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            BACK TO HOME
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-[#EFE3DA]" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-[#EFE3DA] rounded w-3/4" />
                  <div className="h-3 bg-[#EFE3DA] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-[#EFE3DA] rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
               <svg className="w-10 h-10 text-[#8B776E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <p className="text-[#3C2F2A] font-bold">No products found in this category.</p>
            <button onClick={() => navigate('/')} className="mt-4 text-[#8B776E] text-xs font-bold underline">Continue Shopping</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {products.map(p => (
              <ProductCard 
                key={p._id} 
                product={p} 
                onClick={() => navigate(`/product/${p._id}`)} 
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default CategoryPage;
