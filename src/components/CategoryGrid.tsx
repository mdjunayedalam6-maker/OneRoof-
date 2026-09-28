import React from 'react';
import { 
  Smartphone, 
  Shirt, 
  ShoppingBag, 
  Home, 
  Sparkles, 
  BookOpen, 
  Activity, 
  Smile, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ICON_MAP: Record<string, any> = {
  Smartphone,
  Shirt,
  ShoppingBag,
  Home,
  Sparkles,
  BookOpen,
  Activity,
  Smile,
};

export const CategoryGrid: React.FC = () => {
  const { categories, openCategory, language, setCurrentPage, setFilterState } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>{language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Featured Categories'}</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500">
            {language === 'bn' ? 'আপনার প্রয়োজনীয় পণ্য বেছে নিন' : 'Explore products by category'}
          </p>
        </div>

        <button
          onClick={() => {
            setFilterState((prev) => ({ ...prev, category: 'all', searchQuery: '' }));
            setCurrentPage('shop');
          }}
          className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group active:scale-95 transition-all"
        >
          <span>{language === 'bn' ? 'সব দেখুন' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 columns on mobile as requested, compact & clear typography */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 sm:gap-2.5">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;
          const displayName = language === 'bn' ? cat.nameBn : cat.nameEn;
          return (
            <div
              key={cat.id}
              onClick={() => openCategory(cat.id)}
              className="bg-white rounded-xl p-1.5 border border-slate-100 hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-center cursor-pointer group flex flex-col items-center justify-start shadow-2xs active:scale-95"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-1 bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-inner shrink-0">
                <img
                  src={cat.image}
                  alt={displayName}
                  className="w-full h-full object-cover group-hover:opacity-85 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/30 transition-colors flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-white drop-shadow-md" />
                </div>
              </div>

              <div className="w-full min-h-[28px] flex items-center justify-center">
                <span
                  title={displayName}
                  className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight text-center line-clamp-2 px-0.5 break-words"
                >
                  {displayName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
