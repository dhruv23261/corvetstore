import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, title: 'Your Daily Hydration Partner', subtitle: '', cta: 'SHOP NOW', image: '/hero1.png', bg: 'from-[#F2C4C8] via-[#FFF0EC] to-[#FFF8F6]' },
  { id: 2, title: 'Flip it, Sip it', subtitle: 'Your Way', cta: 'SHOP NOW', image: '/hero2.png', bg: 'from-[#FFF0EC] via-[#F2C4C8] to-[#FFF8F6]' },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = slides[current];

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`}
      style={{ minHeight: '500px', backgroundImage: slide.image ? `url(${slide.image})` : 'none',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      {slide.image && <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent transition-all duration-700" />}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-start h-full min-h-[500px] px-6 md:px-20 max-w-screen-xl mx-auto">
        <div className="text-center md:text-left w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-white drop-shadow-md py-20 md:py-16">
          <h1 key={slide.id + 'title'} className="font-playfair text-4xl md:text-[3.5rem] font-bold leading-tight mb-3"
            style={{ animation: 'fadeInUp 0.5s ease', textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p key={slide.id + 'sub'} className="font-playfair italic text-2xl md:text-3xl mb-10"
              style={{ animation: 'fadeInUp 0.6s ease', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              {slide.subtitle}
            </p>
          )}
          {!slide.subtitle && <div className="mb-10" />}
          <button className="bg-white/95 hover:bg-white text-[#D4868C] font-inter font-bold text-sm px-10 py-3.5 rounded-full
            active:scale-95 transition-all duration-200 shadow-xl shadow-black/10 backdrop-blur-sm tracking-wider uppercase hover:shadow-2xl">
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${idx === current ? 'w-7 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'}`} />
        ))}
        <button onClick={() => setPaused(p => !p)} className="ml-2 text-white/60 hover:text-white transition drop-shadow-md">
          {paused
            ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>}
        </button>
      </div>

      {/* Arrows */}
      <button onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/70 text-white hover:text-[#5C3D42] backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg transition-all">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
      </button>
      <button onClick={() => setCurrent(c => (c + 1) % slides.length)}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/70 text-white hover:text-[#5C3D42] backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg transition-all">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </button>

      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default HeroSlider;
