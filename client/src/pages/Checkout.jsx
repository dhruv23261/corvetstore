import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'prepaid' // Default to prepaid
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0E7DD] flex flex-col pt-20 items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
        <Link to="/" className="bg-[#8B776E] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">Start Shopping</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      alert(`Order Placed Successfully via ${formData.paymentMethod.toUpperCase()}! \nOrder ID: #${Math.floor(Math.random() * 90000) + 10000}`);
      localStorage.removeItem('cart');
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0E7DD] font-inter text-[#3C2F2A]">
      <Navbar />
      
      <main className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left: Contact & Shipping */}
          <div className="flex-1 space-y-8">
            <section className="bg-white rounded-3xl p-6 md:p-10 border border-[#DCC8BC]/30 shadow-sm">
              <h2 className="font-playfair text-2xl font-bold mb-8">Shipping Details</h2>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none" placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Email (Optional)</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Complete Address</label>
                  <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none min-h-[100px]" placeholder="House No, Street, Landmark..." />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">City</label>
                    <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Pincode</label>
                    <input type="text" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none" placeholder="110001" />
                  </div>
                </div>
              </form>
            </section>

            <section className="bg-white rounded-3xl p-6 md:p-10 border border-[#DCC8BC]/30 shadow-sm transition-all overflow-hidden">
              <h2 className="font-playfair text-2xl font-bold mb-8">Payment Method</h2>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setFormData({...formData, paymentMethod: 'prepaid'})}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${formData.paymentMethod === 'prepaid' ? 'border-[#8B776E] bg-[#F6EFE9]/20' : 'border-[#F6EFE9] bg-white hover:border-[#DCC8BC]/40'}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'prepaid' ? 'border-[#8B776E]' : 'border-[#DCC8BC]'}`}>
                       {formData.paymentMethod === 'prepaid' && <div className="w-2.5 h-2.5 rounded-full bg-[#8B776E]" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Pay Online (Prepaid)</p>
                      <p className="text-[10px] text-[#8B776E] font-medium mt-0.5">Extra 5% discount applied automatically!</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <span className="w-8 h-4 bg-gray-100 rounded opacity-50" />
                     <span className="w-8 h-4 bg-gray-100 rounded opacity-50" />
                  </div>
                </button>

                <button 
                  onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${formData.paymentMethod === 'cod' ? 'border-[#8B776E] bg-[#F6EFE9]/20' : 'border-[#F6EFE9] bg-white hover:border-[#DCC8BC]/40'}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-[#8B776E]' : 'border-[#DCC8BC]'}`}>
                       {formData.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#8B776E]" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Cash On Delivery (COD)</p>
                      <p className="text-[10px] text-rose-500 font-medium mt-0.5">+ Rs. 50 convenience fee applies.</p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-[#8B776E]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </button>
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#DCC8BC]/30 shadow-sm sticky top-24">
              <h3 className="font-playfair text-xl font-bold text-[#3C2F2A] mb-6">Order Summary</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 scrollbar-thin scrollbar-thumb-[#DCC8BC]/50">
                {cartItems.map(item => (
                  <div key={`${item._id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-14 h-14 bg-[#F6EFE9] rounded-xl overflow-hidden p-1 flex-shrink-0">
                      <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-[#8B776E] mt-1 font-bold italic">{item.quantity} x Rs. {item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[#F6EFE9]">
                <div className="flex justify-between text-sm text-[#8B776E] font-medium">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString('en-IN')}.00</span>
                </div>
                <div className="flex justify-between text-sm text-[#8B776E] font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                {formData.paymentMethod === 'cod' && (
                  <div className="flex justify-between text-sm text-[#8B776E] font-medium">
                    <span>COD Fee</span>
                    <span>Rs. 50.00</span>
                  </div>
                )}
                {formData.paymentMethod === 'prepaid' && (
                  <div className="flex justify-between text-sm text-emerald-600 font-bold">
                    <span>Prepaid Discount (5%)</span>
                    <span>- Rs. {Math.round(cartTotal * 0.05).toLocaleString('en-IN')}.00</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-[#3C2F2A] pt-3 border-t border-[#F6EFE9]">
                  <span>Total</span>
                  <span>Rs. {(cartTotal + (formData.paymentMethod === 'cod' ? 50 : -Math.round(cartTotal * 0.05))).toLocaleString('en-IN')}.00</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white font-bold py-5 rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-[0.15em] text-xs mt-8 disabled:opacity-50"
              >
                {isProcessing ? 'Processing Order...' : `Place ${formData.paymentMethod === 'cod' ? 'COD' : 'Prepaid'} Order`}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
