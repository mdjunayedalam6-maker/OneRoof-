import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Zap, 
  ShoppingBag, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Truck, 
  CheckCircle2,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ShowcasePanelProps {
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  badgeBn: string;
  badgeEn: string;
  badgeBg: string;
  themeColor: 'amber' | 'emerald';
  categorySlug: string;
  products: Product[];
  autoRotateInterval?: number;
}

const ShowcasePanel: React.FC<ShowcasePanelProps> = ({
  titleBn,
  titleEn,
  subtitleBn,
  subtitleEn,
  badgeBn,
  badgeEn,
  badgeBg,
  themeColor,
  categorySlug,
  products,
  autoRotateInterval = 3800,
}) => {
  const { 
    language, 
    formatPrice, 
    viewProductDetails, 
    setCurrentPage, 
    setFilterState, 
    toggleWishlist,
    isInWishlist
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = products.length;

  const nextProduct = useCallback(() => {
    if (total <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 300);
  }, [total]);

  const prevProduct = useCallback(() => {
    if (total <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 300);
  }, [total]);

  const goToProduct = (idx: number) => {
    if (idx === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(idx);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Auto change timer
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const stepMs = 50;
    const stepIncrement = (stepMs / autoRotateInterval) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextProduct();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isPaused, total, autoRotateInterval, nextProduct]);

  if (!products || products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex] || products[0];
  const title = language === 'bn' ? currentProduct.titleBn : currentProduct.titleEn;
  const isWishlisted = isInWishlist(currentProduct.id);

  const handleViewAll = () => {
    setFilterState((prev) => ({
      ...prev,
      category: categorySlug,
      searchQuery: '',
    }));
    setCurrentPage('shop');
  };

  const isAmber = themeColor === 'amber';

  return (
    <div 
      className={`rounded-2xl border p-4 sm:p-5 relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ${
        isAmber 
          ? 'bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border-amber-500/30 text-white' 
          : 'bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 border-emerald-500/30 text-white'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Ambient Glow */}
      <div 
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isAmber ? 'bg-amber-500' : 'bg-emerald-500'
        }`} 
      />

      {/* Header Bar: Category Tag, Live Rotation Status & View All */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-3 sm:mb-4 pb-3 border-b border-white/10">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-full shadow-xs ${badgeBg}`}>
              {language === 'bn' ? badgeBn : badgeEn}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{currentIndex + 1}/{total}</span>
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
            {language === 'bn' ? titleBn : titleEn}
          </h3>
          <p className="text-[11px] text-slate-300 font-normal">
            {language === 'bn' ? subtitleBn : subtitleEn}
          </p>
        </div>

        <button
          onClick={handleViewAll}
          className={`shrink-0 inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
            isAmber 
              ? 'text-amber-300 border-amber-500/30 hover:bg-amber-500/20' 
              : 'text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
          }`}
        >
          <span className="whitespace-nowrap">{language === 'bn' ? 'সব দেখুন' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>

      {/* Main Dynamic Product Card Presentation */}
      <div 
        onClick={() => viewProductDetails(currentProduct)}
        className={`relative z-10 bg-slate-900/80 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-center ${
          isAnimating ? 'opacity-80 scale-[0.99]' : 'opacity-100 scale-100'
        }`}
      >
        {/* Product Image Box */}
        <div className="relative w-full sm:w-44 h-48 sm:h-38 shrink-0 rounded-lg overflow-hidden bg-slate-950">
          <img
            src={currentProduct.images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Left Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {currentProduct.discountPercentage && (
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                -{currentProduct.discountPercentage}%
              </span>
            )}
            <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
              <Truck className="w-2.5 h-2.5" />
              <span>{language === 'bn' ? 'ফ্রি ডেলিভারি' : 'Free Ship'}</span>
            </span>
          </div>

          {/* Top Right Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(currentProduct.id);
            }}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            title="উইশলিস্টে রাখুন"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
          </button>

          {/* Quick View Pill on Image Hover */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/90 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'Quick View'}</span>
            </span>
          </div>
        </div>

        {/* Product Details & Ordering Action Column */}
        <div className="w-full flex-1 flex flex-col justify-between">
          <div>
            {/* Brand & Stock Status */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">{currentProduct.brand}</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{language === 'bn' ? 'ইন স্টক' : 'In Stock'}</span>
              </span>
            </div>

            {/* Product Title */}
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
              {title}
            </h4>

            {/* Rating Stars & Sold Counter */}
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-300">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="ml-1 font-bold">{currentProduct.rating}</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-[11px]">
                ({currentProduct.reviewCount} {language === 'bn' ? 'রিভিউ' : 'reviews'})
              </span>
            </div>

            {/* Pricing Row */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                {formatPrice(currentProduct.price)}
              </span>
              {currentProduct.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {formatPrice(currentProduct.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* View Details Link */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10 w-full text-xs">
            <span className="text-[11px] text-slate-300">
              {language === 'bn' ? 'অর্ডার করতে ক্লিক করুন' : 'Click to customize & order'}
            </span>
            <span className={`font-bold flex items-center gap-1 transition-transform group-hover:translate-x-1 ${
              isAmber ? 'text-amber-300' : 'text-emerald-300'
            }`}>
              <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Slide Dots, Prev/Next Arrows & Micro Progress Bar */}
      <div className="relative z-10 flex items-center justify-between pt-3 mt-3 border-t border-white/10">
        {/* Interactive Dots for Changing Product */}
        <div className="flex items-center gap-1.5">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => goToProduct(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx 
                  ? isAmber
                    ? 'w-6 bg-amber-400 shadow-xs shadow-amber-400/50'
                    : 'w-6 bg-emerald-400 shadow-xs shadow-emerald-400/50'
                  : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Show product ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows & Micro Progress */}
        <div className="flex items-center gap-2">
          {/* Micro Progress Bar */}
          <div className="w-12 h-1 bg-white/15 rounded-full overflow-hidden hidden xs:block">
            <div 
              className={`h-full transition-all duration-75 ease-linear rounded-full ${
                isAmber ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevProduct}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Previous Product"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextProduct}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Next Product"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DualCategoryShowcase: React.FC = () => {
  const { products } = useApp();

  // 1. Fashion / Panjabi & Festive Products
  const fashionProducts = products.filter((p) => {
    const isFashionCat = p.category === 'fashion';
    const hasFestiveTag = p.tags && p.tags.some((t) => 
      ['panjabi', 'kabli', 'eid', 'festive', 'fashion'].includes(t.toLowerCase())
    );
    return isFashionCat || hasFestiveTag;
  });

  // 2. Grocery / Pure & Natural Products
  const groceryProducts = products.filter((p) => {
    const isGroceryCat = p.category === 'grocery';
    const hasOrganicTag = p.tags && p.tags.some((t) => 
      ['grocery', 'honey', 'rice', 'oil', 'ghee', 'organic', 'pure'].includes(t.toLowerCase())
    );
    return isGroceryCat || hasOrganicTag;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Left: Fashion & Punjabi Showcase */}
        <ShowcasePanel
          titleBn="পাঞ্জাবি ও উৎসব স্পেশাল ডিল"
          titleEn="Festive Panjabi & Ethnic Collection"
          subtitleBn="প্রিমিয়াম সুতি ও সেমি-তসর সিল্ক পাঞ্জাবিতে আকর্ষণীয় মূল্যছাড়"
          subtitleEn="Handpicked premium cotton & semi-tussar silk festival wear"
          badgeBn="সীমিত অফার • উৎসব কালেকশন"
          badgeEn="Limited Offer • Festive Wear"
          badgeBg="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black"
          themeColor="amber"
          categorySlug="fashion"
          products={fashionProducts}
          autoRotateInterval={3800}
        />

        {/* Right: Grocery, Sundarbans Honey, Fragrant Rice & Pure Food */}
        <ShowcasePanel
          titleBn="খাঁটি ও প্রাকৃতিক খাদ্য উপাদান"
          titleEn="Pure Natural & Organic Food"
          subtitleBn="সুন্দরবনের প্রাকৃতিক মধু, সুগন্ধি চিনিগুঁড়া চাল, খাঁটি সরিষার তেল ও গাওয়া ঘি"
          subtitleEn="Sundarbans raw honey, fragrant chinigura rice, cold-pressed oil & ghee"
          badgeBn="খাঁটি ও প্রাকৃতিক • 100% খাঁটি"
          badgeEn="100% Pure & Organic Staples"
          badgeBg="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black"
          themeColor="emerald"
          categorySlug="grocery"
          products={groceryProducts}
          autoRotateInterval={4200}
        />
      </div>
    </section>
  );
};
