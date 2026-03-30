import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';
import MobileBottomNav from '../components/MobileBottomNav';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('1000 ML');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const prodRes = await api.get(`/products/${id}`);
        setProduct(prodRes.data);
        setActiveImg(prodRes.data.imageUrl);

        // Fetch related products for "Frequently bought together"
        const allRes = await api.get('/products');
        const related = allRes.data
          .filter(p => p.category === prodRes.data.category && p._id !== id)
          .slice(0, 2);
        setRelatedProducts(related);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#F0E7DD] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#8B776E]/20 border-t-[#8B776E] rounded-full animate-spin" />
    </div>
  );

  if (!product) return <div className="p-20 text-center font-playfair text-2xl">Product not found.</div>;

  const originalPriceDisplay = product.originalPrice || Math.round(product.price * 1.3);
  const isWishlisted = isInWishlist(product._id);

  return (
    <div className="min-h-screen bg-[#F0E7DD] font-inter text-[#3C2F2A] pb-24 md:pb-0 pt-[108px] md:pt-[172px]">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumb Section */}
        <div className="bg-[#EFE3D8] rounded-xl px-4 py-3 mb-6 flex items-center gap-2 text-[11px] font-bold text-[#8B776E] uppercase tracking-widest overflow-hidden whitespace-nowrap overflow-ellipsis">
          <Link to="/" className="hover:text-[#3C2F2A]">Home</Link>
          <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          <span className="text-[#3C2F2A]">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left: Product Images */}
          <div className="lg:w-[55%] space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm aspect-square flex items-center justify-center p-4 border border-[#E9D9CC]">
              <img src={activeImg} className="max-h-full max-w-full object-contain mix-blend-multiply" alt={product.name} />
            </div>
            
            {/* Thumbnail Strip */}
            <div className="relative flex items-center justify-center gap-3">
              {[product.imageUrl, ...(product.images || [])].filter(Boolean).map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImg(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-white p-1 ${activeImg === img ? 'border-[#8B776E]' : 'border-transparent hover:border-[#DCC8BC]'}`}
                >
                  <img src={img} className="w-full h-full object-contain" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Interaction */}
          <div className="lg:w-[45%] flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl font-bold tracking-tight">Rs. {product.price.toLocaleString('en-IN')}.00</span>
              <span className="text-sm text-[#8B776E] line-through decoration-1">Rs. {originalPriceDisplay.toLocaleString('en-IN')}.00</span>
              <span className="bg-[#8B776E] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Sale</span>
            </div>
            <p className="text-[10px] text-[#8B776E] font-medium mb-6">Tax included.</p>

            <div className="space-y-6">
              {/* Size Selector */}
              <div>
                <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-[0.2em] mb-2">Size</label>
                <select 
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full md:max-w-xs bg-white border border-[#DCC8BC] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B776E] transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%238B776E\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                >
                  <option>800 ML</option>
                  <option>1000 ML</option>
                  <option>1500 ML</option>
                </select>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-[0.2em] mb-2">Quantity</label>
                <div className="flex items-center w-32 h-12 bg-white border border-[#DCC8BC] rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full flex items-center justify-center hover:bg-[#F6EFE9] transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center hover:bg-[#F6EFE9] transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <div className="flex gap-3">
                  <button 
                    onClick={() => addToCart(product, quantity, selectedSize)}
                    className="flex-1 bg-[#8B776E] hover:bg-[#6E5B54] text-white font-bold py-4 rounded-xl shadow-sm transition-all uppercase tracking-widest text-[11px]"
                  >
                    Add To Cart
                  </button>
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className={`w-14 flex items-center justify-center rounded-xl border transition-all ${isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white border-[#DCC8BC] text-[#8B776E]'}`}
                  >
                    <svg className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
                <button 
                  onClick={() => {
                    addToCart(product, quantity, selectedSize);
                    navigate('/checkout');
                  }}
                  className="w-full bg-transparent border border-[#8B776E] text-[#8B776E] hover:bg-[#8B776E] hover:text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-[11px]"
                >
                  Buy It Now
                </button>
              </div>

              {/* Frequently Bought Together */}
              {relatedProducts.length > 0 && (
                <div className="pt-8 pb-4">
                  <h3 className="text-sm font-bold opacity-60 uppercase tracking-[0.1em] mb-4">Frequently bought together</h3>
                  <div className="space-y-3">
                    {[product, ...relatedProducts].map((item, idx) => (
                      <div key={item._id} className="bg-white/80 rounded-xl p-3 flex items-center gap-4 border border-[#E9D9CC] shadow-sm">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#8B776E] focus:ring-[#8B776E]" />
                        <img src={item.imageUrl} className="w-12 h-12 object-contain bg-white rounded-lg p-1" alt="" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold line-clamp-1">{item.name}</p>
                          <div className="flex items-center gap-2">
                             <span className="text-[11px] font-bold text-[#3C2F2A]">Rs. {item.price.toLocaleString('en-IN')}.00</span>
                             <span className="text-[10px] text-[#8B776E] line-through">Rs. {(item.originalPrice || Math.round(item.price*1.3)).toLocaleString('en-IN')}.00</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        addToCart(product, quantity, selectedSize);
                        relatedProducts.forEach(rp => addToCart(rp, 1, '1000 ML'));
                      }}
                      className="w-full bg-[#8B776E]/15 hover:bg-[#8B776E]/25 text-[#3C2F2A] font-bold py-3 rounded-xl transition-all text-[11px] uppercase tracking-widest mt-2 border border-[#8B776E]/20"
                    >
                      Claim Offer • Rs. {([product, ...relatedProducts].reduce((acc, i) => acc + i.price, 0)).toLocaleString('en-IN')}.00
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <section className="mt-12 lg:mt-20">
          <h2 className="font-playfair text-2xl font-bold mb-8 flex items-center gap-4">
            Description
            <div className="flex-1 h-[1px] bg-[#DCC8BC]/40" />
          </h2>
          
          <div className="bg-white/60 rounded-3xl p-6 md:p-12 space-y-10 border border-[#DCC8BC]/20">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="text-sm md:text-base text-[#6A5A53] leading-relaxed font-medium">
                  {product.description}
                  <br /><br />
                  Stay hydrated in the cutest and most stylish way with our **Capacity Available 800ml, 1000ml {product.name}**. Designed with high attention to detail, this piece is perfect for daily use, gifting, or elevating your workspace aesthetic.
                </p>
              </div>
              <div className="md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white/50">
                 <img src={product.imageUrl} className="w-full h-full object-cover" alt="" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-[#EFE3D8]/40 p-6 rounded-2xl border border-[#DCC8BC]/30">
                  <h4 className="flex items-center gap-2 font-bold text-sm mb-3 text-[#3C2F2A]">
                    <span className="text-lg">📏</span>
                    Dimensions
                  </h4>
                  <p className="text-xs font-semibold text-[#8B776E] leading-loose">
                    • Height: 30cm <br />
                    • Width: 10.5cm <br />
                    • Weight: Lightweight
                  </p>
               </div>
               <div className="bg-[#EFE3D8]/40 p-6 rounded-2xl border border-[#DCC8BC]/30">
                  <h4 className="flex items-center gap-2 font-bold text-sm mb-3 text-[#3C2F2A]">
                    <span className="text-lg">✨</span>
                    Features
                  </h4>
                  <p className="text-xs font-semibold text-[#8B776E] leading-loose">
                    • Leak-proof lid <br />
                    • Premium insulated body <br />
                    • BPA-Free materials
                  </p>
               </div>
               <div className="bg-[#EFE3D8]/40 p-6 rounded-2xl border border-[#DCC8BC]/30">
                  <h4 className="flex items-center gap-2 font-bold text-sm mb-3 text-[#3C2F2A]">
                    <span className="text-lg">🌿</span>
                    Eco-Friendly
                  </h4>
                  <p className="text-xs font-semibold text-[#8B776E] leading-loose">
                    A smart choice for kids, teens, and adults who value sustainability and style.
                  </p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ProductPage;
