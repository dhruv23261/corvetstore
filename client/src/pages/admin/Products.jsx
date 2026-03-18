import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getImageByIndex } from '../../data/imageLinks';

const categories = ['Bottles', 'Tumblers', 'Candles', 'Gifting', 'Accessories'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: categories[0], imageUrl: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try { const { data } = await api.get('/products'); setProducts(data); }
    catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, price: parseFloat(form.price), imageUrl: form.imageUrl || getImageByIndex(products.length) };
      await api.post('/products', payload);
      setForm({ name: '', price: '', category: categories[0], imageUrl: '' });
      setShowForm(false); fetchProducts();
    } catch (err) { console.error('Failed to add product', err); }
    finally { setSaving(false); }
  };

  const deleteProduct = async (id) => {
    try { await api.delete(`/products/${id}`); fetchProducts(); }
    catch (err) { console.error('Failed to delete', err); }
  };

  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#F2C4C8]/40 bg-[#FFF8F6]/50
    text-[#5C3D42] placeholder:text-[#D4868C]/35 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#F2C4C8] focus:border-transparent transition-all`;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-semibold text-[#5C3D42]">Products</h1>
          <p className="text-sm text-[#D4868C] mt-1">{products.length} products</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 rounded-2xl bg-[#D4868C] text-white text-sm font-medium
            hover:bg-[#B86B72] transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#D4868C]/20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
          </svg>
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-7 shadow-sm mb-6">
          <h2 className="font-playfair text-lg font-semibold text-[#5C3D42] mb-5">New Product</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Name</label>
              <input id="name" type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Price (₹)</label>
              <input id="price" type="number" required min="0" step="0.01" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" className={inputClass} />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Category</label>
              <select id="category" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-[#5C3D42] mb-1.5">
                Image URL <span className="text-[#D4868C]/40">(optional)</span>
              </label>
              <input id="imageUrl" type="url" value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..." className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" disabled={saving}
                className="px-6 py-3 rounded-2xl bg-[#D4868C] text-white text-sm font-medium
                  hover:bg-[#B86B72] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#D4868C]/20">
                {saving ? 'Saving...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-4 animate-pulse">
              <div className="w-full h-44 bg-[#FFF0EC] rounded-2xl mb-3" />
              <div className="h-4 bg-[#FFF0EC] rounded w-3/4 mb-2" />
              <div className="h-3 bg-[#FFF0EC] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="font-playfair text-lg font-semibold text-[#5C3D42] mb-1">No products yet</h3>
          <p className="text-sm text-[#D4868C]">Add your first product to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product._id}
              className="bg-white rounded-3xl border border-[#F2C4C8]/20 overflow-hidden shadow-sm
                hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="relative overflow-hidden">
                <img src={product.imageUrl || getImageByIndex(0)} alt={product.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                <button onClick={() => deleteProduct(product._id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500 shadow-sm"
                  aria-label={`Delete ${product.name}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4868C] text-white">{product.badge}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-[#D4868C] bg-[#FFF0EC] px-2.5 py-0.5 rounded-full">{product.category}</span>
                <h3 className="font-medium text-[#5C3D42] mt-2 text-sm">{product.name}</h3>
                <p className="text-[#D4868C] font-bold mt-1">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
