import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function HeroManagement() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', cta: 'SHOP NOW', imageUrl: '', sequence: 0 });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchSlides(); }, []);

  const fetchSlides = async () => {
    try { const { data } = await api.get('/hero'); setSlides(data); }
    catch { setSlides([]); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editingId) {
        await api.put(`/hero/${editingId}`, form);
      } else {
        await api.post('/hero', form);
      }
      resetForm(); fetchSlides();
    } catch (err) { console.error('Failed to save slide', err); }
    finally { setSaving(false); }
  };

  const handleEdit = (s) => {
    setForm({ title: s.title, subtitle: s.subtitle, cta: s.cta, imageUrl: s.imageUrl, sequence: s.sequence || 0 });
    setEditingId(s._id); setShowForm(true);
  };

  const resetForm = () => {
    setForm({ title: '', subtitle: '', cta: 'SHOP NOW', imageUrl: '', sequence: 0 });
    setEditingId(null); setShowForm(false);
  };

  const deleteSlide = async (id) => {
    if (!window.confirm('Delete this slide?')) return;
    try { await api.delete(`/hero/${id}`); fetchSlides(); }
    catch (err) { console.error('Failed to delete', err); }
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

  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#DCC8BC]/70 bg-[#F6EFE9]/60
    text-[#3C2F2A] placeholder:text-[#6A5A53]/55 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#DCC8BC] focus:border-transparent transition-all`;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-playfair text-2xl font-semibold text-[#3C2F2A]">Hero Banners</h1>
          <p className="text-sm text-[#8B776E] mt-1">Manage homepage slider</p>
        </div>
        <button onClick={() => showForm ? resetForm() : setShowForm(true)}
          className="px-5 py-2.5 rounded-2xl bg-[#8B776E] text-white text-sm font-medium
            hover:bg-[#6E5B54] transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#8B776E]/20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
          </svg>
          {showForm ? 'Cancel' : 'Add Slide'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-7 shadow-sm mb-6">
          <h2 className="font-playfair text-lg font-semibold text-[#3C2F2A] mb-5">{editingId ? 'Edit Slide' : 'New Slide'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Title</label>
              <input id="title" type="text" required value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Banner title" className={inputClass} />
            </div>
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Subtitle</label>
              <input id="subtitle" type="text" value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Banner subtitle" className={inputClass} />
            </div>
            <div>
              <label htmlFor="cta" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">CTA Text</label>
              <input id="cta" type="text" value={form.cta}
                onChange={(e) => setForm({ ...form, cta: e.target.value })} placeholder="SHOP NOW" className={inputClass} />
            </div>
            <div>
              <label htmlFor="sequence" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Sequence</label>
              <input id="sequence" type="number" value={form.sequence}
                onChange={(e) => setForm({ ...form, sequence: e.target.value })} placeholder="0" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Banner Image</label>
              <div className="flex items-center gap-4">
                {form.imageUrl && <img src={form.imageUrl} className="w-20 h-12 rounded-lg object-cover border border-[#DCC8BC]" alt="Preview" />}
                <label className="flex-1 cursor-pointer">
                  <div className="bg-[#EFE3DA]/50 text-[#8B776E] border-2 border-dashed border-[#DCC8BC] rounded-2xl py-4 text-center text-xs font-medium hover:border-[#8B776E] transition-all">
                    {uploading ? 'Uploading...' : 'Click to Upload High-Res Banner'}
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" disabled={saving || uploading}
                className="px-6 py-3 rounded-2xl bg-[#8B776E] text-white text-sm font-medium
                  hover:bg-[#6E5B54] transition-all duration-200 disabled:opacity-50 shadow-lg shadow-[#8B776E]/20">
                {saving ? 'Saving...' : editingId ? 'Update Slide' : 'Add Slide'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map(i => <div key={i} className="h-40 bg-white rounded-3xl animate-pulse border border-[#DCC8BC]/60" />)}
        </div>
      ) : slides.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-16 text-center shadow-sm">
          <p className="text-sm text-[#8B776E]">No banners yet. Add your first hero slide!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {slides.map((s) => (
            <div key={s._id} className="bg-white rounded-3xl border border-[#DCC8BC]/60 overflow-hidden shadow-sm group relative">
              <img src={s.imageUrl} className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5">
                <h3 className="text-white font-bold">{s.title}</h3>
                <p className="text-white/80 text-xs">{s.subtitle}</p>
              </div>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                 <button onClick={() => handleEdit(s)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8B776E] hover:bg-[#EFE3DA]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                 </button>
                 <button onClick={() => deleteSlide(s._id)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-500 hover:bg-red-50">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                 </button>
              </div>
              <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-lg text-[10px] font-bold text-[#8B776E]">Pos: {s.sequence}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
