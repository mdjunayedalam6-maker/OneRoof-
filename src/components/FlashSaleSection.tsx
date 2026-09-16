import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { toBengaliNumber } from '../utils/translations';

export const FlashSaleSection: React.FC = () => {
  const { products, language, t, setFilterState, setCurrentPage } = useApp();

  // 18 hours countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  const formatDigit = (n: number) => {
    const str = n < 10 ? `0${n}` : `${n}`;
    return language === 'bn' ? toBengaliNumber(str) : str;
  };

  const handleViewAllFlashDeals = () => {
    setFilterState((prev) => ({
      ...prev,
      isFlashSaleOnly: true,
      category: 'all',
      searchQuery: '',
    }));
    setCurrentPage('shop');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Flash Sale Header with Live Countdown */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 rounded-2xl p-4 sm:p-6 text-white mb-6 shadow-lg shadow-rose-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Flame className="w-6 h-6 text-amber-300 animate-bounce" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                {t.flashSale}
              </h2>
              <span className="bg-white text-rose-700 text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                MEGA DEALS
              </span>
            </div>
            <p className="text-xs text-rose-100 mt-0.5">
              {language === 'bn' ? 'সীমিত সময়ের জন্য বিশেষ মূল্যছাড় ও ফ্রি ডেলিভারি' : 'Limited time mega discounts with fast delivery'}
            </p>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-100">
            <Clock className="w-4 h-4 text-amber-300" />
            <span>{t.endsIn}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-900 font-black">
            <div className="bg-white rounded-lg px-2.5 py-1 text-sm sm:text-base shadow-xs min-w-[36px] text-center">
              {formatDigit(timeLeft.hours)}
              <span className="block text-[9px] font-normal text-slate-500 uppercase">{t.hours}</span>
            </div>
            <span className="text-white font-bold text-lg">:</span>
            <div className="bg-white rounded-lg px-2.5 py-1 text-sm sm:text-base shadow-xs min-w-[36px] text-center">
              {formatDigit(timeLeft.minutes)}
              <span className="block text-[9px] font-normal text-slate-500 uppercase">{t.mins}</span>
            </div>
            <span className="text-white font-bold text-lg">:</span>
            <div className="bg-white rounded-lg px-2.5 py-1 text-sm sm:text-base shadow-xs min-w-[36px] text-center text-rose-600">
              {formatDigit(timeLeft.seconds)}
              <span className="block text-[9px] font-normal text-slate-500 uppercase">{t.secs}</span>
            </div>
          </div>

          <button
            onClick={handleViewAllFlashDeals}
            className="hidden lg:flex items-center gap-1 ml-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <span>{language === 'bn' ? 'সব ডিল দেখুন' : 'View All'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Flash Sale Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {flashSaleProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4 text-center lg:hidden">
        <button
          onClick={handleViewAllFlashDeals}
          className="w-full sm:w-auto px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>{language === 'bn' ? 'সব ফ্ল্যাশ ডিল দেখুন' : 'Explore All Flash Deals'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
