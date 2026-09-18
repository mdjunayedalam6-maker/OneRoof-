import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Tag, 
  RotateCcw,
  X,
  Layers,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { Category } from '../types';

export interface CategorySlide {
  id: string;
  badgeBn: string;
  badgeEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  highlightBn: string;
  highlightEn: string;
  gradient: string;
  image: string;
  iconType: 'sparkles' | 'flame' | 'shield' | 'truck' | 'check' | 'tag' | 'zap';
}

interface CategorySlimBannerProps {
  currentCategory: string; // 'all' or category id
  currentSubcategory: string; // 'all' or subcategory id
  categories: Category[];
  onSelectCategory: (catId: string) => void;
  onSelectSubcategory: (subcatId: string) => void;
  productsCount: number;
  language: 'bn' | 'en';
  searchQuery?: string;
  onClearSearch?: () => void;
  onResetFilters?: () => void;
}

// Curated rotating slides for each category (at least 3-5 slides per category)
const CATEGORY_SLIDES_MAP: Record<string, CategorySlide[]> = {
  all: [
    {
      id: 'all-1',
      badgeBn: 'মার্কেটপ্লেস ক্যাটালগ',
      badgeEn: 'Marketplace Catalog',
      titleBn: 'সকল ক্যাটাগরির মেগা অফার ও ধামাকা কালেকশন',
      titleEn: 'Mega Collection & Deals Across All Categories',
      subtitleBn: 'প্রিমিয়াম পাঞ্জাবি, খাঁটি সুন্দরবনের মধু, খাদ্যদ্রব্য ও টেক গ্যাজেট এক ঠিকানায়',
      subtitleEn: 'Premium festive wear, pure wild honey, organic food & tech gadgets under one roof',
      highlightBn: 'ফ্ল্যাট 30% পর্যন্ত ছাড়',
      highlightEn: 'Up to 30% Off',
      gradient: 'from-[#0A2540] via-[#0E3860] to-emerald-900',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80',
      iconType: 'sparkles'
    },
    {
      id: 'all-2',
      badgeBn: 'সীমিত অফার',
      badgeEn: 'Limited Offer',
      titleBn: 'পাঞ্জাবি ও উৎসব কালেকশনে ফ্ল্যাট 30% ছাড়',
      titleEn: 'Flat 30% Off on Punjabi & Festive Collection',
      subtitleBn: 'ঈদ ও যেকোনো পারিবারিক আয়োজনে প্রিমিয়াম সুতি ও সেমি-লং পাঞ্জাবি',
      subtitleEn: 'Premium pure cotton & designer Punjabi for festive celebrations',
      highlightBn: 'কুপন: FESTIVE30',
      highlightEn: 'Coupon: FESTIVE30',
      gradient: 'from-amber-950 via-[#451a03] to-amber-900',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80',
      iconType: 'flame'
    },
    {
      id: 'all-3',
      badgeBn: 'খাঁটি ও প্রাকৃতিক',
      badgeEn: 'Pure & Natural',
      titleBn: 'সুন্দরবনের মধু ও দিনাজপুরের চিনিগুঁড়া পোলাও চাল',
      titleEn: 'Sundarbans Pure Honey & Aromatic Chinigura Rice',
      subtitleBn: '100% ভেজালমুক্ত পুষ্টিকর উপাদান সরাসরি প্রাকৃতিক উৎস থেকে আপনার ঘরে',
      subtitleEn: '100% natural, unadulterated nutritious groceries delivered to your home',
      highlightBn: '100% খাঁটি নিশ্চয়তা',
      highlightEn: '100% Pure Guarantee',
      gradient: 'from-emerald-950 via-[#064e3b] to-teal-900',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80',
      iconType: 'shield'
    },
    {
      id: 'all-4',
      badgeBn: 'সুপার ফাস্ট শিপিং',
      badgeEn: 'Fast Shipping',
      titleBn: 'সারা দেশে দ্রুততম হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি',
      titleEn: 'Fast Cash on Delivery Across All 64 Districts',
      subtitleBn: 'ঢাকার ভেতর 24 ঘণ্টায় ও ঢাকার বাইরে 48 ঘণ্টায় নিরাপদ হ্যান্ড ডেলিভারি',
      subtitleEn: '24-hour delivery inside Dhaka & 48-hour delivery across Bangladesh',
      highlightBn: 'নিরাপদ ডেলিভারি',
      highlightEn: 'Safe & Fast',
      gradient: 'from-slate-950 via-[#0f172a] to-blue-950',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
      iconType: 'truck'
    },
    {
      id: 'all-5',
      badgeBn: 'গ্রাহক সন্তুষ্টি',
      badgeEn: 'Customer Trust',
      titleBn: 'সহজ রিটার্ন সুবিধা ও 7 দিনের রিপ্লেসমেন্ট পলিসি',
      titleEn: 'Easy Return Policy & 7 Days Replacement Warranty',
      subtitleBn: 'পছন্দ না হলে কোনো ঝামেলা ছাড়া সহজে রিটার্ন বা পরিবর্তনের নিশ্চয়তা',
      subtitleEn: 'Shop with full confidence with 24/7 dedicated support & hassle-free returns',
      highlightBn: 'বিশ্বস্ত সেবা',
      highlightEn: '100% Verified',
      gradient: 'from-purple-950 via-[#3b0764] to-indigo-950',
      image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c6?w=1200&auto=format&fit=crop&q=80',
      iconType: 'check'
    }
  ],
  fashion: [
    {
      id: 'fashion-1',
      badgeBn: 'উৎসব কালেকশন',
      badgeEn: 'Festive Wear',
      titleBn: 'পাঞ্জাবি ও উৎসব কালেকশনে ফ্ল্যাট 30% ছাড়',
      titleEn: 'Flat 30% Off on Punjabi & Festival Collection',
      subtitleBn: 'ঈদ ও যেকোনো আয়োজনে প্রিমিয়াম সুতি ও আকর্ষণীয় ডিজাইনার পাঞ্জাবি',
      subtitleEn: 'Premium cotton designer Punjabi crafted for elegance and supreme comfort',
      highlightBn: 'ফ্ল্যাট 30% ছাড়',
      highlightEn: 'Flat 30% Off',
      gradient: 'from-[#451a03] via-[#78350f] to-amber-900',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80',
      iconType: 'flame'
    },
    {
      id: 'fashion-2',
      badgeBn: 'প্রিমিয়াম সুতি',
      badgeEn: '100% Cotton',
      titleBn: 'আরামদায়ক ক্যাজুয়াল ও ফর্মাল ড্রেস কালেকশন',
      titleEn: 'Comfortable Casual & Formal Wardrobe Essentials',
      subtitleBn: 'সারাদিনের সর্বোচ্চ কমফোর্ট ও আধুনিক ট্রিমড কাটিং ডিজাইন',
      subtitleEn: 'High-breathability fabrics with tailored contemporary fits',
      highlightBn: 'টপ কোয়ালিটি',
      highlightEn: 'Top Quality',
      gradient: 'from-slate-900 via-rose-950 to-pink-900',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop&q=80',
      iconType: 'sparkles'
    },
    {
      id: 'fashion-3',
      badgeBn: 'নিউ অ্যারাইভাল',
      badgeEn: 'New Arrivals',
      titleBn: 'নতুন মৌসুমের ট্রেন্ডি পোশাক ও ঐতিহ্যবাহী শাড়ি-পাঞ্জাবি',
      titleEn: 'New Season Ethnic & Modern Lifestyle Wear',
      subtitleBn: 'আধুনিক ট্রেন্ড ও সংস্কৃতির অনন্য মেলবন্ধন আপনার আলমারিতে',
      subtitleEn: 'Blends of classic cultural elegance and sleek urban trend',
      highlightBn: 'নতুন কালেকশন',
      highlightEn: 'New Styles',
      gradient: 'from-blue-950 via-[#1e3a8a] to-cyan-900',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80',
      iconType: 'tag'
    }
  ],
  grocery: [
    {
      id: 'grocery-1',
      badgeBn: 'খাঁটি ও প্রাকৃতিক',
      badgeEn: 'Pure & Organic',
      titleBn: 'সুন্দরবনের প্রাকৃতিক চাকভাঙ্গা কাঁচা মধু',
      titleEn: 'Natural Sundarbans Wild Raw Honey',
      subtitleBn: 'কোনো প্রসেসিং ছাড়া শতভাগ খাঁটি ও পুষ্টিকর মধুতে রোগ প্রতিরোধ ক্ষমতা বাড়ান',
      subtitleEn: '100% natural, preservative-free raw forest honey packed with vital nutrients',
      highlightBn: '100% প্রাকৃতিক',
      highlightEn: '100% Pure',
      gradient: 'from-[#064e3b] via-[#065f46] to-emerald-900',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80',
      iconType: 'shield'
    },
    {
      id: 'grocery-2',
      badgeBn: 'সুগন্ধি পোলাও চাল',
      badgeEn: 'Aromatic Rice',
      titleBn: 'দিনাজপুরের স্পেশাল সুবাসিত চিনিগুঁড়া পোলাও চাল',
      titleEn: 'Premium Dinajpur Chinigura Aromatic Rice',
      subtitleBn: 'উৎসবের বিরিয়ানি ও পায়েসের অতুলনীয় সুবাস আর তুলতুলে নরম স্বাদ',
      subtitleEn: 'Fine aromatic grain specially selected for traditional festive delights',
      highlightBn: 'বিশেষ ছাড়',
      highlightEn: 'Special Price',
      gradient: 'from-[#78350f] via-[#92400e] to-amber-800',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&auto=format&fit=crop&q=80',
      iconType: 'sparkles'
    },
    {
      id: 'grocery-3',
      badgeBn: 'ঘানি ভাঙা তেল ও ঘি',
      badgeEn: 'Cold Pressed & Ghee',
      titleBn: 'খাঁটি কাঠের ঘানির সরিষার তেল ও সিরাজগঞ্জের গাওয়া ঘি',
      titleEn: 'Traditional Cold-Pressed Mustard Oil & Cultured Ghee',
      subtitleBn: 'রান্নায় আসুক খাঁটি ঝাঁঝ, মনোমুগ্ধকর সুবাস আর পরিবারের সুস্বাস্থ্য',
      subtitleEn: 'Authentic traditional pungency and rich aroma for wholesome health',
      highlightBn: 'ভেজালমুক্ত',
      highlightEn: 'Chemical Free',
      gradient: 'from-[#365314] via-[#3f6212] to-lime-900',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop&q=80',
      iconType: 'shield'
    }
  ],
  electronics: [
    {
      id: 'electronics-1',
      badgeBn: 'স্মার্ট গ্যাজেট',
      badgeEn: 'Smart Tech',
      titleBn: 'অফিসিয়াল স্মার্টফোন ও প্রিমিয়াম অরিজিনাল গ্যাজেট',
      titleEn: 'Official Smartphones & Flagship Tech Gear',
      subtitleBn: 'অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি ও নির্ভরযোগ্য আফটার-সেলস সার্ভিসের নিশ্চয়তা',
      subtitleEn: 'Genuine gadgets with official brand warranties and quick customer support',
      highlightBn: 'অফিসিয়াল গ্যারান্টি',
      highlightEn: 'Official Warranty',
      gradient: 'from-[#0f172a] via-[#1e293b] to-blue-900',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80',
      iconType: 'sparkles'
    },
    {
      id: 'electronics-2',
      badgeBn: 'অডিও ও ওয়্যারেবলস',
      badgeEn: 'Audio & Wearables',
      titleBn: 'স্মার্টওয়াচ, ট্রু-ওয়্যারলেস ইয়ারবাডস ও হেডফোন',
      titleEn: 'Smartwatches, ANC Earbuds & Bluetooth Audio',
      subtitleBn: 'ক্রিস্টাল ক্লিয়ার বেস এবং শক্তিশালী লং-লাস্টিং ব্যাটারি ব্যাকআপ',
      subtitleEn: 'Immersive sound clarity and ultra-long battery life on the move',
      highlightBn: 'ফ্ল্যাট 25% ছাড়',
      highlightEn: 'Flat 25% Off',
      gradient: 'from-[#172554] via-[#1e3a8a] to-indigo-900',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
      iconType: 'flame'
    },
    {
      id: 'electronics-3',
      badgeBn: 'ফাস্ট চার্জিং',
      badgeEn: 'Power & Accessories',
      titleBn: 'হাই-স্পিড পিডি চার্জার ও পাওয়ার ব্যাংক অ্যাক্সেসরিজ',
      titleEn: 'High-Speed PD Chargers & High Capacity Power Banks',
      subtitleBn: 'দ্রুত ও সুরক্ষিত চার্জিং সলিউশন আপনার স্মার্ট ডিভাইসের জন্য',
      subtitleEn: 'Safe multi-device fast charging technology built to last',
      highlightBn: 'বেস্ট প্রাইস',
      highlightEn: 'Best Price',
      gradient: 'from-[#1e1b4b] via-[#312e81] to-violet-900',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80',
      iconType: 'zap'
    }
  ],
  home: [
    {
      id: 'home-1',
      badgeBn: 'কিচেন অ্যাপ্লায়েন্স',
      badgeEn: 'Kitchen Essentials',
      titleBn: 'আধুনিক কিচেন অ্যাপ্লায়েন্স ও নন-স্টিক কুকওয়্যার',
      titleEn: 'Modern Kitchen Appliances & Non-Stick Cookware',
      subtitleBn: 'রান্নাকে করুন সহজ, দ্রুত ও তৃপ্তিদায়ক আধুনিক প্রযুক্তির সহায়তায়',
      subtitleEn: 'Make everyday home cooking effortless, swift and energy-efficient',
      highlightBn: 'স্পেশাল ডিল',
      highlightEn: 'Special Deal',
      gradient: 'from-[#451a03] via-[#78350f] to-orange-900',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80',
      iconType: 'sparkles'
    },
    {
      id: 'home-2',
      badgeBn: 'হোম ডেকর',
      badgeEn: 'Home Decor',
      titleBn: 'নান্দনিক হোম ডেকরেশন ও লিভিং রুম স্টাইল',
      titleEn: 'Aesthetic Home Decor & Living Room Accents',
      subtitleBn: 'আপনার ভালোবাসার ঘরটিকে সাজান মনের মতো আকর্ষণীয় ছোঁয়ায়',
      subtitleEn: 'Transform every corner of your home into a welcoming sanctuary',
      highlightBn: '20% মূল্যছাড়',
      highlightEn: '20% Off',
      gradient: 'from-[#1c1917] via-[#292524] to-amber-950',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
      iconType: 'tag'
    }
  ],
  beauty: [
    {
      id: 'beauty-1',
      badgeBn: 'স্কিন কেয়ার',
      badgeEn: 'Skincare',
      titleBn: '100% অরিজিনাল ডার্মাটোলজি টেস্টেড স্কিন কেয়ার',
      titleEn: '100% Authentic Dermatology-Tested Skincare',
      subtitleBn: 'ত্বকের প্রাকৃতিক দীপ্তি ও সতেজতা বজায় রাখতে সেরা ব্র্যান্ডের উপাদান',
      subtitleEn: 'Gentle dermatological solutions for naturally glowing healthy skin',
      highlightBn: 'শতভাগ অরিজিনাল',
      highlightEn: '100% Genuine',
      gradient: 'from-[#831843] via-[#9d174d] to-rose-900',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
      iconType: 'sparkles'
    },
    {
      id: 'beauty-2',
      badgeBn: 'হার্বাল ও ন্যাচারাল',
      badgeEn: 'Natural Beauty',
      titleBn: 'হার্বাল রূপচর্চা ও কেমিক্যালমুক্ত হেয়ার কেয়ার',
      titleEn: 'Herbal Personal Care & Sulfate-Free Hair Nutrition',
      subtitleBn: 'প্রাকৃতিক ভেষজ নির্যাসে তৈরি সম্পূর্ণ নিরাপদ ও কার্যকর যত্ন',
      subtitleEn: 'Botanical extracts formulated to revitalize hair and nourish skin safely',
      highlightBn: 'ন্যাচারাল গ্লো',
      highlightEn: 'Natural Glow',
      gradient: 'from-[#701a75] via-[#86198f] to-fuchsia-900',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80',
      iconType: 'shield'
    }
  ],
  books: [
    {
      id: 'books-1',
      badgeBn: 'বই ও স্টেশনারি',
      badgeEn: 'Books & Stationery',
      titleBn: 'জনপ্রিয় লেখকদের অনুপ্রেরণামূলক ও একাডেমিক বই',
      titleEn: 'Bestselling Literature, Islamic & Academic Books',
      subtitleBn: 'জ্ঞানের আলো ছড়াতে বই পড়ুন এবং আপনার চিন্তাকে সমৃদ্ধ করুন',
      subtitleEn: 'Enrich your mind with thought-provoking reads and fine stationery',
      highlightBn: 'বিশেষ ছাড়',
      highlightEn: 'Book Fair Price',
      gradient: 'from-[#0c4a6e] via-[#075985] to-blue-900',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80',
      iconType: 'sparkles'
    }
  ],
  sports: [
    {
      id: 'sports-1',
      badgeBn: 'ফিটনেস ও খেলাধুলা',
      badgeEn: 'Fitness & Sports',
      titleBn: 'হোম জিম এক্সেসরিজ ও প্রিমিয়াম স্পোর্টস গিয়ার',
      titleEn: 'Home Gym Accessories & High Performance Sportswear',
      subtitleBn: 'প্রতিদিনের ওয়ার্কআউটে শরীর ও মনকে রাখুন সম্পূর্ণ ফিট ও উদ্যমী',
      subtitleEn: 'Stay active, agile and energized with reliable fitness essentials',
      highlightBn: 'ফিটনেস ডিল',
      highlightEn: 'Fitness Deals',
      gradient: 'from-[#14532d] via-[#166534] to-emerald-900',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
      iconType: 'flame'
    }
  ],
  baby: [
    {
      id: 'baby-1',
      badgeBn: 'বেবি ও কিডস কেয়ার',
      badgeEn: 'Baby & Kids Care',
      titleBn: 'সোনামণিদের জন্য শতভাগ নিরাপদ ও কোমল কেয়ার সামগ্রী',
      titleEn: 'Gentle, Hypoallergenic Essentials for Babies & Kids',
      subtitleBn: 'শিশুর ত্বকের জন্য আরামদায়ক পোশাক, ডায়াপার ও খেলনার সম্ভার',
      subtitleEn: 'Caring for your little ones with certified baby-friendly materials',
      highlightBn: 'নিরাপদ যত্ন',
      highlightEn: '100% Safe',
      gradient: 'from-[#0e7490] via-[#155e75] to-teal-900',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&auto=format&fit=crop&q=80',
      iconType: 'shield'
    }
  ]
};

export const CategorySlimBanner: React.FC<CategorySlimBannerProps> = ({
  currentCategory,
  currentSubcategory,
  categories,
  onSelectCategory,
  onSelectSubcategory,
  productsCount,
  language,
  searchQuery,
  onClearSearch,
  onResetFilters,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get matching category object
  const categoryObj = useMemo(() => {
    return categories.find((c) => c.id === currentCategory);
  }, [categories, currentCategory]);

  // Determine slides for this category (or generate fallback if custom category)
  const slides = useMemo<CategorySlide[]>(() => {
    if (CATEGORY_SLIDES_MAP[currentCategory] && CATEGORY_SLIDES_MAP[currentCategory].length > 0) {
      return CATEGORY_SLIDES_MAP[currentCategory];
    }
    
    // Fallback slides for any customized category
    const catNameBn = categoryObj?.nameBn || 'ক্যাটাগরি ক্যাটালগ';
    const catNameEn = categoryObj?.nameEn || 'Category Catalog';
    return [
      {
        id: `${currentCategory}-1`,
        badgeBn: 'স্পেশাল ক্যাটালগ',
        badgeEn: 'Curated Catalog',
        titleBn: `${catNameBn} এর সেরা ও আকর্ষণীয় কালেকশন`,
        titleEn: `Top Collection of ${catNameEn}`,
        subtitleBn: 'অরিজিনাল মান ও সেরা মূল্যে আপনার পছন্দের সকল পণ্য',
        subtitleEn: 'Discover authentic quality products at unbeatable prices',
        highlightBn: 'বিশেষ ছাড়',
        highlightEn: 'Special Offer',
        gradient: 'from-[#0A2540] via-[#0E3860] to-emerald-900',
        image: categoryObj?.image || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80',
        iconType: 'sparkles'
      },
      {
        id: `${currentCategory}-2`,
        badgeBn: '100% অরিজিনাল',
        badgeEn: '100% Genuine',
        titleBn: `${catNameBn} এর বাছাইকৃত প্রিমিয়াম কালেকশন`,
        titleEn: `Handpicked Selection for ${catNameEn}`,
        subtitleBn: 'সরাসরি বিশ্বস্ত সোর্স থেকে সরবরাহকৃত ও দ্রুত ডেলিভারির সুবিধা',
        subtitleEn: 'Directly sourced and carefully verified with swift home delivery',
        highlightBn: 'সেরা মান',
        highlightEn: 'Best Quality',
        gradient: 'from-amber-950 via-[#451a03] to-amber-900',
        image: categoryObj?.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80',
        iconType: 'shield'
      }
    ];
  }, [currentCategory, categoryObj]);

  // Reset slide index when category changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [currentCategory]);

  // Automatic slide rotation (every 3.5 seconds)
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [slides.length, isPaused, currentSlideIndex]);

  const activeSlide = slides[currentSlideIndex] || slides[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const renderIcon = (type: CategorySlide['iconType']) => {
    switch (type) {
      case 'flame':
        return <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />;
      case 'shield':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'truck':
        return <Truck className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'check':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'zap':
        return <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
    }
  };

  return (
    <div className="space-y-2.5">
      {/* 
        ULTRA-SLIM COMPACT ROTATING BANNER:
        Designed to be sleek, thin (h-[84px] on mobile, h-[96px] on desktop), 
        automatic rotating, and visually premium!
      */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${activeSlide.gradient} text-white shadow-md border border-white/10 transition-all duration-700 select-none group min-h-[82px] sm:min-h-[92px] flex items-center`}
      >
        {/* Background Image with High-End Dark Gradient Mask */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={activeSlide.image}
            alt=""
            className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent sm:via-slate-950/60" />
        </div>

        {/* Content Container (Slim, Compact, Single-Row/Dual-Row Layout) */}
        <div className="relative z-10 w-full px-3.5 sm:px-5 py-2.5 flex items-center justify-between gap-3">
          {/* Left Column: Category Badge + Animated Title + Subtitle */}
          <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
            {/* Top Micro Header Row: Badge & Highlight & Products Found */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-bold text-amber-300">
                {renderIcon(activeSlide.iconType)}
                <span>
                  {language === 'bn' ? activeSlide.badgeBn : activeSlide.badgeEn}
                </span>
              </div>

              <span className="hidden xs:inline-block text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {language === 'bn' ? activeSlide.highlightBn : activeSlide.highlightEn}
              </span>

              <span className="text-[10px] sm:text-xs text-slate-300 font-medium ml-auto sm:ml-0">
                {productsCount} {language === 'bn' ? 'টি পণ্য' : 'products'}
              </span>
            </div>

            {/* Main Headline (Bold, Compact, High-Contrast) */}
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm md:text-base font-black tracking-tight text-white line-clamp-1">
                {searchQuery ? (
                  <span>
                    {language === 'bn' ? 'অনুসন্ধান:' : 'Search:'} "{searchQuery}"
                  </span>
                ) : (
                  <span>
                    {language === 'bn' ? activeSlide.titleBn : activeSlide.titleEn}
                  </span>
                )}
              </h1>
            </div>

            {/* Micro Subtitle (Shown on sm+ to keep ultra slim on mobile) */}
            <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-1 hidden sm:block opacity-90 font-normal">
              {language === 'bn' ? activeSlide.subtitleBn : activeSlide.subtitleEn}
            </p>
          </div>

          {/* Right Column: Mini Slide Dots, Arrows & Reset/Clear Actions */}
          <div className="shrink-0 flex items-center gap-2 sm:gap-3">
            {/* Clear Search / Reset Buttons if active */}
            {searchQuery && onClearSearch && (
              <button
                onClick={onClearSearch}
                className="px-2 sm:px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] sm:text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title={language === 'bn' ? 'সার্চ রিসেট' : 'Clear search'}
              >
                <X className="w-3 h-3" />
                <span className="hidden md:inline">{language === 'bn' ? 'রিসেট' : 'Clear'}</span>
              </button>
            )}

            {/* Slide Navigation Controls (Ultra-Compact Arrows & Dots) */}
            {slides.length > 1 && (
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-1.5 py-1 rounded-xl border border-white/10">
                {/* Prev Arrow */}
                <button
                  onClick={handlePrev}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer active:scale-90"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Micro Indicator Dots */}
                <div className="flex items-center gap-1 px-1">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlideIndex === idx
                          ? 'w-3.5 sm:w-4 bg-amber-400'
                          : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next Arrow */}
                <button
                  onClick={handleNext}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer active:scale-90"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Micro Progress Bar at the very bottom edge (indicating auto slide rotation) */}
        {slides.length > 1 && !isPaused && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
            <div 
              key={`${currentCategory}-${currentSlideIndex}`}
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 animate-[progress_3.5s_linear]"
              style={{
                animation: 'categoryBannerProgress 3.5s linear infinite'
              }}
            />
          </div>
        )}
      </div>

      {/* Horizontal Interactive Category Filter Pills (Instant Switching) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
          {/* All Categories Pill */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              currentCategory === 'all'
                ? 'bg-[#003882] text-white shadow-sm ring-2 ring-[#003882]/30 scale-[1.02]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>{language === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</span>
            {currentCategory === 'all' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            )}
          </button>

          {/* Each Dynamic Category Pill */}
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Subcategory Pills (Only visible when a category with subcategories is selected) */}
        {categoryObj && categoryObj.subcategories && categoryObj.subcategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
            <button
              onClick={() => onSelectSubcategory('all')}
              className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentSubcategory === 'all'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {language === 'bn' ? 'সব দেখুন' : 'View All'}
            </button>
            {categoryObj.subcategories.map((sub) => {
              const isSelected = currentSubcategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onSelectSubcategory(sub.id)}
                  className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {language === 'bn' ? sub.nameBn : sub.nameEn}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
