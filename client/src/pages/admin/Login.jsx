import React, { useState } from 'react';
import api from '../../utils/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginWithEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Fill in all fields');
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/admin-login', { email, password });
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.admin));
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };


  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#DCC8BC]/70 bg-[#F6EFE9]/60
    text-[#3C2F2A] placeholder:text-[#6A5A53]/55 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#DCC8BC] focus:border-transparent transition-all`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6EFE9] via-[#EFE3DA] to-[#E7D6CB]/55 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-white mx-auto flex items-center justify-center mb-4 shadow-lg shadow-[#DCC8BC]/55">
            <span className="font-playfair font-bold text-3xl text-[#8B776E]">C</span>
          </div>
          <h1 className="font-playfair text-3xl font-semibold text-[#3C2F2A]">Cavort Admin</h1>
          <p className="text-[#8B776E] text-sm mt-2">Sign in to manage your store</p>
        </div>

        <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl shadow-[#DCC8BC]/35 border border-[#DCC8BC]/60 p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 text-red-600 text-sm border border-red-100">{error}</div>
          )}


          <form onSubmit={loginWithEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Email</label>
              <input id="email" type="email" placeholder="admin@corvet.com" value={email}
                onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Password</label>
              <input id="password" type="password" placeholder="Enter password" value={password}
                onChange={(e) => setPassword(e.target.value)} className={inputClass} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-2xl bg-[#8B776E] text-white text-sm font-semibold
                hover:bg-[#6E5B54] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#8B776E]/20">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
