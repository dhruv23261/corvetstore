import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('user_token', res.data.token);
      localStorage.setItem('user_data', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE9] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-[#DCC8BC]/30">
          <div className="text-center mb-10">
            <h1 className="font-playfair text-3xl font-bold text-[#3C2F2A] mb-2">Create Account</h1>
            <p className="text-[#8B776E] text-sm">Join the Corvet community today.</p>
          </div>

          {error && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-xs font-bold mb-6 border border-rose-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-xs text-[#8B776E] mt-8 font-medium">
            Already have an account? <Link to="/login" className="text-[#3C2F2A] font-bold hover:underline underline-offset-4">Login here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserRegister;
