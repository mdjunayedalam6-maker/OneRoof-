import React, { useState } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Check, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Zap,
  Info,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    siteSettings,
    language,
    t,
    setCurrentPage,
    addToCart,
    clearCart,
    toggleWishlist,
    isInWishlist,
    products,
    formatPrice,
    addReview,
    addToast,
    viewProductDetails,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">
          {language === 'bn' ? 'কোনো পণ্য নির্বাচিত হয়নি' : 'No product selected'}
        </h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold"
        >
          {language === 'bn' ? 'শপে ফিরে যান' : 'Back to Shop'}
        </button>
      </div>
    );
  }

  const isSaved = isInWishlist(selectedProduct.id);
  const title = language === 'bn' ? selectedProduct.titleBn : selectedProduct.titleEn;
  const description = language === 'bn' ? selectedProduct.descriptionBn : selectedProduct.descriptionEn;

  const handleVariantSelect = (type: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: option }));
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedQuantity, selectedVariants);
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart(selectedProduct, selectedQuantity, selectedVariants);
    setCurrentPage('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast(
        language === 'bn' ? 'পণ্যটির লিংক কপি করা হয়েছে!' : 'Product link copied to clipboard!',
        'success'
      );
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      addToast(
        language === 'bn' ? 'দয়া করে আপনার মন্তব্য লিখুন' : 'Please write your feedback',
        'error'
      );
      return;
    }
    addReview(selectedProduct.id, reviewRating, reviewComment, reviewName);
    setReviewComment('');
    setShowReviewForm(false);
  };

  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <button onClick={() => setCurrentPage('home')} className="hover:text-emerald-700">
            {t.home}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setCurrentPage('shop')}
            className="hover:text-emerald-700 capitalize"
          >
            {selectedProduct.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{title}</span>
        </div>

        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'শপে ফিরে যান' : 'Back to Shop'}</span>
        </button>
      </div>

      {/* Main Product Layout: Left Image Gallery, Right Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 group">
            <img
              src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {selectedProduct.discountPercentage && (
              <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                -{selectedProduct.discountPercentage}% OFF
              </span>
            )}
            {selectedProduct.isFlashSale && (
              <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-xs font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Zap className="w-3 h-3 fill-slate-950" />
                FLASH SALE
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges Below Image */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'bn' ? '১০০% আসল প্রোডাক্ট' : '100% Authentic'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
              <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{language === 'bn' ? '৭ দিনের রিপ্লেসমেন্ট' : '7 Days Return'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Brand & SKU */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#003882] uppercase bg-blue-50 px-2.5 py-1 rounded-md tracking-wider">
                {selectedProduct.brand}
              </span>
              <span className="text-xs text-slate-400">
                SKU: {selectedProduct.id.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {title}
            </h1>

            {/* Rating and Reviews Counter */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{selectedProduct.rating}</span>
              </div>
              <span className="text-slate-500">
                {selectedProduct.reviewCount} {language === 'bn' ? 'টি কাস্টমার রিভিউ' : 'Customer Reviews'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {t.inStock} ({selectedProduct.stock} {language === 'bn' ? 'টি এভেইলেবল' : 'units left'})
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {formatPrice(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(selectedProduct.originalPrice)}
                </span>
              )}
              {selectedProduct.originalPrice && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {language === 'bn' ? 'সাশ্রয় ' : 'Save '}
                  {formatPrice(selectedProduct.originalPrice - selectedProduct.price)}
                </span>
              )}
            </div>

            {/* Description Short */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {description}
            </p>

            {/* Variants Selector (Color / Size / Weight / Storage) */}
            {selectedProduct.variants && selectedProduct.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                {selectedProduct.variants.map((v) => (
                  <div key={v.type} className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 capitalize">
                      {v.type}: {selectedVariants[v.type] || v.options[0]}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map((opt) => {
                        const isChosen = (selectedVariants[v.type] || v.options[0]) === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleVariantSelect(v.type, opt)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                              isChosen
                                ? 'bg-[#003882] text-white border-[#003882] shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-slate-700">
                {language === 'bn' ? 'পরিমাণ (Quantity):' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-slate-800 bg-white min-w-[36px] text-center">
                  {selectedQuantity}
                </span>
                <button
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="theme-btn-cart py-3.5 px-6 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 transition-all active:scale-98 shadow-md cursor-pointer group whitespace-nowrap"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0" />
                <span className="whitespace-nowrap">{t.addToCart}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="theme-btn-buy theme-shimmer-effect py-3.5 px-6 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 transition-all active:scale-98 shadow-lg cursor-pointer group whitespace-nowrap"
              >
                <Zap className="w-5 h-5 text-amber-200 fill-amber-300 animate-pulse transition-transform group-hover:scale-110 shrink-0" />
                <span className="whitespace-nowrap">{t.buyNow}</span>
              </button>
            </div>

            {/* Wishlist & Share buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`flex items-center gap-1.5 font-semibold transition-colors ${
                  isSaved ? 'text-rose-600' : 'text-slate-600 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>
                  {isSaved 
                    ? (language === 'bn' ? 'উইশলিস্টে সংরক্ষিত' : 'Saved in Wishlist') 
                    : (language === 'bn' ? 'উইশলিস্টে যোগ করুন' : 'Add to Wishlist')}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'bn' ? 'শেয়ার করুন' : 'Share Product'}</span>
              </button>
            </div>
          </div>

          {/* Delivery & Shipping info block */}
          <div className="mt-6 p-4 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>{selectedProduct.deliveryTime || (language === 'bn' ? '২৪-৭২ ঘণ্টা সমগ্র বাংলাদেশ' : '24-72 hours nationwide delivery')}</span>
              </div>
              {selectedProduct.isFreeShipping ? (
                <span className="text-[11px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-full">
                  ফ্রি ডেলিভারি
                </span>
              ) : selectedProduct.shippingFee !== undefined ? (
                <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                  ডেলিভারি চার্জ: {formatPrice(selectedProduct.shippingFee)}
                </span>
              ) : (
                <span className="text-[11px] font-medium text-emerald-800">
                  ঢাকা {formatPrice(siteSettings.shippingFeeInsideDhaka ?? 60)} | ঢাকার বাইরে {formatPrice(siteSettings.shippingFeeOutsideDhaka ?? 120)}
                </span>
              )}
            </div>
            <div className="text-slate-600 text-[11px] flex items-center justify-between pt-1 border-t border-emerald-100">
              <span>{language === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD) উপলব্ধ।' : 'Cash on delivery (COD) available.'}</span>
              {siteSettings.freeShippingThreshold > 0 && !selectedProduct.isFreeShipping && (
                <span className="text-emerald-700 font-medium">
                  {formatPrice(siteSettings.freeShippingThreshold)} টাকার বেশি অর্ডারে ফ্রি ডেলিভারি
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-sm sm:text-base font-bold pb-2 relative transition-colors ${
              activeTab === 'specs'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.specifications}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm sm:text-base font-bold pb-2 relative transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{t.reviews}</span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              {selectedProduct.reviews.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 bg-slate-50 rounded-xl text-xs sm:text-sm">
                  <span className="font-semibold text-slate-500">{key}</span>
                  <span className="font-bold text-slate-800 text-right">{value}</span>
                </div>
              ))}
            </div>

            {selectedProduct.warranty && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold">{language === 'bn' ? 'ওয়ারেন্টি পলিসি: ' : 'Warranty Policy: '}</span>
                  <span>{selectedProduct.warranty}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Reviews & Rating breakdown */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Summary Rating */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-black text-slate-900">{selectedProduct.rating}</div>
                <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(selectedProduct.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {selectedProduct.reviews.length} {language === 'bn' ? 'টি যাচাইকৃত রেটিং' : 'verified ratings'}
                </p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                {t.writeReview}
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-5 bg-slate-50 rounded-2xl border border-emerald-300 space-y-4">
                <h4 className="text-sm font-bold text-slate-800">
                  {language === 'bn' ? 'আপনার মূল্যবান মতামত দিন' : 'Share your review'}
                </h4>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    {language === 'bn' ? 'রেটিং দিন:' : 'Rating:'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder={language === 'bn' ? 'আপনার নাম' : 'Your name'}
                    className="p-2.5 text-xs bg-white border border-slate-300 text-slate-900 font-medium placeholder-slate-400 rounded-xl outline-none focus:border-emerald-600"
                  />
                </div>

                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={language === 'bn' ? 'পণ্যটি সম্পর্কে আপনার বিস্তারিত অভিজ্ঞতা লিখুন...' : 'Write your detailed review here...'}
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 text-slate-900 font-medium placeholder-slate-400 rounded-xl outline-none focus:border-emerald-600"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                  >
                    {language === 'bn' ? 'জমা দিন' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="divide-y divide-slate-100">
              {selectedProduct.reviews.map((rev) => (
                <div key={rev.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <span>{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.2 rounded flex items-center gap-0.5">
                              <Check className="w-3 h-3" />
                              {t.verifiedPurchase}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">{rev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= rev.rating ? 'fill-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 pl-10 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.relatedProducts}
            </h3>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              {language === 'bn' ? 'আরও দেখুন' : 'See more'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Quick Purchase Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 shadow-[0_-6px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
        <div>
          <span className="text-[10px] text-slate-400 font-bold block uppercase leading-tight">
            {language === 'bn' ? 'মোট মূল্য' : 'Total'}
          </span>
          <span className="text-base font-black text-slate-900 leading-tight">
            {formatPrice(selectedProduct.price * selectedQuantity)}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-[270px]">
          <button
            type="button"
            onClick={handleAddToCart}
            className="theme-btn-cart flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{language === 'bn' ? 'কার্টে যোগ' : 'Add to Cart'}</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="theme-btn-buy flex-1 py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 shadow-md cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 text-amber-200 fill-amber-300 shrink-0" />
            <span className="whitespace-nowrap">{language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
