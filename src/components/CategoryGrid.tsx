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

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || ShoppingBag;
          return (
            <div
              key={cat.id}
              onClick={() => openCategory(cat.id)}
              className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 text-center cursor-pointer group flex flex-col items-center justify-between"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden mb-2.5 bg-emerald-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.nameBn}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/40 transition-colors flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>

              <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                {language === 'bn' ? cat.nameBn : cat.nameEn}
              </h3>

              <span className="text-[10px] font-medium text-slate-500 group-hover:text-emerald-700 transition-colors mt-0.5">
                {language === 'bn' 
                  ? `${toBengaliNumber(cat.itemCount)}টি পণ্য` 
                  : `${cat.itemCount} ${cat.itemCount === 1 ? 'Item' : 'Items'}`}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
