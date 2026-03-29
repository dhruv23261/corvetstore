import React from 'react';
import api from '../utils/api';

const CategorySection = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.get('/categories')
      .then(r => setCategories(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F6EFE9] py-10 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="h-8 bg-[#EFE3DA] rounded-xl w-56 mb-6 animate-pulse" />
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#EFE3DA] animate-pulse" />
                <div className="h-3 w-14 bg-[#EFE3DA] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (!categories.length) return null;

  return (
    <section className="bg-[#F6EFE9] py-10 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#3C2F2A] mb-1">
          Categories
        </h2>
        <p className="text-sm text-[#8B776E] font-inter mb-7">Explore our curated categories</p>

        {/* Scrollable row — matches reference screenshot */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => alert(`Browsing products in ${cat.name}...`)}
              className="flex flex-col items-center gap-2.5 flex-shrink-0 group cursor-pointer"
            >
              {/* Circle image — exactly like reference */}
              <div className="w-[68px] h-[68px] md:w-[84px] md:h-[84px] rounded-full
                border-[2.5px] border-[#DCC8BC] bg-white
                group-hover:border-[#8B776E] group-hover:scale-105 group-hover:shadow-lg
                transition-all duration-200 overflow-hidden shadow-sm flex-shrink-0">
                {cat.imageUrl ? (
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#EFE3DA] flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#8B776E]/50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.16-5.16a2.25 2.25 0 013.18 0l5.16 5.16m-1.5-1.5l1.41-1.41a2.25 2.25 0 013.18 0l2.91 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5z" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-[10px] md:text-xs font-inter font-semibold text-[#3C2F2A] text-center leading-tight max-w-[72px] group-hover:text-[#8B776E] transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
