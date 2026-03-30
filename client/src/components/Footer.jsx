import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#F6EFE9] text-[#3C2F2A] pt-10 pb-24 md:pb-10 px-6 border-t border-[#DCC8BC]/60">
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-playfair font-bold text-lg text-[#3C2F2A] uppercase tracking-wider">Cavort Store</span>
        </div>
        <p className="text-sm text-[#6A5A53] leading-relaxed max-w-xs">
          Everyday moments, beautifully curated. Premium lifestyle products delivered to your door.
        </p>
        <div className="flex gap-3 mt-5">
          {['instagram', 'facebook'].map(s => (
            <a key={s} href="#" className="w-9 h-9 rounded-full border border-[#8B776E]/30 flex items-center justify-center hover:bg-[#8B776E] transition-all text-[#8B776E] hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {s === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>}
                {s === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-playfair font-bold text-base mb-4 text-[#3C2F2A] uppercase tracking-widest text-[12px]">Quick Links</h4>
        <ul className="space-y-2.5">
          <li><Link to="/" className="text-sm text-[#6A5A53] hover:text-[#8B776E] transition-colors font-medium">Home</Link></li>
          <li><Link to="/#categories" className="text-sm text-[#6A5A53] hover:text-[#8B776E] transition-colors font-medium">Shop by Category</Link></li>
          <li><Link to="/wishlist" className="text-sm text-[#6A5A53] hover:text-[#8B776E] transition-colors font-medium">My Wishlist</Link></li>
          <li><Link to={localStorage.getItem('user_token') ? '/profile' : '/login'} className="text-sm text-[#6A5A53] hover:text-[#8B776E] transition-colors font-medium">My Account</Link></li>
          <li><Link to="/checkout" className="text-sm text-[#6A5A53] hover:text-[#8B776E] transition-colors font-medium">Checkout</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-playfair font-bold text-base mb-4 text-[#3C2F2A] uppercase tracking-widest text-[12px]">Connect</h4>
        <ul className="space-y-3 text-sm text-[#6A5A53] font-medium">
          <li className="flex gap-2 items-center">
            <svg className="w-4 h-4 flex-shrink-0 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
            indiaonlinestore20@gmail.com
          </li>
          <li className="flex gap-2 items-center">
            <svg className="w-4 h-4 flex-shrink-0 opacity-60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            8860-8860-04
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-12 pt-6 border-t border-[#DCC8BC]/70 text-center text-xs text-[#6A5A53]/70">
      © {new Date().getFullYear()} Cavort. All rights reserved. Made with ❤️
    </div>
  </footer>
);

export default Footer;
