import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/verify-otp', { email: formData.email, otp });
      localStorage.setItem('user_token', res.data.token);
      localStorage.setItem('user_data', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE9] flex flex-col pt-[108px] md:pt-[172px]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-[#DCC8BC]/30">
          <div className="text-center mb-10">
            <h1 className="font-playfair text-3xl font-bold text-[#3C2F2A] mb-2">{step === 1 ? 'Create Account' : 'Verify Email'}</h1>
            <p className="text-[#8B776E] text-sm">
              {step === 1 ? 'Join the Cavort community today.' : `We sent an OTP to ${formData.email}.`}
            </p>
          </div>

          {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-xs font-bold mb-6 border border-rose-100">{error}</div>}

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none transition-all"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#8B776E] outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 text-sm uppercase tracking-widest disabled:opacity-50 mt-4"
              >
                {loading ? 'Sending OTP...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-[#8B776E] uppercase tracking-widest mb-1.5 ml-1">6-Digit OTP</label>
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  className="w-full text-center tracking-[0.5em] font-medium bg-[#F6EFE9]/50 border border-[#DCC8BC]/40 rounded-xl px-4 py-3 text-lg focus:bg-white focus:border-[#8B776E] outline-none transition-all"
                  placeholder="------"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B776E] hover:bg-[#6E5B54] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 text-sm uppercase tracking-widest disabled:opacity-50 mt-4"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
              <p className="text-center mt-4">
                <button type="button" onClick={() => setStep(1)} className="text-xs text-[#8B776E] underline-offset-4 hover:underline">
                  Back to Registration
                </button>
              </p>
            </form>
          )}

          {step === 1 && (
            <p className="text-center text-xs text-[#8B776E] mt-8 font-medium">
              Already have an account? <Link to="/login" className="text-[#3C2F2A] font-bold hover:underline underline-offset-4">Login here</Link>
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserRegister;
