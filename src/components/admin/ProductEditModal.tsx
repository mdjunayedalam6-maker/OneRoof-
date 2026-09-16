import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Sparkles, Check, AlertCircle, Truck, DollarSign, Trash2, Hash } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const PRESET_IMAGES = [
  { label: 'স্মার্টফোন / Phone', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80' },
  { label: 'ল্যাপটপ / Laptop', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80' },
  { label: 'হেডফোন / Audio', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
  { label: 'ঘড়ি / Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' },
  { label: 'পাঞ্জাবি / Fashion', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80' },
  { label: 'শাড়ি / Saree', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80' },
  { label: 'মধু / Organic Honey', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80' },
  { label: 'সরিষার তেল / Oil', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80' },
  { label: 'ব্লেন্ডার / Blender', url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80' },
  { label: 'কেডস / Sneakers', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80' },
  { label: 'পারফিউম / Perfume', url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80' },
  { label: 'বই / Books', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' },
];

// Helper: Converts any Bengali digits (০-৯) to clean English digits (0-9)
const toEnglishDigits = (str: string): string => {
  const bnToEn: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  };
  let res = str;
  for (const [bn, en] of Object.entries(bnToEn)) {
    res = res.replaceAll(bn, en);
  }
  return res.replace(/[^0-9.]/g, '');
};

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
}) => {
  const { categories, addProduct, updateProduct, deleteProduct, language, addToast } = useApp();

  const [titleBn, setTitleBn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [brand, setBrand] = useState('');
  const [priceStr, setPriceStr] = useState<string>('205');
  const [originalPriceStr, setOriginalPriceStr] = useState<string>('250');
  const [stockStr, setStockStr] = useState<string>('50');
  const [imageUrl, setImageUrl] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [warranty, setWarranty] = useState('১ বছরের অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি');
  const [deliveryTime, setDeliveryTime] = useState('২-৩ কার্যদিবস');
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [shippingInside, setShippingInside] = useState<number | undefined>(undefined);
  const [shippingOutside, setShippingOutside] = useState<number | undefined>(undefined);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    setIsConfirmingDelete(false);
    if (productToEdit) {
      setTitleBn(productToEdit.titleBn || '');
      setTitleEn(productToEdit.titleEn || '');
      setCategory(productToEdit.category || (categories[0]?.slug || 'electronics'));
      setSubcategory(productToEdit.subcategory || '');
      setBrand(productToEdit.brand || '');
      setPriceStr(productToEdit.price !== undefined ? String(productToEdit.price) : '205');
      setOriginalPriceStr(productToEdit.originalPrice ? String(productToEdit.originalPrice) : '');
      setStockStr(productToEdit.stock !== undefined ? String(productToEdit.stock) : '25');
      setImageUrl(productToEdit.images?.[0] || '');
      setDescriptionBn(productToEdit.descriptionBn || '');
      setDescriptionEn(productToEdit.descriptionEn || '');
      setTagsStr(productToEdit.tags?.join(', ') || '');
      setIsFlashSale(Boolean(productToEdit.isFlashSale));
      setWarranty(productToEdit.warranty || '১ বছরের অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি');
      setDeliveryTime(productToEdit.deliveryTime || '২-৩ কার্যদিবস');
      setIsFreeShipping(Boolean(productToEdit.isFreeShipping));
      setShippingInside(productToEdit.shippingInside ?? productToEdit.shippingFee);
      setShippingOutside(productToEdit.shippingOutside ?? productToEdit.shippingFee);
    } else {
      // Default initial values for new product (e.g. 205 price as user specified)
      setTitleBn('');
      setTitleEn('');
      setCategory(categories[0]?.slug || 'electronics');
      setSubcategory('');
      setBrand('OneRoof Official');
      setPriceStr('205');
      setOriginalPriceStr('250');
      setStockStr('50');
      setImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80');
      setDescriptionBn('উন্নত মানের ও দীর্ঘস্থায়ী প্রিমিয়াম পণ্য। ১০০% অরিজিনাল কোয়ালিটি গ্যারান্টি।');
      setDescriptionEn('Premium high quality original product with full customer warranty.');
      setTagsStr('অরিজিনাল, বেস্টসেলার, ট্রেন্ডিং');
      setIsFlashSale(false);
      setWarranty('১ বছরের অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি');
      setDeliveryTime('২-৩ কার্যদিবস');
      setIsFreeShipping(false);
      setShippingInside(undefined);
      setShippingOutside(undefined);
    }
  }, [productToEdit, isOpen, categories]);

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCurrentProduct = () => {
    if (!productToEdit) return;
    deleteProduct(productToEdit.id);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleBn.trim() && !titleEn.trim()) {
      addToast(language === 'bn' ? 'পণ্যের নাম পূরণ করুন' : 'Please enter product title', 'error');
      return;
    }

    const finalPrice = Math.max(0, parseFloat(priceStr) || 0);
    const finalOriginalPrice = originalPriceStr.trim() ? Math.max(0, parseFloat(originalPriceStr) || 0) : undefined;
    const finalStock = Math.max(0, parseInt(stockStr, 10) || 0);

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const discountPercentage = finalOriginalPrice && finalOriginalPrice > finalPrice
      ? Math.round(((finalOriginalPrice - finalPrice) / finalOriginalPrice) * 100)
      : undefined;

    if (productToEdit) {
      updateProduct(productToEdit.id, {
        titleBn: titleBn.trim() || titleEn.trim(),
        titleEn: titleEn.trim() || titleBn.trim(),
        category,
        subcategory,
        brand: brand.trim() || 'OneRoof',
        price: finalPrice,
        originalPrice: finalOriginalPrice,
        discountPercentage,
        stock: finalStock,
        images: [imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'],
        descriptionBn,
        descriptionEn,
        tags,
        isFlashSale,
        warranty,
        deliveryTime,
        isFreeShipping,
        shippingInside,
        shippingOutside,
      });
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        titleBn: titleBn.trim() || titleEn.trim(),
        titleEn: titleEn.trim() || titleBn.trim(),
        descriptionBn: descriptionBn || 'প্রিমিয়াম কোয়ালিটি পণ্য।',
        descriptionEn: descriptionEn || 'Premium quality product.',
        category: category || categories[0]?.slug || 'electronics',
        subcategory,
        brand: brand.trim() || 'OneRoof',
        price: finalPrice,
        originalPrice: finalOriginalPrice,
        discountPercentage,
        rating: 4.8,
        reviewCount: 1,
        images: [imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'],
        stock: finalStock,
        isFlashSale,
        soldCount: 0,
        isFeatured: true,
        isNewArrival: true,
        tags: tags.length ? tags : ['নতুন পণ্য', 'অরিজিনাল'],
        specifications: {
          'ব্র্যান্ড': brand.trim() || 'OneRoof',
          'ওয়ারেন্টি': warranty,
          'ডেলিভারি': deliveryTime,
        },
        reviews: [],
        warranty,
        deliveryTime,
        isFreeShipping,
        shippingInside,
        shippingOutside,
      };
      addProduct(newProd);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {productToEdit
                  ? (language === 'bn' ? 'প্রডাক্ট এডিট করুন' : 'Edit Product')
                  : (language === 'bn' ? 'নতুন প্রডাক্ট আপলোড করুন' : 'Upload New Product')}
              </h3>
              <p className="text-[11px] text-slate-300">
                {language === 'bn' ? 'পণ্যের সম্পূর্ণ বিবরণ, মূল্য, ডেলিভারি চার্জ ও ছবি নির্ধারণ করুন' : 'Enter product details, pricing, shipping fee and images'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-slate-900">
          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                পণ্যের নাম (বাংলা) *
              </label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder="যেমন: স্মার্ট ওয়্যারলেস ব্লুটুথ হেডফোন"
                required
                className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Product Title (English)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Smart Wireless Bluetooth Headphone"
                className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                ক্যাটাগরি নির্বাচন করুন *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-900 font-medium bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none capitalize"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug} className="text-slate-900">
                    {c.nameBn} ({c.slug})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                ব্র্যান্ড নাম (Brand)
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Samsung, Apple, OneRoof"
                className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
            
            {/* Subcategory */}
            {categories.find(c => c.slug === category)?.subcategories && categories.find(c => c.slug === category)!.subcategories!.length > 0 && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  সাব-ক্যাটাগরি নির্বাচন করুন
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-slate-900 font-medium bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                >
                  <option value="">-- কোনোটি না (None) --</option>
                  {categories.find(c => c.slug === category)?.subcategories?.map(s => (
                    <option key={s.id} value={s.id}>{language === 'bn' ? s.nameBn : s.nameEn}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">
                  বিক্রয় মূল্য (Price ৳) *
                </label>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  যেমন: 205
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">৳</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={priceStr}
                  onChange={(e) => setPriceStr(toEnglishDigits(e.target.value))}
                  placeholder="205"
                  required
                  className="w-full pl-7 pr-3 py-2 text-xs font-bold text-emerald-700 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                নির্ধারিত মূল্য: <span className="font-bold text-slate-800">৳{priceStr || '0'}</span>
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">
                  আগের মূল্য (Original ৳)
                </label>
                <span className="text-[10px] text-slate-500 font-medium">
                  ঐচ্ছিক
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">৳</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={originalPriceStr}
                  onChange={(e) => setOriginalPriceStr(toEnglishDigits(e.target.value))}
                  placeholder="250"
                  className="w-full pl-7 pr-3 py-2 text-xs text-slate-700 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                ছাড়ের আগের দাম: <span className="font-medium text-slate-600">{originalPriceStr ? `৳${originalPriceStr}` : 'নাই'}</span>
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">
                  মজুদ সংখ্যা (Stock) *
                </label>
                <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                  যেমন: 205
                </span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={stockStr}
                onChange={(e) => setStockStr(toEnglishDigits(e.target.value))}
                placeholder="205"
                required
                className="w-full px-3 py-2 text-xs text-slate-900 font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                মোট স্টক: <span className="font-bold text-slate-800">{stockStr || '0'} টি</span>
              </p>
            </div>
          </div>

          {/* Image Management (URL + Preset + File Upload) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                <span>পণ্যের ছবি (Image URL বা ডিভাইস থেকে আপলোড)</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="w-20 h-20 rounded-xl bg-white border border-slate-300 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-slate-400">ছবি নেই</span>
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-white border border-slate-300 rounded-xl focus:border-indigo-600 outline-none"
                />

                <div className="flex flex-wrap items-center gap-2">
                  <label className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ডিভাইস থেকে ফাইল নির্বাচন করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-500">অথবা নিচের প্রিসেট থেকে বাছুন</span>
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="pt-2 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                জনপ্রিয় ক্যাটাগরি ছবি প্রিসেট:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="text-[11px] px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-800 font-medium transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              পণ্যের বিবরণ (বাংলা)
            </label>
            <textarea
              value={descriptionBn}
              onChange={(e) => setDescriptionBn(e.target.value)}
              rows={2}
              placeholder="পণ্যের গুণাগুণ ও বিশেষত্ব লিখুন..."
              className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none resize-none"
            />
          </div>

          {/* Flash Sale & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                ট্যাগ বা হাইলাইটস (কমা দিয়ে আলাদা করুন)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="যেমন: অরিজিনাল, ডিসকাউন্ট, গরম অফার"
                className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="flashSaleCheck"
                checked={isFlashSale}
                onChange={(e) => setIsFlashSale(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded-sm border-slate-300 focus:ring-orange-500 cursor-pointer"
              />
              <label htmlFor="flashSaleCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                ⚡ ফ্ল্যাশ সেল (Flash Sale) হিসেবে শো করুন
              </label>
            </div>
          </div>

          {/* Delivery & Shipping Settings Section */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>ডেলিভারি চার্জ ও শিপিং সেটিংস</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Free shipping toggle */}
              <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-emerald-200">
                <input
                  type="checkbox"
                  id="prodFreeShipping"
                  checked={isFreeShipping}
                  onChange={(e) => setIsFreeShipping(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="prodFreeShipping" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                  🎁 ফ্রি ডেলিভারি (৳০)
                </label>
              </div>

              {/* Inside Dhaka Shipping */}
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  ঢাকার ভিতরে চার্জ (৳)
                </label>
                <input
                  type="number"
                  value={shippingInside !== undefined ? shippingInside : ''}
                  onChange={(e) =>
                    setShippingInside(e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)))
                  }
                  placeholder="যেমন: ৬০ (ফাঁকা রাখলে ডিফল্ট)"
                  disabled={isFreeShipping}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>

              {/* Outside Dhaka Shipping */}
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  ঢাকার বাইরে চার্জ (৳)
                </label>
                <input
                  type="number"
                  value={shippingOutside !== undefined ? shippingOutside : ''}
                  onChange={(e) =>
                    setShippingOutside(e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)))
                  }
                  placeholder="যেমন: ১২০ (ফাঁকা রাখলে ডিফল্ট)"
                  disabled={isFreeShipping}
                  className="w-full px-3 py-1.5 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 outline-none disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Warranty & Delivery Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                ওয়ারেন্টি পলিসি
              </label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="যেমন: ১ বছরের অফিসিয়াল ব্র্যান্ড ওয়ারেন্টি"
                className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                আনুমানিক ডেলিভারি সময়
              </label>
              <input
                type="text"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                placeholder="যেমন: ২-৩ কার্যদিবস (ঢাকা সিটিতে ২৪ ঘণ্টা)"
                className="w-full px-3 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div>
              {productToEdit && (
                <>
                  {isConfirmingDelete ? (
                    <div className="flex items-center gap-2 bg-rose-50 border border-rose-300 px-3 py-1.5 rounded-xl">
                      <span className="text-xs text-rose-700 font-bold">
                        {language === 'bn' ? 'মুছে ফেলতে নিশ্চিত?' : 'Sure to delete?'}
                      </span>
                      <button
                        type="button"
                        onClick={handleDeleteCurrentProduct}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{language === 'bn' ? 'হ্যাঁ, ডিলিট' : 'Yes, Delete'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsConfirmingDelete(false)}
                        className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                      >
                        {language === 'bn' ? 'বাতিল' : 'Cancel'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsConfirmingDelete(true)}
                      className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'এই প্রডাক্টটি মুছুন' : 'Delete Product'}</span>
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{productToEdit ? 'পরিবর্তন সংরক্ষণ করুন' : 'প্রডাক্ট পাবলিশ করুন'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
