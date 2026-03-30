import React, { useState, useEffect } from 'react';
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
    state: '',
    pincode: '',
    paymentMethod: 'prepaid' // Default to prepaid
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6EFE9] flex flex-col pt-20 items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-10 h-10 text-[#8B776E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h2 className="text-2xl font-playfair font-bold text-[#3C2F2A] mb-4">Your bag is empty</h2>
        <p className="text-[#8B776E] mb-8 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet. Let's find something stunning for you!</p>
        <Link to="/" className="bg-[#8B776E] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#6E5B54] transition-all shadow-lg hover:shadow-xl active:scale-95">Start Shopping</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Placeholder logic for Easebuzz
    if (formData.paymentMethod === 'prepaid') {
      console.log('Initiating Easebuzz payment gate...');
    }

    // Simulate order processing
    setTimeout(() => {
      alert(`Order Placed Successfully via ${formData.paymentMethod.toUpperCase()}! \nOrder Details sent to ${formData.email || 'your phone'}.\nOrder ID: #CV${Math.floor(Math.random() * 90000) + 10000}`);
      localStorage.removeItem('cart');
      window.location.href = '/';
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F6EFE9] font-inter text-[#3C2F2A] pt-[108px] md:pt-[172px]">
      <Navbar />
      
      <main className="max-w-screen-xl mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto space-y-6">
            <section className="bg-white rounded-3xl p-8 md:p-10 border border-[#DCC8BC]/30 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B776E]" />
              
              <div className="flex items-center gap-3 mb-8 pb-5 border-b border-[#F6EFE9]">
                <div className="w-8 h-8 rounded-full bg-[#8B776E]/10 flex items-center justify-center text-[#8B776E] font-bold text-xs">01</div>
                <h2 className="font-playfair text-xl font-bold">Shipping Information</h2>
              </div>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#F6EFE9]/30 border border-[#DCC8BC]/40 rounded-xl px-4 py-3.5 text-xs focus:bg-white focus:border-[#8B776E] outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#F6EFE9]/30 border border-[#DCC8BC]/40 rounded-xl px-4 py-3.5 text-xs focus:bg-white focus:border-[#8B776E] outline-none transition-all" placeholder="+91..." />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F6EFE9]/30 border border-[#DCC8BC]/40 rounded-xl px-4 py-3.5 text-xs focus:bg-white focus:border-[#8B776E] outline-none transition-all" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-2 ml-1">Address Detail</label>
                  <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#F6EFE9]/30 border border-[#DCC8BC]/40 rounded-xl px-4 py-3.5 text-xs focus:bg-white focus:border-[#8B776E] outline-none transition-all" placeholder="House no, Street name..." />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-2 ml-1">City</label>
                    <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#F6EFE9]/30 border border-[#DCC8BC]/40 rounded-xl px-4 py-3.5 text-xs focus:bg-white focus:border-[#8B776E] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-2 ml-1">State</label>
                    <input type="text" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-[#F6EFE9]/30 border border-[#DCC8BC]/40 rounded-xl px-4 py-3.5 text-xs focus:bg-white focus:border-[#8B776E] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-[#8B776E] uppercase tracking-widest mb-2 ml-1">Pincode</label>
                    <input type="text" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-[#F6EFE9]/30 border border-[#DCC8BC]/40 rounded-xl px-4 py-3.5 text-xs focus:bg-white focus:border-[#8B776E] outline-none transition-all" />
                  </div>
                </div>
              </form>
            </section>

            <section className="bg-white rounded-3xl p-8 md:p-10 border border-[#DCC8BC]/30 shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-5 border-b border-[#F6EFE9]">
                <div className="w-8 h-8 rounded-full bg-[#8B776E]/10 flex items-center justify-center text-[#8B776E] font-bold text-xs">02</div>
                <h2 className="font-playfair text-xl font-bold">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <button 
                  onClick={() => setFormData({...formData, paymentMethod: 'prepaid'})}
                  className={`flex flex-col p-6 rounded-2xl border-2 transition-all group ${formData.paymentMethod === 'prepaid' ? 'border-[#8B776E] bg-[#F6EFE9]/20' : 'border-[#F6EFE9] bg-white hover:border-[#DCC8BC]/30'}`}
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.paymentMethod === 'prepaid' ? 'border-[#8B776E]' : 'border-[#DCC8BC]'}`}>
                       {formData.paymentMethod === 'prepaid' && <div className="w-2.5 h-2.5 rounded-full bg-[#8B776E]" />}
                    </div>
                    <span className="bg-[#8B776E] text-white text-[8px] font-bold uppercase px-2 py-1 rounded">Save 5%</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#3C2F2A] mb-1">Pay Online</h4>
                  <p className="text-[10px] text-[#8B776E] leading-tight">Cards, UPI, Netbanking.</p>
                </button>

                <button 
                  onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                  className={`flex flex-col p-6 rounded-2xl border-2 transition-all group ${formData.paymentMethod === 'cod' ? 'border-[#8B776E] bg-[#F6EFE9]/20' : 'border-[#F6EFE9] bg-white hover:border-[#DCC8BC]/30'}`}
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.paymentMethod === 'cod' ? 'border-[#8B776E]' : 'border-[#DCC8BC]'}`}>
                       {formData.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#8B776E]" />}
                    </div>
                    <span className="text-[8px] text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded">+ Rs. 50</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#3C2F2A] mb-1">Cash on Delivery</h4>
                  <p className="text-[10px] text-[#8B776E] leading-tight">Pay at your doorstep.</p>
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-[#F6EFE9]">
                <div className="flex justify-between items-baseline mb-8">
                   <div>
                     <p className="text-[10px] font-bold text-[#8B776E] uppercase tracking-widest">Grand Total</p>
                     <p className="text-[9px] text-[#8B776E]/60">Taxes included</p>
                   </div>
                   <div className="text-right">
                     <span className="text-3xl md:text-4xl font-playfair font-bold text-[#3C2F2A]">
                       Rs. {(cartTotal + (formData.paymentMethod === 'cod' ? 50 : -Math.round(cartTotal * 0.05))).toLocaleString('en-IN')}
                     </span>
                   </div>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-[10px] disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Order...' : `Place ${formData.paymentMethod.toUpperCase()} Order`}
                </button>
              </div>
            </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
