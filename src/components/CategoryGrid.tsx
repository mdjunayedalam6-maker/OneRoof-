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
import { toBengaliNumber } from '../utils/translations';

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Featured Categories'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'bn' ? 'আপনার প্রয়োজনীয় পণ্য বেছে নিন' : 'Explore products by category'}
          </p>
        </div>

        <button
          onClick={() => {
            setFilterState((prev) => ({ ...prev, category: 'all', searchQuery: '' }));
            setCurrentPage('shop');
          }}
          className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
        >
          <span>{language === 'bn' ? 'সব দেখুন' : 'View All'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-2">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;
          return (
            <div
              key={cat.id}
              onClick={() => openCategory(cat.id)}
              className="bg-white rounded-lg p-1.5 border border-emerald-100 hover:border-emerald-400 hover:shadow-sm transition-all duration-300 text-center cursor-pointer group flex flex-col items-center justify-between"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-1.5 bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.nameBn}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/30 transition-colors flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white drop-shadow-md" />
                </div>
              </div>

              <h3 className="text-[9px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 mt-1">
                {language === 'bn' ? cat.nameBn : cat.nameEn}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};
