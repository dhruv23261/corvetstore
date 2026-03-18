import React from 'react';

export default function Settings() {
  const inputClass = `w-full px-4 py-3 rounded-2xl border border-[#F2C4C8]/40 bg-[#FFF8F6]/50
    text-[#5C3D42] text-sm focus:outline-none focus:ring-2 focus:ring-[#F2C4C8] focus:border-transparent transition-all`;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-semibold text-[#5C3D42]">Settings</h1>
        <p className="text-sm text-[#D4868C] mt-1">Manage your store settings</p>
      </div>

      <div className="space-y-5 max-w-2xl">
        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-7 shadow-sm">
          <h2 className="font-playfair text-lg font-semibold text-[#5C3D42] mb-5">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Store Name</label>
              <input id="storeName" type="text" defaultValue="Aren Store" className={inputClass} />
            </div>
            <div>
              <label htmlFor="storeEmail" className="block text-sm font-medium text-[#5C3D42] mb-1.5">Contact Email</label>
              <input id="storeEmail" type="email" defaultValue="arenstore@gmail.com" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-7 shadow-sm">
          <h2 className="font-playfair text-lg font-semibold text-[#5C3D42] mb-2">Image Provider</h2>
          <p className="text-sm text-[#D4868C] mb-4">Currently using Unsplash URLs. Switch to Cloudinary when ready.</p>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-2xl bg-[#FFF0EC] text-[#5C3D42] text-sm font-medium">Unsplash (Active)</span>
            <span className="px-4 py-2 rounded-2xl border border-[#F2C4C8]/40 text-[#D4868C] text-sm">Cloudinary (Coming Soon)</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#F2C4C8]/20 p-7 shadow-sm">
          <h2 className="font-playfair text-lg font-semibold text-[#5C3D42] mb-2">Design System</h2>
          <p className="text-sm text-[#D4868C] mb-4">Active color palette</p>
          <div className="flex gap-4">
            {[
              { color: '#FFF0EC', label: 'Primary' },
              { color: '#D4868C', label: 'Secondary' },
              { color: '#FFF8F6', label: 'Background' },
              { color: '#F2C4C8', label: 'Accent' },
            ].map(c => (
              <div key={c.color} className="text-center">
                <div className="w-14 h-14 rounded-2xl border border-[#F2C4C8]/30 shadow-sm" style={{ backgroundColor: c.color }} />
                <p className="text-[10px] text-[#D4868C] mt-2 font-medium">{c.label}</p>
                <p className="text-[9px] text-[#D4868C]/50">{c.color}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="px-6 py-3 rounded-2xl bg-[#D4868C] text-white text-sm font-medium
          hover:bg-[#B86B72] transition-all duration-200 shadow-lg shadow-[#D4868C]/20">
          Save Changes
        </button>
      </div>
    </div>
  );
}
