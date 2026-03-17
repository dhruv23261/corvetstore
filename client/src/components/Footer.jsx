import React from 'react';

const Footer = () => (
  <footer className="bg-[#3d2b1f] text-[#f5ede0] pt-12 pb-24 md:pb-12 px-6">
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-7 h-7 text-[#c9a97a]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L22.25 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
          </svg>
          <span className="font-playfair font-bold text-lg text-[#f5ede0]"><span className="text-xl">A</span>REN STORE</span>
        </div>
        <p className="text-sm text-[#c9a97a] leading-relaxed">
          Everyday moments, beautifully curated. Premium lifestyle products delivered to your door.
        </p>
        <div className="flex gap-3 mt-4">
          {['instagram', 'facebook', 'youtube'].map(s => (
            <a key={s} href="#" className="w-8 h-8 rounded-full border border-[#7a5c2e] flex items-center justify-center hover:bg-[#7a5c2e] transition text-[#c9a97a] hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {s === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>}
                {s === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
                {s === 'youtube' && <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>}
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-playfair font-bold text-base mb-4 text-[#f5ede0]">Quick Links</h4>
        <ul className="space-y-2">
          {['Home', 'All Products', 'New Arrivals', 'Bestsellers', 'Gifting', 'About Us'].map(l => (
            <li key={l}><a href="#" className="text-sm text-[#c9a97a] hover:text-white transition">{l}</a></li>
          ))}
        </ul>
      </div>

      {/* Customer Care */}
      <div>
        <h4 className="font-playfair font-bold text-base mb-4 text-[#f5ede0]">Customer Care</h4>
        <ul className="space-y-2">
          {['My Account', 'Track Order', 'Returns & Refunds', 'FAQs', 'Privacy Policy', 'Terms & Conditions'].map(l => (
            <li key={l}><a href="#" className="text-sm text-[#c9a97a] hover:text-white transition">{l}</a></li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-playfair font-bold text-base mb-4 text-[#f5ede0]">Contact Us</h4>
        <ul className="space-y-3 text-sm text-[#c9a97a]">
          <li className="flex gap-2 items-start">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
            arenstore@gmail.com
          </li>
          <li className="flex gap-2 items-start">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            +91 98765 43210
          </li>
        </ul>

        {/* Newsletter */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-[#f5ede0] mb-2 uppercase tracking-wider">Newsletter</p>
          <div className="flex">
            <input
              className="flex-1 bg-[#2a1e15] border border-[#7a5c2e] text-[#f5ede0] text-xs px-3 py-2 rounded-l-full outline-none placeholder-[#7a5c2e] focus:border-[#c9a97a]"
              placeholder="Your email..."
            />
            <button className="bg-[#7a5c2e] hover:bg-[#c9a97a] text-white text-xs font-bold px-4 py-2 rounded-r-full transition">
              Go
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-10 pt-6 border-t border-[#7a5c2e]/40 text-center text-xs text-[#7a5c2e]">
      © {new Date().getFullYear()} ArenStore. All rights reserved. Made with ❤️
    </div>
  </footer>
);

export default Footer;
