import React from 'react';

export default function Settings() {
  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#DCC8BC]/70 bg-[#F6EFE9]/60
    text-[#3C2F2A] text-sm focus:outline-none focus:ring-2 focus:ring-[#DCC8BC] focus:border-transparent transition-all`;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-semibold text-[#3C2F2A]">Settings</h1>
        <p className="text-sm text-[#8B776E] mt-1">Manage your store settings</p>
      </div>

      <div className="space-y-5 max-w-2xl">
        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-7 shadow-sm">
          <h2 className="font-playfair text-lg font-semibold text-[#3C2F2A] mb-5">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Store Name</label>
              <input id="storeName" type="text" defaultValue="Aren Store" className={inputClass} />
            </div>
            <div>
              <label htmlFor="storeEmail" className="block text-sm font-medium text-[#3C2F2A] mb-1.5">Contact Email</label>
              <input id="storeEmail" type="email" defaultValue="arenstore@gmail.com" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-7 shadow-sm">
          <h2 className="font-playfair text-lg font-semibold text-[#3C2F2A] mb-2">Image Provider</h2>
          <p className="text-sm text-[#8B776E] mb-4">Currently using Unsplash URLs. Switch to Cloudinary when ready.</p>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-2xl bg-[#EFE3DA] text-[#3C2F2A] text-sm font-medium">Unsplash (Active)</span>
            <span className="px-4 py-2 rounded-2xl border border-[#DCC8BC]/70 text-[#8B776E] text-sm">Cloudinary (Coming Soon)</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#DCC8BC]/60 p-7 shadow-sm">
          <h2 className="font-playfair text-lg font-semibold text-[#3C2F2A] mb-2">Design System</h2>
          <p className="text-sm text-[#8B776E] mb-4">Active color palette</p>
          <div className="flex gap-4">
            {[
              { color: '#EFE3DA', label: 'Section' },
              { color: '#8B776E', label: 'Accent' },
              { color: '#F6EFE9', label: 'Background' },
              { color: '#DCC8BC', label: 'Border' },
            ].map(c => (
              <div key={c.color} className="text-center">
                <div className="w-14 h-14 rounded-2xl border border-[#DCC8BC]/70 shadow-sm" style={{ backgroundColor: c.color }} />
                <p className="text-[10px] text-[#8B776E] mt-2 font-medium">{c.label}</p>
                <p className="text-[9px] text-[#6A5A53]/60">{c.color}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="px-6 py-3 rounded-2xl bg-[#8B776E] text-white text-sm font-medium
          hover:bg-[#6E5B54] transition-all duration-200 shadow-lg shadow-[#8B776E]/20">
          Save Changes
        </button>
      </div>
    </div>
  );
}
