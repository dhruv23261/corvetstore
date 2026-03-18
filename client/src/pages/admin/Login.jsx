import React, { useState } from 'react';
import api from '../../utils/api';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginWithEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Fill in all fields');
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.admin));
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (phone.length < 10) return setError('Enter a valid phone number');
    setLoading(true); setError('');
    try {
      await api.post('/auth/send-otp', { phone });
      setMode('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 4) return setError('Enter the OTP');
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/verify-otp', { phone, otp });
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.admin));
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#F2C4C8]/60 bg-[#FFF8F6]/50
    text-[#5C3D42] placeholder:text-[#D4868C]/35 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#F2C4C8] focus:border-transparent transition-all`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F6] via-[#FFF0EC] to-[#F2C4C8]/40 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-white mx-auto flex items-center justify-center mb-4 shadow-lg shadow-[#F2C4C8]/40">
            <span className="font-playfair font-bold text-3xl text-[#D4868C]">A</span>
          </div>
          <h1 className="font-playfair text-3xl font-semibold text-[#5C3D42]">Aren Admin</h1>
          <p className="text-[#D4868C] text-sm mt-2">Sign in to manage your store</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-[#F2C4C8]/20 border border-[#F2C4C8]/20 p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 text-red-600 text-sm border border-red-100">{error}</div>
          )}

          {mode !== 'otp' && (
            <div className="flex bg-[#FFF8F6] rounded-2xl p-1 mb-6">
              <button onClick={() => { setMode('email'); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${mode === 'email' ? 'bg-white text-[#5C3D42] shadow-sm' : 'text-[#D4868C]'}`}>
                Email
              </button>
              <button onClick={() => { setMode('phone'); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all ${mode === 'phone' ? 'bg-white text-[#5C3D42] shadow-sm' : 'text-[#D4868C]'}`}>
                Phone OTP
              </button>
            </div>
          )}

          {mode === 'email' && (
            <form onSubmit={loginWithEmail} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Email</label>
                <input id="email" type="email" placeholder="admin@arenstore.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Password</label>
                <input id="password" type="password" placeholder="Enter password" value={password}
                  onChange={(e) => setPassword(e.target.value)} className={inputClass} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-2xl bg-[#D4868C] text-white text-sm font-semibold
                  hover:bg-[#B86B72] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#D4868C]/20">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {mode === 'phone' && (
            <form onSubmit={sendOtp} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Phone Number</label>
                <input id="phone" type="tel" placeholder="+91 98765 43210" value={phone}
                  onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-2xl bg-[#D4868C] text-white text-sm font-semibold
                  hover:bg-[#B86B72] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#D4868C]/20">
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {mode === 'otp' && (
            <form onSubmit={verifyOtp} className="space-y-4">
              <p className="text-sm text-[#D4868C]">OTP sent to <span className="font-semibold text-[#5C3D42]">{phone}</span></p>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Enter OTP</label>
                <input id="otp" type="text" placeholder="1234" value={otp}
                  onChange={(e) => setOtp(e.target.value)} maxLength={6}
                  className={`${inputClass} tracking-[0.5em] text-center text-lg`} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-2xl bg-[#D4868C] text-white text-sm font-semibold
                  hover:bg-[#B86B72] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#D4868C]/20">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button type="button" onClick={() => { setMode('phone'); setOtp(''); setError(''); }}
                className="w-full py-2 text-sm text-[#D4868C] hover:text-[#5C3D42] transition-colors">
                Change phone number
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-[#D4868C]/50 mt-6">
          OTP is logged to server console for testing
        </p>
      </div>
    </div>
  );
}
