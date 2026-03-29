import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    api.get('/hero').then(r => setSlides(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  if (loading) {
    return (
      <div className="relative w-full bg-gradient-to-br from-[#E7D6CB] via-[#EFE3DA] to-[#F6EFE9] animate-pulse"
        style={{ minHeight: '320px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#8B776E]/40 border-t-[#8B776E] rounded-full animate-spin" />
        </div>
      </div>
    );
  }
  if (!slides.length) return null;

  const slide = slides[current];

  const currentUrl = isMobile && slide.mobileImageUrl ? slide.mobileImageUrl : slide.imageUrl;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: isMobile ? '70vh' : '540px',
        backgroundImage: currentUrl ? `url(${currentUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center' : 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Hide overlay gradient/text on mobile if using the custom mobile image (since it already has text) */}
      {!isMobile && <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />}

      {/* Content */}
      <div className={`relative z-10 flex flex-col justify-center h-full ${isMobile ? 'items-center text-center pt-24 min-h-[70vh]' : 'items-end text-right min-h-[500px] px-10 md:px-24'}`}>
        {(!isMobile || !slide.mobileImageUrl) && (
          <div className={`${isMobile ? 'max-w-xs' : 'max-w-xl'} flex flex-col ${isMobile ? 'items-center' : 'items-end'}`}>
            <h1
              className="font-playfair font-bold text-white leading-tight mb-2"
              style={{ fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 8vw, 4.5rem)', textShadow: '0 2px 20px rgba(0,0,0,0.3)', animation: 'fadeSlideUp 0.4s ease both' }}
            >
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p
                className="font-cursive text-white mb-6"
                style={{ fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 5vw, 2.5rem)', animation: 'fadeSlideUp 0.55s ease both', textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}
              >
                {slide.subtitle}
              </p>
            )}
            <button 
              onClick={() => alert(`Redirecting to ${slide.title} collection...`)}
              className="bg-white/40 backdrop-blur-md hover:bg-white/60 text-white font-inter font-bold text-sm tracking-[0.1em] uppercase px-8 py-2.5 shadow-sm transition-all duration-200 active:scale-95">
              {slide.cta || 'SHOP NOW'}
            </button>
          </div>
        )}
      </div>

      {/* Dots + pause */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/45 hover:bg-white/70'}`} />
        ))}
        <button onClick={() => setPaused(p => !p)} className="ml-1.5 text-white/60 hover:text-white">
          {paused
            ? <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            : <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>}
        </button>
      </div>

      {/* Left/Right arrows */}
      {slides.length > 1 && (
        <>
          <button onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/25 hover:bg-white/60 backdrop-blur rounded-full flex items-center justify-center text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={() => setCurrent(c => (c + 1) % slides.length)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/25 hover:bg-white/60 backdrop-blur rounded-full flex items-center justify-center text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
