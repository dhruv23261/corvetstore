import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/customers')
      .then(({ data }) => setCustomers(data))
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-semibold text-[#3C2F2A]">Customers</h1>
        <p className="text-sm text-[#8B776E] mt-1">{customers.length} customers</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-6 animate-pulse">
          {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-[#EFE3DA] rounded-xl mb-3" />)}
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="font-playfair text-lg font-semibold text-[#3C2F2A] mb-1">No customers yet</h3>
          <p className="text-sm text-[#8B776E]">Customers will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DCC8BC]/60 bg-[#F6EFE9]/60">
                  <th className="text-left px-6 py-4 text-[#6E5B54] font-medium">Name</th>
                  <th className="text-left px-6 py-4 text-[#6E5B54] font-medium">Phone</th>
                  <th className="text-left px-6 py-4 text-[#6E5B54] font-medium">Orders</th>
                  <th className="text-left px-6 py-4 text-[#6E5B54] font-medium">Total Spent</th>
                  <th className="text-left px-6 py-4 text-[#6E5B54] font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c._id} className="border-b border-[#DCC8BC]/50 last:border-0 hover:bg-[#F6EFE9]/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#EFE3DA] flex items-center justify-center text-[#8B776E] font-semibold text-sm">
                          {c.name?.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium text-[#3C2F2A]">{c.name}</span>
                          {c.email && <p className="text-xs text-[#6A5A53]">{c.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6A5A53]">{c.phone}</td>
                    <td className="px-6 py-4 text-[#3C2F2A]">{c.totalOrders}</td>
                    <td className="px-6 py-4 text-[#3C2F2A] font-medium">₹{c.totalSpent?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-[#6A5A53]">{formatDate(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
