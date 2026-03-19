import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/dashboard/stats'),
      api.get('/dashboard/recent-activity'),
    ]).then(([s, a]) => {
      setStats(s.data);
      setActivity(a.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Total Products', value: stats.totalProducts, icon: '📦' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '🛒' },
    { label: 'Revenue', value: `₹${stats.revenue?.toLocaleString()}`, icon: '💰' },
    { label: 'Customers', value: stats.totalCustomers, icon: '👥' },
  ] : [];

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-playfair text-2xl font-semibold text-[#3C2F2A]">Dashboard</h1>
        <p className="text-sm text-[#8B776E] mt-1">Overview of your store</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#DCC8BC]/60 p-6 animate-pulse">
              <div className="w-12 h-12 bg-[#EFE3DA] rounded-2xl mb-4" />
              <div className="h-7 bg-[#EFE3DA] rounded-xl w-20 mb-2" />
              <div className="h-4 bg-[#EFE3DA] rounded-lg w-28" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {cards.map((card) => (
            <div key={card.label}
              className="bg-white rounded-2xl border border-[#DCC8BC]/60 p-6 shadow-sm
                hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <div className="text-3xl mb-3">{card.icon}</div>
              <p className="text-2xl font-bold text-[#3C2F2A]">{card.value}</p>
              <p className="text-sm text-[#8B776E] mt-1">{card.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#DCC8BC]/60 p-6 shadow-sm">
        <h2 className="font-playfair text-lg font-semibold text-[#3C2F2A] mb-4">Recent Activity</h2>
        {activity.length === 0 ? (
          <p className="text-sm text-[#8B776E] py-4 text-center">No recent activity</p>
        ) : (
          <div className="space-y-1">
            {activity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#DCC8BC]/50 last:border-0">
                <p className="text-sm text-[#3C2F2A]">{item.text}</p>
                <span className="text-xs text-[#6A5A53] whitespace-nowrap ml-4">{timeAgo(item.time)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
