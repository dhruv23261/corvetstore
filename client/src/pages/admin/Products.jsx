import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getImageByIndex } from '../../data/imageLinks';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', originalPrice: '', category: '', imageUrl: '', sequence: 0, badge: '', description: '', dimensions: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { 
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
      if (data.length > 0 && !form.category) {
        setForm(prev => ({ ...prev, category: data[0].name }));
      }
    } catch { setCategories([]); }
  };

  const fetchProducts = async () => {
    try { const { data } = await api.get('/products'); setProducts(data); }
    catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { 
        ...form, 
        price: parseFloat(form.price), 
        originalPrice: parseFloat(form.originalPrice) || 0,
        sequence: parseInt(form.sequence) || 0 
      };
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post('/products', payload);
      }
      resetForm(); fetchProducts();
    } catch (err) { console.error('Failed to save product', err); }
    finally { setSaving(false); }
  };

  const handleEdit = (p) => {
    setForm({ 
      name: p.name, 
      price: p.price, 
      originalPrice: p.originalPrice || '',
      category: p.category, 
      imageUrl: p.imageUrl, 
      sequence: p.sequence || 0, 
      badge: p.badge || '',
      description: p.description || '',
      dimensions: p.dimensions || ''
    });
    setEditingId(p._id); setShowModal(true);
  };

  const resetForm = () => {
    setForm({ name: '', price: '', originalPrice: '', category: categories[0]?.name || '', imageUrl: '', sequence: 0, badge: '', description: '', dimensions: '' });
    setEditingId(null); setShowModal(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, imageUrl: data.imageUrl });
    } catch (err) { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  const deleteProduct = async (id) => {
    try { await api.delete(`/products/${id}`); fetchProducts(); }
    catch (err) { console.error('Failed to delete', err); }
  };

  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#DCC8BC]/70 bg-[#F6EFE9]/60
    text-[#3C2F2A] placeholder:text-[#6A5A53]/55 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#DCC8BC] focus:border-transparent transition-all`;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-semibold text-[#3C2F2A]">Products</h1>
          <p className="text-sm text-[#8B776E] mt-1">{products.length} products</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-[#8B776E] text-white text-sm font-medium
            hover:bg-[#6E5B54] transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#8B776E]/20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* --- Modal Form --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={resetForm} />
          <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-scale-up max-h-[90vh] flex flex-col">
            <div className="px-8 py-6 border-b border-[#DCC8BC]/60 flex items-center justify-between sticky top-0 bg-white z-20">
              <h2 className="font-playfair text-xl font-semibold text-[#3C2F2A]">{editingId ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={resetForm} className="p-2 rounded-xl hover:bg-[#F6EFE9] transition-colors">
                <svg className="w-5 h-5 text-[#8B776E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Product Name</label>
                  <input id="name" type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="price" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Price (₹)</label>
                  <input id="price" type="number" required min="0" step="0.01" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="originalPrice" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Original Price (₹)</label>
                  <input id="originalPrice" type="number" min="0" step="0.01" value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="0.00" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="category" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Category</label>
                  <select id="category" value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass} required>
                    {categories.length === 0 && <option value="">No categories found</option>}
                    {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="badge" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Badge</label>
                  <input id="badge" type="text" value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Bestseller, New, etc" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="sequence" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Sequence</label>
                  <input id="sequence" type="number" value={form.sequence}
                    onChange={(e) => setForm({ ...form, sequence: e.target.value })} placeholder="0" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="dimensions" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Dimensions</label>
                  <input id="dimensions" type="text" value={form.dimensions}
                    onChange={(e) => setForm({ ...form, dimensions: e.target.value })} placeholder="12x8x4 inches" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Description</label>
                  <textarea id="description" rows={3} value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell us more about this product..." className={`${inputClass} resize-none mb-2`} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#8B776E] uppercase tracking-wider mb-2">Image</label>
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#EFE3DA]/30 border border-[#DCC8BC] overflow-hidden flex items-center justify-center shrink-0">
                      {form.imageUrl ? <img src={form.imageUrl} className="w-full h-full object-cover" alt="Preview" /> : <span className="text-lg">📸</span>}
                    </div>
                    <label className="flex-1 cursor-pointer">
                      <div className="bg-[#F6EFE9] border-2 border-dashed border-[#DCC8BC] rounded-2xl py-4 text-center text-xs font-bold text-[#8B776E] hover:border-[#8B776E] transition-all">
                        {uploading ? 'Processing Image...' : 'Drop or Tap to Upload'}
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-8 py-6 bg-[#F6EFE9]/50 border-t border-[#DCC8BC]/60 flex items-center justify-end gap-4 sticky bottom-0 z-20">
              <button onClick={resetForm} className="px-6 py-2.5 text-sm font-semibold text-[#8B776E] hover:text-[#3C2F2A] transition-colors">Discard</button>
              <button onClick={handleSubmit} disabled={saving || uploading}
                className="px-8 py-3 rounded-2xl bg-[#8B776E] text-white text-sm font-bold
                  hover:bg-[#6E5B54] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#8B776E]/20">
                {saving ? 'Saving...' : editingId ? 'Apply Changes' : 'Publish Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-4 animate-pulse">
              <div className="w-full h-44 bg-[#EFE3DA] rounded-2xl mb-3" />
              <div className="h-4 bg-[#EFE3DA] rounded w-3/4 mb-2" />
              <div className="h-3 bg-[#EFE3DA] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-16 text-center shadow-sm">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="font-playfair text-lg font-semibold text-[#3C2F2A] mb-1">No products yet</h3>
          <p className="text-sm text-[#8B776E]">Add your first product to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product._id}
              className="bg-white rounded-3xl border border-[#DCC8BC]/60 overflow-hidden shadow-sm
                hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="relative overflow-hidden">
                <img src={product.imageUrl || getImageByIndex(0)} alt={product.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                  <button onClick={() => handleEdit(product)}
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center
                      hover:bg-[#EFE3DA] hover:text-[#8B776E] shadow-sm"
                    aria-label={`Edit ${product.name}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                  <button onClick={() => deleteProduct(product._id)}
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center
                      hover:bg-red-50 hover:text-red-500 shadow-sm"
                    aria-label={`Delete ${product.name}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#8B776E] text-white">{product.badge}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-[#6E5B54] bg-[#EFE3DA] px-2.5 py-0.5 rounded-full border border-[#DCC8BC]/60">{product.category}</span>
                <h3 className="font-medium text-[#3C2F2A] mt-2 text-sm">{product.name}</h3>
                <p className="text-[#8B776E] font-bold mt-1">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
