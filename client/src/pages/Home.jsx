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
    <div className="min-h-screen bg-[#faf6f0]">
      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Main header */}
      <Navbar cartCount={0} wishlistCount={0} />

      {/* Desktop categories nav */}
      <CategoriesBar />

      {/* Hero slider */}
      <HeroSlider />

      {/* Collection categories */}
      <CategorySection />

      {/* Divider */}
      <div className="h-px bg-[#e8d5bc] mx-4 md:mx-0" />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Shop By Video */}
      <ShopByVideo />

      {/* Promo banner */}
      <section className="bg-gradient-to-r from-[#7a5c2e] to-[#3d2b1f] py-12 px-6 text-center">
        <h2 className="font-playfair text-2xl md:text-4xl font-bold text-white mb-2">
          Free Shipping on Orders Above ₹499
        </h2>
        <p className="text-[#c9a97a] text-sm md:text-base mb-6 font-inter">
          Shop our premium collection and enjoy complimentary delivery
        </p>
        <button className="bg-white text-[#7a5c2e] font-inter font-bold text-sm px-8 py-3 rounded-full hover:bg-[#f5ede0] transition active:scale-95">
          SHOP NOW
        </button>
      </section>

      {/* Footer */}
      <Footer />

      {/* Mobile bottom nav — fixed */}
      <MobileBottomNav />
    </div>
  );
};

export default Home;
