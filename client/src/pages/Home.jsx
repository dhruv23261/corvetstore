import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Home = () => {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/health');
        // Handle both simple string and JSON responses for robustness
        setStatus(typeof response.data === 'string' ? response.data : response.data.message || 'Connected successfully');
      } catch (error) {
        setStatus('Backend not connected');
      }
    };
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
          AREN STORE
        </h1>
        <p className="text-gray-500 mb-8 font-medium">Welcome to the full-stack architecture.</p>
        
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">System Status</p>
          <div className="flex items-center justify-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.includes('not connected') ? 'bg-red-400' : (status === 'Loading...' ? 'bg-yellow-400' : 'bg-emerald-400')}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${status.includes('not connected') ? 'bg-red-500' : (status === 'Loading...' ? 'bg-yellow-500' : 'bg-emerald-500')}`}></span>
            </span>
            <span className="font-semibold text-slate-700">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
