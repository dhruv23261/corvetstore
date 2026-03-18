import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import CategoriesBar from '../components/CategoriesBar';
import HeroSlider from '../components/HeroSlider';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import ShopByVideo from '../components/ShopByVideo';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F6]">
      <AnnouncementBar />
      <Navbar cartCount={0} wishlistCount={0} />
      <CategoriesBar />
      <HeroSlider />
      <CategorySection />

      {/* Soft divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F2C4C8]/50 to-transparent mx-8" />

      <FeaturedProducts />
      <ShopByVideo />

      {/* Promo banner */}
      <section className="bg-gradient-to-r from-[#D4868C] to-[#B86B72] py-14 md:py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0aDEydi0ySDI0djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative z-10">
          <h2 className="font-playfair text-2xl md:text-4xl font-bold text-white mb-3">
            Free Shipping on Orders Above ₹499
          </h2>
          <p className="text-[#FFF0EC]/80 text-sm md:text-base mb-8 font-inter max-w-lg mx-auto">
            Shop our premium collection and enjoy complimentary delivery
          </p>
          <button className="bg-[#FFF0EC] text-[#D4868C] font-inter font-bold text-sm px-10 py-3.5 rounded-full
            hover:bg-white transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl">
            SHOP NOW
          </button>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Home;
