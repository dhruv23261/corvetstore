import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
  const navigate = useNavigate();
  const rawData = localStorage.getItem('user_data');
  const user = rawData ? JSON.parse(rawData) : null;

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6EFE9] flex flex-col font-inter pt-[108px] md:pt-[172px]">
      <Navbar />
      <div className="flex-1 max-w-screen-xl mx-auto px-4 py-12 w-full">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-[#DCC8BC]/40 p-10">
          <div className="flex items-center gap-6 mb-10 border-b border-[#DCC8BC]/30 pb-10">
            <div className="w-24 h-24 rounded-full bg-[#EFE3DA] text-[#8B776E] text-4xl font-playfair font-bold flex items-center justify-center shadow-lg shadow-[#DCC8BC]/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-[#3C2F2A] mb-1">
                {user.name}
              </h1>
              <p className="text-[#6A5A53]">{user.email}</p>
              <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-200">
                Verified Customer
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-playfair font-bold text-[#3C2F2A]">Account Information</h2>
            <div className="grid grid-cols-2 gap-6 bg-[#F6EFE9]/50 p-6 rounded-2xl border border-[#DCC8BC]/20">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8B776E] font-bold mb-1">Full Name</p>
                <p className="text-[#3C2F2A] font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8B776E] font-bold mb-1">Email Address</p>
                <p className="text-[#3C2F2A] font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8B776E] font-bold mb-1">Mobile Number</p>
                <p className="text-[#3C2F2A] font-medium">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8B776E] font-bold mb-1">Account Status</p>
                <p className="text-[#3C2F2A] font-medium">Active & Verified</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#DCC8BC]/30 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm tracking-wide rounded-xl transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
