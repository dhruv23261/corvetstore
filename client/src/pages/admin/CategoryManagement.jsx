import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', imageUrl: '', sequence: 0 });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try { const { data } = await api.get('/categories'); setCategories(data); }
    catch { setCategories([]); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, form);
      } else {
        await api.post('/categories', form);
      }
      resetForm(); fetchCategories();
    } catch (err) { alert('Already exists or error'); }
    finally { setSaving(false); }
  };

  const handleEdit = (c) => {
    setForm({ name: c.name, imageUrl: c.imageUrl, sequence: c.sequence || 0 });
    setEditingId(c._id); setShowModal(true);
  };

  const resetForm = () => {
    setForm({ name: '', imageUrl: '', sequence: 0 });
    setEditingId(null); setShowModal(false);
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete category?')) return;
    try { await api.delete(`/categories/${id}`); fetchCategories(); }
    catch { alert('Failed'); }
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
    } catch { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#DCC8BC]/70 bg-[#F6EFE9]/60
    text-[#3C2F2A] placeholder:text-[#6A5A53]/55 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#DCC8BC] focus:border-transparent transition-all`;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-2xl font-semibold text-[#3C2F2A]">Categories</h1>
          <p className="text-sm text-[#8B776E] mt-1">Manage storefront category icons</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="px-6 py-2.5 rounded-2xl bg-[#8B776E] text-white text-sm font-medium hover:bg-[#6E5B54] transition-all shadow-lg shadow-[#8B776E]/20">
          Add Category
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={resetForm} />
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative z-10 animate-scale-up overflow-hidden">
            <div className="px-8 py-6 border-b border-[#DCC8BC]/60 flex items-center justify-between">
              <h2 className="font-playfair text-lg font-bold text-[#3C2F2A]">{editingId ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={resetForm} className="text-[#8B776E] hover:text-[#3C2F2A]">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-[#8B776E] uppercase mb-2">Name</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8B776E] uppercase mb-2">Sequence</label>
                <input type="number" value={form.sequence} onChange={e => setForm({...form, sequence: e.target.value})} className={inputClass} />
              </div>
              <div>
                 <label className="block text-xs font-bold text-[#8B776E] uppercase mb-2">Icon/Image</label>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#DCC8BC] overflow-hidden flex items-center justify-center bg-[#F6EFE9]">
                       {form.imageUrl ? <img src={form.imageUrl} className="w-full h-full object-cover" /> : '📁'}
                    </div>
                    <label className="flex-1 cursor-pointer">
                      <div className="bg-[#F6EFE9] border-2 border-dashed border-[#DCC8BC] rounded-xl py-3 text-center text-[10px] font-bold text-[#8B776E]">
                        {uploading ? '...' : 'UPLOAD'}
                      </div>
                      <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>
                 </div>
              </div>
              <button type="submit" disabled={saving || uploading} className="w-full py-4 mt-2 rounded-2xl bg-[#8B776E] text-white font-bold text-sm shadow-xl shadow-[#8B776E]/20 disabled:opacity-50">
                {saving ? 'SAVING...' : editingId ? 'UPDATE' : 'CREATE'}
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-pulse">{[1,2,3,4].map(i=><div key={i} className="h-24 bg-white rounded-3xl" />)}</div> : categories.length === 0 ? <p className="text-[#8B776E] text-center p-20 bg-white rounded-3xl border border-[#DCC8BC]/60">Your category row is empty. Add categories to see them on the store!</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(c => (
            <div key={c._id} className="group bg-white rounded-3xl border border-[#DCC8BC]/60 p-5 flex flex-col items-center justify-center relative hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-full border border-[#DCC8BC]/60 overflow-hidden mb-3 bg-[#F6EFE9]/40 p-0.5">
                <img src={c.imageUrl || 'https://placehold.co/100'} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-[13px] font-semibold text-[#3C2F2A]">{c.name}</span>
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(c)} className="w-7 h-7 bg-[#EFE3DA] text-[#8B776E] rounded-full flex items-center justify-center text-xs hover:bg-[#8B776E] hover:text-white transition-colors">✎</button>
                <button onClick={() => deleteCategory(c._id)} className="w-7 h-7 bg-red-50 text-red-400 rounded-full flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition-colors">✕</button>
              </div>
              <div className="absolute top-2 left-2 text-[8px] font-bold text-[#DCC8BC]">{c.sequence}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
