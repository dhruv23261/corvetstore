import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const statusColors = {
  Processing: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Shipped: 'bg-blue-50 text-blue-700 border-blue-200',
  Delivered: 'bg-green-50 text-green-700 border-green-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) { console.error(err); }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-semibold text-[#5C3D42]">Orders</h1>
        <p className="text-sm text-[#D4868C] mt-1">{orders.length} orders</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-6 animate-pulse">
          {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-[#FFF0EC] rounded-xl mb-3" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="font-playfair text-lg font-semibold text-[#5C3D42] mb-1">No orders yet</h3>
          <p className="text-sm text-[#D4868C]">Orders will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F2C4C8]/20 bg-[#FFF8F6]/50">
                  <th className="text-left px-6 py-4 text-[#D4868C] font-medium">Order</th>
                  <th className="text-left px-6 py-4 text-[#D4868C] font-medium">Customer</th>
                  <th className="text-left px-6 py-4 text-[#D4868C] font-medium">Total</th>
                  <th className="text-left px-6 py-4 text-[#D4868C] font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-[#D4868C] font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-[#F2C4C8]/15 last:border-0 hover:bg-[#FFF8F6]/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#5C3D42]">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-[#5C3D42]">{order.customer?.name}</td>
                    <td className="px-6 py-4 text-[#5C3D42] font-medium">₹{order.total?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${statusColors[order.status] || ''}`}>
                        {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-[#D4868C]">{formatDate(order.createdAt)}</td>
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
