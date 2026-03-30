import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();
  const navigate = useNavigate();

  // Handle body scroll locking
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[105] overflow-hidden pointer-events-none">
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className={`absolute right-0 top-[108px] md:top-[172px] bottom-0 w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-500 pointer-events-auto border-l border-[#DCC8BC]/30 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-6 border-b border-[#F6EFE9] flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-[#3C2F2A]">Your Shopping Bag</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-[#F6EFE9] rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-[#8B776E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#DCC8BC]/50">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center pb-20">
              <div className="w-20 h-20 bg-[#F6EFE9] rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#8B776E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <p className="text-[#3C2F2A] font-bold">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-bold text-[#8B776E] mt-2 underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item._id}-${item.selectedSize}`} className="flex gap-4 group">
                <div className="w-24 h-24 bg-[#F6EFE9] rounded-xl overflow-hidden shadow-sm flex-shrink-0 p-2">
                  <img src={item.imageUrl} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="text-sm font-bold text-[#3C2F2A] mb-0.5 line-clamp-1 group-hover:text-[#8B776E] transition-colors">{item.name}</h4>
                    <p className="text-[10px] text-[#8B776E] font-bold uppercase tracking-wider mb-2">{item.selectedSize}</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-sm font-bold">Rs. {item.price.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-[#F6EFE9] rounded-md overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item._id, item.selectedSize, -1)}
                        className="px-2.5 py-1 text-sm font-bold hover:bg-[#DCC8BC]/40 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.selectedSize, 1)}
                        className="px-2.5 py-1 text-sm font-bold hover:bg-[#DCC8BC]/40 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id, item.selectedSize)}
                      className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#F6EFE9] bg-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#8B776E]">Total:</span>
              <span className="text-xl font-bold text-[#3C2F2A]">Rs. {cartTotal.toLocaleString('en-IN')}.00</span>
            </div>
            <button 
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
              className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
            >
              Checkout Bag
            </button>
            <p className="text-center text-[9px] text-[#8B776E] font-medium italic">Shipping & Taxes calculated at checkout.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
