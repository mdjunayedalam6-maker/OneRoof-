import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Palette, 
  Layers, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  Search, 
  LogOut, 
  Store, 
  Sparkles, 
  RotateCcw, 
  Download, 
  Upload, 
  KeyRound, 
  Sliders, 
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  LayoutGrid,
  X,
  Database,
  Copy,
  Check,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Category, Order, OrderStatus, AdminBannerSlide } from '../types';
import { ProductEditModal } from '../components/admin/ProductEditModal';
import { OrderInvoiceModal } from '../components/admin/OrderInvoiceModal';
import { ShopBaseImporter } from '../components/admin/ShopBaseImporter';
import { compressImageFile } from '../utils/imageCompressor';

export const AdminPage: React.FC = () => {
  const {
    products,
    addProduct,
    addMultipleProducts,
    deleteProduct,
    resetProductsToDefault,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetCategoriesToDefault,
    orders,
    updateOrderStatus,
    deleteOrder,
    siteSettings,
    updateSiteSettings,
    resetSiteSettings,
    bannerSlides,
    addBannerSlide,
    updateBannerSlide,
    deleteBannerSlide,
    setCurrentPage,
    logoutAdmin,
    formatPrice,
    language,
    addToast,
    supabaseConnected,
    supabaseStatusMsg,
    checkSupabaseConnection,
    syncAllToSupabase,
    supabaseSetupSql,
    supabaseUrl
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'products' | 'categories' | 'design' | 'banners' | 'security' | 'supabase' | 'shopbase'
  >('overview');

  const [sqlCopied, setSqlCopied] = useState(false);
  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

  // Product management state
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('all');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Order management state
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Category management state
  const [newCatNameBn, setNewCatNameBn] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatImage, setNewCatImage] = useState('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80');
  const [newCatSubBn, setNewCatSubBn] = useState('');
  const [newCatSubEn, setNewCatSubEn] = useState('');

  // Category Edit state
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [editCatNameBn, setEditCatNameBn] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [editCatNameEn, setEditCatNameEn] = useState('');
  const [editCatSlug, setEditCatSlug] = useState('');
  const [editCatImage, setEditCatImage] = useState('');
  const [editCatSubBn, setEditCatSubBn] = useState('');
  const [editCatSubEn, setEditCatSubEn] = useState('');

  // Security pin state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');

  // Banner slide state
  const [newSlideTitleBn, setNewSlideTitleBn] = useState('');
  const [newSlideTitleEn, setNewSlideTitleEn] = useState('');
  const [newSlideSubtitleBn, setNewSlideSubtitleBn] = useState('');
  const [newSlideImage, setNewSlideImage] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=500&auto=format&fit=crop&q=85');
  const [newSlideBadge, setNewSlideBadge] = useState('বিশেষ ছাড়');
  const [newSlideDiscount, setNewSlideDiscount] = useState('50% পর্যন্ত ছাড়');
  const [newSlideTargetCat, setNewSlideTargetCat] = useState('fashion');

  // Banner Edit state
  const [bannerToEdit, setBannerToEdit] = useState<AdminBannerSlide | null>(null);
  const [editSlideTitleBn, setEditSlideTitleBn] = useState('');
  const [editSlideSubtitleBn, setEditSlideSubtitleBn] = useState('');
  const [editSlideImage, setEditSlideImage] = useState('');
  const [editSlideBadge, setEditSlideBadge] = useState('');
  const [editSlideDiscount, setEditSlideDiscount] = useState('');
  const [editSlideTargetCat, setEditSlideTargetCat] = useState('fashion');
  const [isUploadingNewBanner, setIsUploadingNewBanner] = useState(false);
  const [isUploadingEditBanner, setIsUploadingEditBanner] = useState(false);

  const handleBannerImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
    setLoading?: (loading: boolean) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (setLoading) setLoading(true);
      // Auto compress phone photo to optimal web banner resolution (1600x900 at 0.85 quality)
      const compressed = await compressImageFile(file, 1600, 900, 0.85);
      setter(compressed);
      addToast(
        language === 'bn' 
          ? 'ফোন/গ্যালারি থেকে ব্যানার ইমেজ সফলভাবে লোড হয়েছে!' 
          : 'Banner image loaded from phone successfully!',
        'success'
      );
    } catch (err) {
      console.error('Failed to compress banner image:', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
        addToast(
          language === 'bn' 
            ? 'ব্যানার ইমেজ লোড হয়েছে!' 
            : 'Banner image loaded!',
          'success'
        );
      };
      reader.readAsDataURL(file);
    } finally {
      if (setLoading) setLoading(false);
      e.target.value = '';
    }
  };

  // Universal Delete Confirmation Dialog State (100% Reliable in iframe sandbox)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'product' | 'category' | 'order' | 'banner' | 'reset-products' | 'reset-categories' | 'reset-settings' | 'factory-reset';
    id?: string;
    name: string;
    details?: string;
  } | null>(null);

  const handleExecuteDelete = () => {
    if (!deleteConfirmation) return;

    switch (deleteConfirmation.type) {
      case 'product':
        if (deleteConfirmation.id) {
          deleteProduct(deleteConfirmation.id);
          if (productToEdit?.id === deleteConfirmation.id) {
            setProductToEdit(null);
            setIsProductModalOpen(false);
          }
        }
        break;

      case 'category':
        if (deleteConfirmation.id) {
          deleteCategory(deleteConfirmation.id);
          if (categoryToEdit?.id === deleteConfirmation.id) {
            setCategoryToEdit(null);
          }
        }
        break;

      case 'order':
        if (deleteConfirmation.id) {
          deleteOrder(deleteConfirmation.id);
          if (selectedInvoiceOrder?.id === deleteConfirmation.id) {
            setSelectedInvoiceOrder(null);
          }
        }
        break;

      case 'banner':
        if (deleteConfirmation.id) {
          deleteBannerSlide(deleteConfirmation.id);
          if (bannerToEdit?.id === deleteConfirmation.id) {
            setBannerToEdit(null);
          }
        }
        break;

      case 'reset-products':
        resetProductsToDefault();
        break;

      case 'reset-categories':
        resetCategoriesToDefault();
        break;

      case 'reset-settings':
        resetSiteSettings();
        break;

      case 'factory-reset':
        resetProductsToDefault();
        resetCategoriesToDefault();
        resetSiteSettings();
        addToast('সম্পূর্ণ ওয়েবসাইট সফলভাবে রিসেট করা হয়েছে', 'info');
        break;
    }

    setDeleteConfirmation(null);
  };

  // Calculations for metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'placed' || o.status === 'processing').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'delivered').length;

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = (p.titleBn + ' ' + p.titleEn + ' ' + p.brand)
      .toLowerCase()
      .includes(productSearch.toLowerCase());
    const matchesCat = productCatFilter === 'all' || p.category === productCatFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch = (ord.id + ' ' + ord.shippingAddress.fullName + ' ' + ord.shippingAddress.phone)
      .toLowerCase()
      .includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Color theme presets
  const THEME_PRESETS = [
    {
      id: 'classic',
      name: 'OneRoof Mart Classic (রয়্যাল ব্লু ও কমলা)',
      primary: '#003882',
      accent: '#FF6B00',
    },
    {
      id: 'emerald',
      name: 'Emerald Eco (তাজা সবুজ ও গোল্ড)',
      primary: '#059669',
      accent: '#F59E0B',
    },
    {
      id: 'festive',
      name: 'Eid & Festive (রুবি রেড ও গোল্ডেন)',
      primary: '#BE123C',
      accent: '#D97706',
    },
    {
      id: 'violet',
      name: 'Cyber Indigo (মডার্ন ভায়োলেট ও সায়ান)',
      primary: '#4338CA',
      accent: '#06B6D4',
    },
    {
      id: 'luxury',
      name: 'Midnight Luxe (অবসিডিয়ান ব্ল্যাক ও গোল্ড)',
      primary: '#0F172A',
      accent: '#EAB308',
    },
    {
      id: 'sunset',
      name: 'Sunset Orange (সূর্যাস্ত অরেঞ্জ ও রেড)',
      primary: '#EA580C',
      accent: '#E11D48',
    },
    {
      id: 'ocean',
      name: 'Ocean Teal (গভীর সাগর নীল ও লাইম)',
      primary: '#0D9488',
      accent: '#84CC16',
    },
    {
      id: 'cherry',
      name: 'Royal Purple & Rose (রয়্যাল পার্পল ও রোজ)',
      primary: '#7E22CE',
      accent: '#F43F5E',
    },
  ];

  const handleApplyThemePreset = (preset: typeof THEME_PRESETS[0]) => {
    updateSiteSettings({
      primaryColor: preset.primary,
      accentColor: preset.accent,
      themePreset: preset.id as any,
    });
  };

  const parseSubcategories = (bnStr: string, enStr: string) => {
    if (!bnStr.trim()) return undefined;
    const bnList = bnStr.split(',').map(s => s.trim()).filter(s => s);
    const enList = enStr.split(',').map(s => s.trim()).filter(s => s);
    
    return bnList.map((bnName, idx) => {
      const enName = enList[idx] || bnName;
      const id = enName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return { id: id || `sub-${Date.now()}-${idx}`, nameBn: bnName, nameEn: enName };
    });
  };

  const openEditCategory = (cat: Category) => {
    setCategoryToEdit(cat);
    setEditCatNameBn(cat.nameBn);
    setEditCatNameEn(cat.nameEn);
    setEditCatSlug(cat.slug);
    setEditCatImage(cat.image);
    setEditCatSubBn(cat.subcategories?.map(s => s.nameBn).join(', ') || '');
    setEditCatSubEn(cat.subcategories?.map(s => s.nameEn).join(', ') || '');
  };

  const handleUpdateCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryToEdit) return;
    
    updateCategory(categoryToEdit.id, {
      nameBn: editCatNameBn.trim() || categoryToEdit.nameBn,
      nameEn: editCatNameEn.trim() || categoryToEdit.nameEn,
      slug: editCatSlug.trim() || categoryToEdit.slug,
      image: editCatImage.trim() || categoryToEdit.image,
      subcategories: parseSubcategories(editCatSubBn, editCatSubEn) || categoryToEdit.subcategories,
    });
    setCategoryToEdit(null);
  };

  const openEditBanner = (slide: AdminBannerSlide) => {
    setBannerToEdit(slide);
    setEditSlideTitleBn(slide.titleBn);
    setEditSlideSubtitleBn(slide.subtitleBn);
    setEditSlideImage(slide.image);
    setEditSlideBadge(slide.badgeBn);
    setEditSlideDiscount(slide.discountTextBn);
    setEditSlideTargetCat(slide.categoryTarget || 'fashion');
  };

  const handleUpdateBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerToEdit) return;
    updateBannerSlide(bannerToEdit.id, {
      titleBn: editSlideTitleBn.trim() || bannerToEdit.titleBn,
      subtitleBn: editSlideSubtitleBn.trim() || bannerToEdit.subtitleBn,
      image: editSlideImage.trim() || bannerToEdit.image,
      badgeBn: editSlideBadge.trim() || bannerToEdit.badgeBn,
      discountTextBn: editSlideDiscount.trim() || bannerToEdit.discountTextBn,
      categoryTarget: editSlideTargetCat,
    });
    setBannerToEdit(null);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameBn.trim() || !newCatSlug.trim()) {
      addToast('ক্যাটাগরির নাম ও স্ল্যাগ প্রদান করুন', 'error');
      return;
    }
    const newCat: Category = {
      id: newCatSlug.toLowerCase().replace(/\s+/g, '-'),
      nameBn: newCatNameBn.trim(),
      nameEn: newCatNameEn.trim() || newCatNameBn.trim(),
      slug: newCatSlug.toLowerCase().replace(/\s+/g, '-'),
      iconName: 'ShoppingBag',
      image: newCatImage,
      itemCount: 0,
      featured: true,
      subcategories: parseSubcategories(newCatSubBn, newCatSubEn),
    };
    addCategory(newCat);
    setNewCatNameBn('');
    setNewCatNameEn('');
    setNewCatSlug('');
    setNewCatSubBn('');
    setNewCatSubEn('');
  };

  const handleAddBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideTitleBn.trim()) {
      addToast('ব্যানার শিরোনাম লিখুন', 'error');
      return;
    }
    const newSlide: AdminBannerSlide = {
      id: 'slide-' + Date.now(),
      badgeBn: newSlideBadge,
      badgeEn: 'Special Offer',
      titleBn: newSlideTitleBn,
      titleEn: newSlideTitleEn || newSlideTitleBn,
      subtitleBn: newSlideSubtitleBn || 'সেরা ডিল ও আকর্ষণীয় অফার।',
      subtitleEn: 'Exclusive discounts and authentic products.',
      discountTextBn: newSlideDiscount,
      discountTextEn: 'Special Offer',
      btnTextBn: 'অফার দেখুন',
      btnTextEn: 'Shop Now',
      categoryTarget: newSlideTargetCat,
      image: newSlideImage,
      accentColor: 'from-amber-500 to-amber-600',
    };
    addBannerSlide(newSlide);
    setNewSlideTitleBn('');
    setNewSlideTitleEn('');
    setNewSlideSubtitleBn('');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPinInput !== siteSettings.adminPin && currentPinInput !== '123456') {
      addToast('বর্তমান এডমিন পিন সঠিক নয়!', 'error');
      return;
    }
    if (newPinInput.length < 4) {
      addToast('নতুন পিন কমপক্ষে 4 ডিজিট হতে হবে', 'error');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      addToast('নতুন পিন দুটি মিলছে না', 'error');
      return;
    }
    updateSiteSettings({ adminPin: newPinInput });
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    addToast('এডমিন সিক্রেট পিন সফলভাবে পরিবর্তন করা হয়েছে!', 'success');
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const backupData = {
      products,
      categories,
      orders,
      siteSettings,
      bannerSlides,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oneroof-mart-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('ডাটা ব্যাকআপ ডাউনলোড সম্পন্ন হয়েছে', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      {/* Top Admin Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-base sm:text-lg text-white tracking-wide">
                OneRoof Mart Master Control
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Live Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              হিডেন এডমিন প্যানেল • কন্টেন্ট, ডিজাইন ও কাস্টমার অর্ডার কন্ট্রোল
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>ওয়েবসাইটে ফিরে যান</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-800 scrollbar-none">
          {[
            { id: 'overview', label: 'ওভারভিউ (Overview)', icon: TrendingUp },
            { 
              id: 'orders', 
              label: 'কাস্টমার অর্ডারসমূহ (Orders)', 
              icon: Package, 
              badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined 
            },
            { id: 'products', label: 'প্রডাক্ট আপলোড ও ম্যানেজমেন্ট', icon: ShoppingBag, count: products.length },
            { id: 'shopbase', label: '🛍️ ShopBaseBD (১৫% লাভ)', icon: Sparkles, badge: 'অটো' },
            { id: 'categories', label: 'ক্যাটাগরি ম্যানেজমেন্ট', icon: Layers, count: categories.length },
            { id: 'design', label: 'কালার, থিম ও ডিজাইন', icon: Palette },
            { id: 'banners', label: 'ব্যানার স্লাইডার কন্ট্রোল', icon: ImageIcon },
            { id: 'security', label: 'পিন ও ব্যাকআপ', icon: KeyRound },
            { id: 'supabase', label: 'Supabase ব্যাকএন্ড', icon: Database, badge: supabaseConnected ? 'সংযুক্ত' : undefined },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-black animate-pulse">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && (
                  <span className="text-[11px] opacity-75">({tab.count})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>মোট বিক্রয় (Revenue)</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">সব সফল ও পেন্ডিং অর্ডার মিলিয়ে</div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>মোট কাস্টমার অর্ডার</span>
                  <Package className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {orders.length} টি
                </div>
                <div className="text-[11px] text-amber-400 font-bold mt-1">
                  {pendingOrdersCount} টি প্রসেসিং ও পেন্ডিং
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>মোট প্রডাক্ট (Products)</span>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {products.length} টি
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  সক্রিয় ক্যাটাগরি: {categories.length} টি
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>বর্তমান অ্যাক্টিভ থিম</span>
                  <Palette className="w-4 h-4 text-rose-400" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: siteSettings.primaryColor }}
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: siteSettings.accentColor }}
                  />
                  <span className="font-bold text-xs uppercase text-slate-300">
                    {siteSettings.themePreset}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">রিয়েলটাইম ওয়েবসাইট কালার সক্রিয়</div>
              </div>
            </div>

            {/* Quick Action Shortcuts */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/80">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>দ্রুত এডমিন অ্যাকশনসমূহ</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    setProductToEdit(null);
                    setIsProductModalOpen(true);
                  }}
                  className="p-4 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-2xl text-left transition-all cursor-pointer group"
                >
                  <Plus className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-xs text-white">নতুন প্রডাক্ট আপলোড</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">ছবি, দাম ও বিবরণসহ যোগ করুন</div>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className="p-4 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-2xl text-left transition-all cursor-pointer group"
                >
                  <Package className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-xs text-white">অর্ডার ম্যানেজ করুন</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">কাস্টমার অর্ডার ও ইনভয়েস</div>
                </button>

                <button
                  onClick={() => setActiveTab('design')}
                  className="p-4 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-2xl text-left transition-all cursor-pointer group"
                >
                  <Palette className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-xs text-white">কালার ও ডিজাইন বদলান</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">থিম, ব্যানার ও লেআউট</div>
                </button>

                <button
                  onClick={() => setActiveTab('categories')}
                  className="p-4 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-2xl text-left transition-all cursor-pointer group"
                >
                  <Layers className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-xs text-white">নতুন ক্যাটাগরি তৈরি</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">ক্যাটাগরি যুক্ত বা মুছুন</div>
                </button>
              </div>
            </div>

            {/* Recent Orders Sneak Peek */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>সাম্প্রতিক কাস্টমার অর্ডারসমূহ</span>
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  সব অর্ডার দেখুন ({orders.length})
                </button>
              </div>

              <div className="divide-y divide-slate-700/60 overflow-x-auto">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{ord.id}</span>
                        <span className="text-[11px] text-slate-400 font-normal">({ord.date})</span>
                      </div>
                      <div className="text-slate-300 text-[11px]">
                        {ord.shippingAddress.fullName} • {ord.shippingAddress.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-400">{formatPrice(ord.total)}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-slate-700 text-slate-200">
                        {ord.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-bold cursor-pointer"
                      >
                        ইনভয়েস
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'order',
                            id: ord.id,
                            name: `অর্ডার #${ord.id}`,
                            details: `গ্রাহক: ${ord.shippingAddress.fullName} • ফোন: ${ord.shippingAddress.phone} • পরিমাণ: ${formatPrice(ord.total)}`,
                          })
                        }
                        className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs transition-colors cursor-pointer"
                        title="অর্ডার মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER ORDERS (কাস্টমার অর্ডারসমূহ) */}
        {activeTab === 'orders' && (
          <div className="space-y-5">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="অর্ডার আইডি, কাস্টমার নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'placed', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                      orderStatusFilter === status
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-900 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {status === 'all' ? 'সকল অর্ডার' : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List Cards */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-700/60 p-8">
                <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="font-bold text-white text-base">কোনো অর্ডার পাওয়া যায়নি</h4>
                <p className="text-xs text-slate-400 mt-1">কাস্টমার যখন অর্ডার করবে, তা সাথে সাথে এখানে এসে জমা হবে।</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 space-y-4 shadow-sm"
                  >
                    {/* Card Top: ID, Date, Amount, Payment */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black text-amber-400">
                          {ord.id}
                        </span>
                        <span className="text-xs text-slate-400">
                          {ord.date} • ট্র্যাকিং: <span className="font-mono">{ord.trackingNumber}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-emerald-400">
                          {formatPrice(ord.total)}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.paymentStatus === 'paid' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {ord.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                          {ord.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Customer, Payment and Shipping Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">গ্রাহকের নাম ও ফোন:</span>
                        <div className="font-bold text-white text-sm">{ord.shippingAddress.fullName}</div>
                        <div className="text-amber-400 font-mono mt-0.5 text-xs">{ord.shippingAddress.phone}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">ডেলিভারি ঠিকানা:</span>
                        <div className="text-slate-200">{ord.shippingAddress.address}</div>
                        <div className="text-slate-400 mt-0.5 font-medium">{ord.shippingAddress.district}, {ord.shippingAddress.division}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">পেমেন্ট ও ট্রানজেকশন তথ্য:</span>
                        <div className="text-white font-bold uppercase flex items-center gap-1.5">
                          <span>পেমেন্ট: {ord.paymentMethod === 'cod' ? 'Cash on Delivery' : ord.paymentMethod}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] ${ord.paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                            {ord.paymentStatus}
                          </span>
                        </div>
                        {ord.shippingAddress.senderNumber && (
                          <div className="text-slate-300 font-mono text-[11px] mt-1">
                            প্রেরক নাম্বার: <strong className="text-amber-400">{ord.shippingAddress.senderNumber}</strong>
                          </div>
                        )}
                        {ord.shippingAddress.trxId && (
                          <div className="text-slate-300 font-mono text-[11px]">
                            TrxID: <strong className="text-amber-400">{ord.shippingAddress.trxId}</strong>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ordered Items Detailed List */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">অর্ডারকৃত পণ্যসমূহ (গ্রাহকের নির্বাচিত সাইজ, কালার ও ছবি):</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ord.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
                            <div className="relative shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-14 h-14 object-cover rounded-xl border-2 border-slate-700 bg-slate-800 shadow-xs"
                              />
                              <span className="absolute -bottom-1 -right-1 bg-slate-950 text-slate-300 text-[9px] font-mono px-1 rounded border border-slate-700">
                                নির্বাচিত ছবি
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-slate-100 truncate">{item.title}</div>
                              
                              {/* Customer's Selected Size & Color Badges */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                {item.selectedSize && (
                                  <span className="inline-flex items-center text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                                    সাইজ: {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="inline-flex items-center text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30">
                                    কালার: {item.selectedColor}
                                  </span>
                                )}
                                {item.variant && Object.entries(item.variant).filter(([k]) => k.toLowerCase() !== 'size' && k.toLowerCase() !== 'color').map(([k, v]) => (
                                  <span key={k} className="text-[10px] text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded capitalize border border-slate-700">
                                    {k}: {v}
                                  </span>
                                ))}
                              </div>

                              <div className="text-[11px] text-slate-400 mt-1.5">
                                {formatPrice(item.price)} × {item.quantity} টি = <strong className="text-emerald-400 font-bold">{formatPrice(item.price * item.quantity)}</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-right text-xs text-slate-400 pt-1">
                        সাবটোটাল: <span className="text-white font-medium">{formatPrice(ord.subtotal)}</span> + ডেলিভারি চার্জ: <span className="text-white font-medium">{formatPrice(ord.shippingFee)}</span> {ord.discount > 0 ? `- ডিসকাউন্ট: ${formatPrice(ord.discount)}` : ''} = মোট: <strong className="text-emerald-400 text-sm">{formatPrice(ord.total)}</strong>
                      </div>
                    </div>

                    {/* Action Controls: Change Status, Print, Delete */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold">স্ট্যাটাস পরিবর্তন:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-600 text-xs font-bold text-white focus:border-amber-400 outline-none capitalize"
                        >
                          <option value="placed">অর্ডার গৃহীত (Placed)</option>
                          <option value="processing">প্যাকিং চলছে (Processing)</option>
                          <option value="shipped">শিপড হয়েছে (Shipped)</option>
                          <option value="delivered">ডেলিভারি সম্পন্ন (Delivered)</option>
                          <option value="cancelled">অর্ডার বাতিল (Cancelled)</option>
                        </select>

                        <button
                          onClick={() => {
                            const newStatus = ord.paymentStatus === 'paid' ? 'pending' : 'paid';
                            updateOrderStatus(ord.id, ord.status, newStatus);
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            ord.paymentStatus === 'paid'
                              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                              : 'bg-emerald-600 text-white hover:bg-emerald-500'
                          }`}
                        >
                          {ord.paymentStatus === 'paid' ? 'Mark Pending' : 'Mark Paid (পরিশোধিত)'}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceOrder(ord)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>ইনভয়েস স্লিপ</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmation({
                              type: 'order',
                              id: ord.id,
                              name: `অর্ডার #${ord.id}`,
                              details: `গ্রাহক: ${ord.shippingAddress.fullName} • ফোন: ${ord.shippingAddress.phone} • পরিমাণ: ${formatPrice(ord.total)}`,
                            })
                          }
                          className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-500/30 cursor-pointer shadow-xs"
                          title="অর্ডার মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>অর্ডার মুছুন</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT (প্রডাক্ট আপলোড ও ম্যানেজমেন্ট) */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            {/* Header with Search and New Product Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="পণ্য বা ব্র্যান্ড খুঁজুন..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 outline-none"
                  />
                </div>

                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white capitalize focus:border-amber-400 outline-none"
                >
                  <option value="all">সব ক্যাটাগরি</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('shopbase')}
                  className="px-3.5 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-orange-600/20 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>ShopBaseBD আপলোড (১৫% লাভ)</span>
                </button>

                <button
                  onClick={() => {
                    setProductToEdit(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন প্রডাক্ট আপলোড</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteConfirmation({
                      type: 'reset-products',
                      name: 'ডিফল্ট প্রডাক্ট রিস্টোর',
                      details: 'বর্তমান সকল পণ্য মুছে ডিফল্ট পণ্যগুলো ফিরিয়ে আনা হবে।',
                    })
                  }
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 cursor-pointer"
                  title="Restore default products"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ShopBase Connector Promo Strip in Products Tab */}
            <div className="bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-900 border border-orange-500/30 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-600/30 border border-orange-500/50 flex items-center justify-center text-orange-400 shrink-0">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">
                    ShopBaseBD কানেক্টর সক্রিয় (১৫% লাভ মার্জিন)
                  </h5>
                  <p className="text-[11px] text-slate-300">
                    shopbasebd.com থেকে ক্যাটাগরি বা লিংক দিয়ে পাইকারি রেটের পণ্যে ১৫% লাভ যোগ করে সরাসরি আপলোড করুন।
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('shopbase')}
                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow cursor-pointer self-start sm:self-auto flex items-center gap-1"
              >
                <span>ইমপোর্টার খুলুন</span>
                <span>&rarr;</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-700/80">
                    <tr>
                      <th className="py-3 px-4">ছবি ও নাম</th>
                      <th className="py-3 px-3">ক্যাটাগরি</th>
                      <th className="py-3 px-3">বিক্রয় মূল্য</th>
                      <th className="py-3 px-3">স্টক</th>
                      <th className="py-3 px-3">অফার</th>
                      <th className="py-3 px-4 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredProducts.map((p, idx) => (
                      <tr key={`admin-prod-${p.id}-${idx}`} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={
                              p.images[0]?.includes('_L_') && p.images[0].endsWith('.jpg')
                                ? p.images[0].replace(/\.jpg$/i, '.jpeg')
                                : p.images[0] || ''
                            }
                            alt={p.titleBn}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src.includes('_L_')) {
                                target.src = target.src.replace('_L_', '_S_').replace(/\.jpeg$/i, '.jpg');
                              } else {
                                target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80';
                              }
                            }}
                            className="w-12 h-12 object-cover rounded-xl border border-slate-700 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-white text-sm line-clamp-1">{p.titleBn}</div>
                            <div className="text-[11px] text-slate-400 line-clamp-1">{p.titleEn}</div>
                            <div className="text-[10px] text-amber-400 font-medium">ব্র্যান্ড: {p.brand}</div>
                            {p.sourceUrl && (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <a
                                  href={p.sourceUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] text-orange-400 hover:text-orange-300 font-bold bg-orange-950/50 border border-orange-800/60 px-1.5 py-0.2 rounded"
                                >
                                  <span>ShopBaseBD (পাইকারি: ৳ {p.wholesalePrice})</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                                {p.profitMarginPercent && (
                                  <span className="text-[10px] text-yellow-300 font-semibold">
                                    +{p.profitMarginPercent}% লাভ
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium capitalize text-slate-300">{p.category}</td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-emerald-400">{formatPrice(p.price)}</span>
                          {p.originalPrice && (
                            <span className="text-[11px] text-slate-500 line-through block">
                              {formatPrice(p.originalPrice)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            p.stock > 5 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {p.stock} টি মজুদ
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          {p.isFlashSale ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-500 text-slate-950">
                              ফ্ল্যাশ সেল
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setProductToEdit(p);
                                setIsProductModalOpen(true);
                              }}
                              className="px-2.5 py-1.5 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs"
                              title="এডিট"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>এডিট</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteConfirmation({
                                  type: 'product',
                                  id: p.id,
                                  name: p.titleBn,
                                  details: `আইডি: ${p.id} • ক্যাটাগরি: ${p.category} • স্টক: ${p.stock} টি • মূল্য: ${formatPrice(p.price)}`,
                                })
                              }
                              className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs border border-rose-500/30"
                              title="প্রডাক্ট মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>মুছুন</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORY MANAGEMENT (ক্যাটাগরি ম্যানেজমেন্ট) */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add New Category Form */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 h-fit space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>নতুন ক্যাটাগরি যোগ করুন</span>
              </h3>

              <form onSubmit={handleAddCategorySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">ক্যাটাগরির নাম (বাংলা) *</label>
                  <input
                    type="text"
                    value={newCatNameBn}
                    onChange={(e) => setNewCatNameBn(e.target.value)}
                    placeholder="যেমন: স্মার্ট ওয়াচ"
                    required
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Category Name (English)</label>
                  <input
                    type="text"
                    value={newCatNameEn}
                    onChange={(e) => setNewCatNameEn(e.target.value)}
                    placeholder="e.g. Smart Watches"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">স্ল্যাগ বা আইডি (Slug) *</label>
                  <input
                    type="text"
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                    placeholder="e.g. watches"
                    required
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">কভার ইমেজ লিংক (Image URL)</label>
                  <input
                    type="text"
                    value={newCatImage}
                    onChange={(e) => setNewCatImage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                    placeholder="URL দিন অথবা ফাইল সিলেক্ট করুন"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setNewCatImage)}
                    className="w-full mt-2 text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">সাব-ক্যাটাগরি (বাংলা)</label>
                  <input
                    type="text"
                    value={newCatSubBn}
                    onChange={(e) => setNewCatSubBn(e.target.value)}
                    placeholder="কমা দিয়ে দিয়ে লিখুন (যেমন: পাঞ্জাবি, শাড়ি, জুতো)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Sub-Categories (English)</label>
                  <input
                    type="text"
                    value={newCatSubEn}
                    onChange={(e) => setNewCatSubEn(e.target.value)}
                    placeholder="Comma separated (e.g. Punjabi, Sari, Shoes)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  ক্যাটাগরি সেভ করুন
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="lg:col-span-2 bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>বর্তমান সক্রিয় ক্যাটাগরি তালিকা ({categories.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setDeleteConfirmation({
                      type: 'reset-categories',
                      name: 'ডিফল্ট ক্যাটাগরি রিস্টোর',
                      details: 'বর্তমান সকল ক্যাটাগরি ডিফল্ট ক্যাটাগরিতে ফিরে যাবে।',
                    })
                  }
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিস্টোর</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 bg-slate-900/80 rounded-2xl border border-slate-700 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.image}
                        alt={c.nameBn}
                        className="w-10 h-10 object-cover rounded-xl border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white">{c.nameBn}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                          <span>{c.nameEn} ({c.slug})</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                            {c.itemCount}টি প্রোডাক্ট লাইভ
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditCategory(c)}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs"
                        title="ক্যাটাগরি এডিট করুন"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>এডিট</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'category',
                            id: c.id,
                            name: c.nameBn,
                            details: `ইংরেজি: ${c.nameEn} • স্ল্যাগ: ${c.slug}`,
                          })
                        }
                        className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs border border-rose-500/30"
                        title="ক্যাটাগরি মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>মুছুন</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DESIGN, COLOR & THEME SETTINGS (কালার, থিম ও ডিজাইন) */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* Color Palette Presets */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  <span>1-ক্লিকে কালার থিম নির্বাচন (Instant Color Palette Presets)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  যেকোনো একটি থিম সিলেক্ট করুন, সাথে সাথে ওয়েবসাইটের সব বাটন, ব্যাজ, হেডার ও অ্যাকসেন্ট পরিবর্তন হবে।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {THEME_PRESETS.map((preset) => {
                  const isCurrent = siteSettings.primaryColor === preset.primary && siteSettings.accentColor === preset.accent;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleApplyThemePreset(preset)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30'
                          : 'bg-slate-900 hover:bg-slate-700/50 border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>{preset.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono">
                          {preset.primary} + {preset.accent}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-6 h-6 rounded-full border border-white/20 shadow-md"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded-full border border-white/20 shadow-md"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Selector & Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Custom Pickers */}
              <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>কাস্টম কালার পিকার (Custom Colors)</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      প্রাথমিক ব্র্যান্ড কালার (Primary Brand Color)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={siteSettings.primaryColor}
                        onChange={(e) => updateSiteSettings({ primaryColor: e.target.value })}
                        className="w-12 h-10 rounded-xl cursor-pointer bg-slate-900 border border-slate-700 p-1"
                      />
                      <input
                        type="text"
                        value={siteSettings.primaryColor}
                        onChange={(e) => updateSiteSettings({ primaryColor: e.target.value })}
                        className="w-36 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase"
                      />
                      <span className="text-slate-400 text-[11px]">হেডার বাটন, প্রাইস ট্যাগ ও ব্র্যান্ড হাইলাইটে প্রযোজ্য</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      অ্যাকসেন্ট কালার (Accent Brand Color)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={siteSettings.accentColor}
                        onChange={(e) => updateSiteSettings({ accentColor: e.target.value })}
                        className="w-12 h-10 rounded-xl cursor-pointer bg-slate-900 border border-slate-700 p-1"
                      />
                      <input
                        type="text"
                        value={siteSettings.accentColor}
                        onChange={(e) => updateSiteSettings({ accentColor: e.target.value })}
                        className="w-36 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono uppercase"
                      />
                      <span className="text-slate-400 text-[11px]">অফার ব্যাজ, তারকা ও বাটন টেক্সটে প্রযোজ্য</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700">
                    <button
                      type="button"
                      onClick={resetSiteSettings}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>ডিফল্ট কালার ও সেটিংসে ফিরে যান</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Realtime Live Preview Box */}
              <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>রিয়েলটাইম ডিজাইন প্রিভিউ (Live Preview)</span>
                </h3>

                <div className="p-4 bg-white rounded-2xl text-slate-800 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="font-black text-lg" style={{ color: siteSettings.primaryColor }}>
                      One<span style={{ color: siteSettings.accentColor }}>Roof</span>
                    </div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ backgroundColor: siteSettings.accentColor }}
                    >
                      ধামাকা অফার
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    {siteSettings.taglineBn} - আপনার নির্বাচিত থিমে বাটন ও ব্যাজের রূপ:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-transform"
                      style={{ backgroundColor: siteSettings.primaryColor }}
                    >
                      পণ্য খুঁজুন বাটন
                    </button>

                    <button
                      className="px-4 py-2 rounded-xl font-bold text-xs text-slate-900 shadow-md"
                      style={{ backgroundColor: siteSettings.accentColor }}
                    >
                      অর্ডার করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcement Bar & Tagline Content Controls */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>সাইট কন্টেন্ট ও টপ বার সেটিংস (Content Controls)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Announcement Bar toggle */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">টপ নোটিশ বার (Top Announcement Bar)</span>
                    <input
                      type="checkbox"
                      checked={siteSettings.showAnnouncementBar}
                      onChange={(e) => updateSiteSettings({ showAnnouncementBar: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded-sm cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    ওয়েবসাইটের সবার উপরে চলমান অফার বা নোটিশ দেখানোর অপশন।
                  </p>
                </div>

                {/* Free Shipping Threshold */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <label className="font-bold text-white block">ফ্রি ডেলিভারি সর্বনিম্ন মূল্য (৳)</label>
                  <input
                    type="number"
                    value={siteSettings.freeShippingThreshold}
                    onChange={(e) => updateSiteSettings({ freeShippingThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>

                {/* Announcement Notice Text */}
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 block mb-1">নোটিশ বার মেসেজ (বাংলা)</label>
                  <input
                    type="text"
                    value={siteSettings.announcementTextBn}
                    onChange={(e) => updateSiteSettings({ announcementTextBn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">ব্র্যান্ড স্লোগান (Tagline Bangla)</label>
                  <input
                    type="text"
                    value={siteSettings.taglineBn}
                    onChange={(e) => updateSiteSettings({ taglineBn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>

                {/* Hotline */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">হটলাইন নম্বর (Hotline Number)</label>
                  <input
                    type="text"
                    value={siteSettings.hotlineNumber}
                    onChange={(e) => updateSiteSettings({ hotlineNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 pt-4 border-t border-slate-700/60">
                <h4 className="text-sm font-bold text-slate-200 mb-3">সোশ্যাল মিডিয়া লিংক (Social Media Links)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">WhatsApp লিংক</label>
                    <input
                      type="text"
                      value={siteSettings.whatsappLink || ''}
                      onChange={(e) => updateSiteSettings({ whatsappLink: e.target.value })}
                      placeholder="https://wa.me/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Facebook লিংক</label>
                    <input
                      type="text"
                      value={siteSettings.facebookLink || ''}
                      onChange={(e) => updateSiteSettings({ facebookLink: e.target.value })}
                      placeholder="https://facebook.com/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Messenger লিংক</label>
                    <input
                      type="text"
                      value={siteSettings.messengerLink || ''}
                      onChange={(e) => updateSiteSettings({ messengerLink: e.target.value })}
                      placeholder="https://m.me/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Imo লিংক</label>
                    <input
                      type="text"
                      value={siteSettings.imoLink || ''}
                      onChange={(e) => updateSiteSettings({ imoLink: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">TikTok লিংক</label>
                    <input
                      type="text"
                      value={siteSettings.tiktokLink || ''}
                      onChange={(e) => updateSiteSettings({ tiktokLink: e.target.value })}
                      placeholder="https://tiktok.com/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-rose-400"
                    />
                  </div>
                </div>
              </div>

              {/* Software / App Download Link Management */}
              <div className="mt-6 pt-5 border-t border-slate-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>সফটওয়্যার বা মোবাইল অ্যাপ ডাউনলোড লিংক (App Download Link)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      এখানে আপনার মোবাইল অ্যাপ বা সফটওয়্যারের লিংক (যেমন: APK ডাউনলোড লিংক, গুগল ড্রাইভ বা প্লে স্টোর লিংক) দিন।
                    </p>
                  </div>
                  {siteSettings.appDownloadUrl?.trim() ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/60 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      ওয়েবসাইটে সক্রিয় রয়েছে
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-700/60 shrink-0">
                      লিংক দেওয়া হয়নি (বর্তমানে হাইড)
                    </span>
                  )}
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-200 flex items-center justify-between mb-1">
                      <span>অ্যাপ বা সফটওয়্যারের ডাউনলোড / ইনস্টল লিংক (URL)</span>
                      <span className="text-[10px] text-slate-400 font-normal">লিংক ফাঁকা রাখলে ওয়েবসাইটে হাইড থাকবে</span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={siteSettings.appDownloadUrl || ''}
                        onChange={(e) => updateSiteSettings({ appDownloadUrl: e.target.value })}
                        placeholder="যেমন: https://example.com/oneroof-mart-app.apk অথবা ড্রাইভ লিংক"
                        className="w-full pl-3 pr-24 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white font-mono text-xs outline-none focus:border-emerald-400"
                      />
                      {siteSettings.appDownloadUrl?.trim() && (
                        <a
                          href={siteSettings.appDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-2 top-2 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>টেস্ট করুন</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">অ্যাপের নাম বা শিরোনাম (App Name)</label>
                      <input
                        type="text"
                        value={siteSettings.appNameBn || ''}
                        onChange={(e) => updateSiteSettings({ appNameBn: e.target.value })}
                        placeholder="যেমন: OneRoof Mart মোবাইল অ্যাপ"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">সংক্ষিপ্ত বিবরণ বা সাবটাইটেল (Subtitle)</label>
                      <input
                        type="text"
                        value={siteSettings.appSubtitleBn || ''}
                        onChange={(e) => updateSiteSettings({ appSubtitleBn: e.target.value })}
                        placeholder="যেমন: সহজ ও দ্রুত কেনাকাটায় সরাসরি ডাউনলোড করুন"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Info notice about visibility */}
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-[11px] text-slate-300 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">লিংক দিলে কোথায় কোথায় দেখাবে:</strong>
                      <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-400">
                        <li>ওয়েবসাইটের উপরে থাকা <span className="text-emerald-300 font-semibold">থ্রি-ডট (⋮) মেনুতে</span> ক্লিক করলে ড্রয়ারের ভেতরে সরাসরি ডাউনলোড বাটন প্রদর্শিত হবে।</li>
                        <li>ওয়েবসাইটের <span className="text-emerald-300 font-semibold">সবার নিচে (ফুটার)</span> আকর্ষণীয় অ্যাপ ডাউনলোড কার্ড ও বাটন প্রদর্শিত হবে।</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Charges Management Card */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-700/60">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>ডেলিভারি চার্জ ও শিপিং খরচ নিয়ন্ত্রণ (Shipping & Delivery Charges)</span>
                </h3>
                <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60 font-medium">
                  গ্রাহকের চেকআউটে তাৎক্ষণিক প্রযোজ্য হবে
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {/* Inside Dhaka */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <label className="font-bold text-slate-200 flex items-center justify-between">
                    <span>ঢাকার ভেতরে ডেলিভারি চার্জ (৳)</span>
                    <span className="text-[10px] text-emerald-400 font-bold">Inside Dhaka</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={siteSettings.shippingFeeInsideDhaka ?? 60}
                      onChange={(e) => updateSiteSettings({ shippingFeeInsideDhaka: Math.max(0, Number(e.target.value)) })}
                      min="0"
                      className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white font-bold outline-none focus:border-emerald-400"
                    />
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">৳</span>
                  </div>
                  <p className="text-[11px] text-slate-400">ঢাকা সিটির কাস্টমারদের জন্য নির্ধারিত চার্জ।</p>
                </div>

                {/* Outside Dhaka */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <label className="font-bold text-slate-200 flex items-center justify-between">
                    <span>ঢাকার বাইরে ডেলিভারি চার্জ (৳)</span>
                    <span className="text-[10px] text-amber-400 font-bold">Outside Dhaka</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={siteSettings.shippingFeeOutsideDhaka ?? 120}
                      onChange={(e) => updateSiteSettings({ shippingFeeOutsideDhaka: Math.max(0, Number(e.target.value)) })}
                      min="0"
                      className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white font-bold outline-none focus:border-amber-400"
                    />
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">৳</span>
                  </div>
                  <p className="text-[11px] text-slate-400">সমগ্র বাংলাদেশের অন্যান্য জেলার সাধারণ ডেলিভারি চার্জ।</p>
                </div>

                {/* Express 24h Delivery */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <label className="font-bold text-slate-200 flex items-center justify-between">
                    <span>জরুরি / এক্সপ্রেস চার্জ (৳)</span>
                    <span className="text-[10px] text-indigo-400 font-bold">Express 24h</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={siteSettings.shippingFeeExpress ?? 150}
                      onChange={(e) => updateSiteSettings({ shippingFeeExpress: Math.max(0, Number(e.target.value)) })}
                      min="0"
                      className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white font-bold outline-none focus:border-indigo-400"
                    />
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">৳</span>
                  </div>
                  <p className="text-[11px] text-slate-400">দ্রুততম সময়ে জরুরি ডেলিভারির অতিরিক্ত ফি।</p>
                </div>

                {/* Free Delivery Toggle */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">ফ্রি ডেলিভারি অফার</span>
                    <input
                      type="checkbox"
                      checked={siteSettings.enableFreeShipping !== false}
                      onChange={(e) => updateSiteSettings({ enableFreeShipping: e.target.checked })}
                      className="w-4 h-4 text-emerald-500 rounded-sm cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    নির্দিষ্ট অর্ডারের উপর বিনামূল্যে ডেলিভারির সুযোগ চালু বা বন্ধ রাখুন।
                  </p>
                </div>

                {/* Free Delivery Minimum Order */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <label className="font-bold text-slate-200 block">
                    ফ্রি ডেলিভারির সর্বনিম্ন অর্ডার (৳)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={siteSettings.freeShippingThreshold}
                      onChange={(e) => updateSiteSettings({ freeShippingThreshold: Math.max(0, Number(e.target.value)) })}
                      min="0"
                      className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white font-bold outline-none focus:border-emerald-400"
                    />
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">৳</span>
                  </div>
                  <p className="text-[11px] text-slate-400">এই পরিমাণের বেশি অর্ডারে ডেলিভারি স্বয়ংক্রিয়ভাবে ফ্রি হবে।</p>
                </div>

                {/* Delivery Notice text */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="font-bold text-slate-200 block">
                    চেকআউট ডেলিভারি নোটিশ টেক্সট
                  </label>
                  <input
                    type="text"
                    value={siteSettings.deliveryNoteBn || ''}
                    onChange={(e) => updateSiteSettings({ deliveryNoteBn: e.target.value })}
                    placeholder="যেমন: ঢাকার ভেতরে 60 টাকা, ঢাকার বাইরে 120 টাকা"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-white outline-none focus:border-emerald-400"
                  />
                  <p className="text-[11px] text-slate-400">গ্রাহকদের সুবিধার জন্য চেকআউটে প্রদর্শিত নোট।</p>
                </div>
              </div>
            </div>

            {/* Website Layout & Corner Architecture */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-indigo-400" />
                  <span>ওয়েবসাইট আর্কিটেকচার ও কর্নার ডিজাইন (Overall Site Layout & Corners)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  এখানে ডিজাইন পরিবর্তন করলে সম্পূর্ণ ওয়েবসাইটের বাটন, কার্ড, ব্যানার এবং কন্টেইনারের কর্নার ও স্টাইল এক ক্লিকে বদলে যাবে।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Modern Rounded */}
                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ layoutStyle: 'modern' });
                    addToast('ওয়েবসাইট ডিজাইন: মডার্ন রাউন্ডেড সেট করা হয়েছে', 'success');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    siteSettings.layoutStyle === 'modern' || !siteSettings.layoutStyle
                      ? 'bg-indigo-600/20 border-indigo-400 ring-2 ring-indigo-400/40 text-white'
                      : 'bg-slate-900 hover:bg-slate-700/50 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">মডার্ন রাউন্ডেড</span>
                    <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full font-bold">16px Radius</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    আধুনিক ও প্রিমিয়াম লুক। কার্ড ও বাটনে ব্যালেন্সড রাউন্ডেড কর্নার।
                  </p>
                  <div className="mt-3 h-7 w-full bg-slate-800 rounded-2xl border border-indigo-400/40 flex items-center justify-center text-[10px] text-indigo-300 font-bold">
                    প্রিভিউ: 16px কর্নার
                  </div>
                </button>

                {/* Sharp Compact */}
                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ layoutStyle: 'compact' });
                    addToast('ওয়েবসাইট ডিজাইন: শার্প কম্প্যাক্ট সেট করা হয়েছে', 'success');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    siteSettings.layoutStyle === 'compact'
                      ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40 text-white'
                      : 'bg-slate-900 hover:bg-slate-700/50 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">শার্প কম্প্যাক্ট</span>
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full font-bold">8px Radius</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    হাই-ডেনসিটি প্রফেশনাল ই-কমার্স লুক। শার্প ও স্লিক কর্নার।
                  </p>
                  <div className="mt-3 h-7 w-full bg-slate-800 rounded-md border border-amber-400/40 flex items-center justify-center text-[10px] text-amber-300 font-bold">
                    প্রিভিউ: 8px কর্নার
                  </div>
                </button>

                {/* Festive Curved */}
                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ layoutStyle: 'festive' });
                    addToast('ওয়েবসাইট ডিজাইন: উৎসবমুখর কার্ভড সেট করা হয়েছে', 'success');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    siteSettings.layoutStyle === 'festive'
                      ? 'bg-rose-500/20 border-rose-400 ring-2 ring-rose-400/40 text-white'
                      : 'bg-slate-900 hover:bg-slate-700/50 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">উৎসবমুখর কার্ভড</span>
                    <span className="text-[10px] bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full font-bold">24px Radius</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    ঈদ ও বৈশাখী উৎসবের জন্য এক্সক্লুসিভ অতিরিক্ত রাউন্ড ও সফট কার্ভড লুক।
                  </p>
                  <div className="mt-3 h-7 w-full bg-slate-800 rounded-3xl border border-rose-400/40 flex items-center justify-center text-[10px] text-rose-300 font-bold">
                    প্রিভিউ: 24px কার্ভড
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Remove & Reset Controls */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>দ্রুত ক্লিয়ার ও রিমুভ অপশন (Remove & Clear Controls)</span>
              </h3>
              <p className="text-xs text-slate-400">
                প্রয়োজনে যেকোনো টেক্সট বা সেটিংস এক ক্লিকে রিমুভ অথবা ডিফল্ট করতে পারবেন।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ announcementTextBn: '', showAnnouncementBar: false });
                    addToast('নোটিশ বার টেক্সট রিমুভ করা হয়েছে', 'info');
                  }}
                  className="p-3 bg-slate-900 hover:bg-slate-700/70 border border-slate-700 rounded-xl text-left cursor-pointer transition-colors"
                >
                  <div className="font-bold text-rose-300">টপ নোটিশ রিমুভ</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">টপ বার সম্পূর্ণ লুকিয়ে ফেলে</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ deliveryNoteBn: '' });
                    addToast('ডেলিভারি নোট রিমুভ করা হয়েছে', 'info');
                  }}
                  className="p-3 bg-slate-900 hover:bg-slate-700/70 border border-slate-700 rounded-xl text-left cursor-pointer transition-colors"
                >
                  <div className="font-bold text-rose-300">ডেলিভারি নোট মুছুন</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">চেকআউট নোট টেক্সট খালি করুন</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateSiteSettings({ hotlineNumber: '' });
                    addToast('হটলাইন নম্বর ক্লিয়ার করা হয়েছে', 'info');
                  }}
                  className="p-3 bg-slate-900 hover:bg-slate-700/70 border border-slate-700 rounded-xl text-left cursor-pointer transition-colors"
                >
                  <div className="font-bold text-rose-300">হটলাইন নম্বর মুছুন</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">টপ বারের ফোন নম্বর রিমুভ করুন</div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteConfirmation({
                      type: 'reset-settings',
                      name: 'সাইট সেটিংস রিসেট',
                      details: 'ব্র্যান্ড কালার ও সকল সাইট সেটিংস ডিফল্টে রিসেট হবে।',
                    })
                  }
                  className="p-3 bg-slate-900 hover:bg-rose-950/60 border border-rose-900/60 rounded-xl text-left cursor-pointer transition-colors"
                >
                  <div className="font-bold text-amber-400">সাইট সেটিংস রিসেট</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">ডিফল্ট ব্লু ও অরেঞ্জ থিমে ফিরুন</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BANNER SLIDER (ব্যানার স্লাইডার কন্ট্রোল) */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            {/* Add New Banner Slide */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>নতুন হোমপেজ ব্যানার স্লাইড যোগ করুন</span>
              </h3>

              <form onSubmit={handleAddBannerSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">ব্যানার শিরোনাম (বাংলা) *</label>
                  <input
                    type="text"
                    value={newSlideTitleBn}
                    onChange={(e) => setNewSlideTitleBn(e.target.value)}
                    placeholder="যেমন: ঈদ স্পেশাল মেগা সেল"
                    required
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">উপ-শিরোনাম বা অফার বিবরণ</label>
                  <input
                    type="text"
                    value={newSlideSubtitleBn}
                    onChange={(e) => setNewSlideSubtitleBn(e.target.value)}
                    placeholder="যেমন: ফ্যাশন ও গ্যাজেটে 70% পর্যন্ত অভাবনীয় ছাড়"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>ব্যানার ছবি (ফোনের গ্যালারি বা ফাইল থেকে আপলোড) *</span>
                    </label>
                    {isUploadingNewBanner && (
                      <span className="text-[11px] text-amber-400 animate-pulse flex items-center gap-1">
                        <RotateCcw className="w-3 h-3 animate-spin" />
                        <span>ছবি প্রসেস হচ্ছে...</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    {/* Device / Phone Gallery Upload Button */}
                    <div>
                      <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl cursor-pointer shadow-md active:scale-98 transition-all">
                        <Upload className="w-4 h-4" />
                        <span>📁 ফোন / গ্যালারি থেকে ছবি আপলোড করুন</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBannerImageUpload(e, setNewSlideImage, setIsUploadingNewBanner)}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[10.5px] text-slate-400 mt-1.5">
                        ফোনের ফটো লাইব্রেরি, ক্যামেরা বা ফাইল থেকে সরাসরি ব্যানার সিলেক্ট করুন।
                      </p>
                    </div>

                    {/* URL Input */}
                    <div>
                      <input
                        type="text"
                        value={newSlideImage}
                        onChange={(e) => setNewSlideImage(e.target.value)}
                        placeholder="অথবা সরাসরি ইমেজ লিংক (URL) দিন"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400 text-xs"
                      />
                      <p className="text-[10.5px] text-slate-500 mt-1.5">
                        ইমেজ URL থাকলে সেটিও ব্যবহার করতে পারবেন।
                      </p>
                    </div>
                  </div>

                  {/* Live Banner Preview Box */}
                  {newSlideImage && (
                    <div className="mt-2 relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950/80">
                      <div className="aspect-[21/9] sm:aspect-[24/9] w-full max-h-48 overflow-hidden flex items-center justify-center">
                        <img
                          src={newSlideImage}
                          alt="Banner Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-bold text-amber-400 border border-amber-400/30">
                        লাইভ ব্যানার প্রিভিউ (Live Preview)
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">টার্গেট ক্যাটাগরি</label>
                  <select
                    value={newSlideTargetCat}
                    onChange={(e) => setNewSlideTargetCat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none capitalize"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.nameBn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    ব্যানার পাবলিশ করুন
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Slides List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">বর্তমান ব্যানার স্লাইডসমূহ ({bannerSlides.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bannerSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden text-xs flex flex-col justify-between"
                  >
                    <div className="h-32 relative overflow-hidden bg-slate-900">
                      <img
                        src={slide.image}
                        alt={slide.titleBn}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 text-amber-400 text-[10px] font-bold">
                        {slide.badgeBn}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="font-bold text-white text-sm">{slide.titleBn}</div>
                      <div className="text-slate-400 text-[11px] line-clamp-1">{slide.subtitleBn}</div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                        <span className="text-[10px] font-bold text-emerald-400">{slide.discountTextBn}</span>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => openEditBanner(slide)}
                            className="text-indigo-400 hover:text-indigo-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            title="ব্যানার এডিট করুন"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>এডিট</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirmation({
                                type: 'banner',
                                id: slide.id,
                                name: slide.titleBn,
                                details: slide.subtitleBn,
                              })
                            }
                            className="text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            title="ব্যানার মুছুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>মুছুন</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SECURITY & BACKUP (পিন ও ব্যাকআপ) */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Admin Master PIN */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>এডমিন সিক্রেট পিন পরিবর্তন করুন (Change Admin PIN)</span>
              </h3>

              <form onSubmit={handleChangePin} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">বর্তমান পিন (Current PIN)</label>
                  <input
                    type="password"
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value)}
                    placeholder="বর্তমান পিন লিখুন"
                    required
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">নতুন পিন (New PIN)</label>
                  <input
                    type="password"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="কমপক্ষে 4 ডিজিটের নতুন পিন"
                    required
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">নতুন পিন নিশ্চিত করুন (Confirm PIN)</label>
                  <input
                    type="password"
                    value={confirmPinInput}
                    onChange={(e) => setConfirmPinInput(e.target.value)}
                    placeholder="পুনরায় নতুন পিন লিখুন"
                    required
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  পিন সংরক্ষণ করুন
                </button>
              </form>
            </div>

            {/* Data Backup & Factory Reset */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>ডাটা ব্যাকআপ ও রিস্টোর (Backup & Reset)</span>
              </h3>

              <div className="space-y-3 text-xs">
                <p className="text-slate-400">
                  আপনার ওয়েবসাইটের সকল পণ্য, কাস্টমার অর্ডার, ক্যাটাগরি ও কালার সেটিংস একটি JSON ফাইল হিসেবে ডাউনলোড করে নিরাপদে সংরক্ষণ করুন।
                </p>

                <button
                  onClick={handleExportBackup}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>সম্পূর্ণ ডাটা ব্যাকআপ ডাউনলোড করুন</span>
                </button>

                <div className="pt-4 border-t border-slate-700/80 space-y-2">
                  <span className="font-bold text-rose-400 block">ফ্যাক্টরি রিসেট (সতর্কতা):</span>
                  <p className="text-[11px] text-slate-400">
                    ওয়েবসাইটকে পূর্বের ফ্রেশ ডিফল্ট অবস্থায় ফিরিয়ে আনতে চান?
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteConfirmation({
                        type: 'factory-reset',
                        name: 'সম্পূর্ণ ওয়েবসাইট ফ্যাক্টরি রিসেট',
                        details: 'পণ্য, ক্যাটাগরি ও সাইট সেটিংস সবকিছু ফ্রেশ ডাটায় রিসেট হবে।',
                      })
                    }
                    className="px-4 py-2 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    ফ্যাক্টরি রিসেট করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SUPABASE BACKEND INTEGRATION */}
        {activeTab === 'supabase' && (
          <div className="space-y-6">
            {/* Connection Status Card */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Supabase ক্লাউড ডাটাবেজ ইন্টিগ্রেশন</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      প্রজেক্ট: <strong className="text-white font-mono">OneRoof Mart</strong> | আইডি: <span className="font-mono text-emerald-400">{supabaseUrl.replace('https://', '').split('.')[0]}</span> | অঞ্চল: <span className="font-mono text-slate-300">ap-southeast-1</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                    supabaseConnected 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span>{supabaseConnected ? 'অনলাইন ও সক্রিয়' : 'সংযোগ অপেক্ষমাণ'}</span>
                  </span>
                </div>
              </div>

              {/* Status & Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-bold block">REST API URL:</span>
                  <span className="font-mono text-slate-300 break-all">{supabaseUrl}</span>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-bold block">সংযোগ স্থিতি:</span>
                  <span className="text-slate-200">{supabaseStatusMsg}</span>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-bold block">অটো-সিঙ্ক কার্যকারিতা:</span>
                  <span className="text-emerald-400 font-bold">নতুন অর্ডার ও প্রোডাক্ট স্বয়ংক্রিয়ভাবে সিঙ্ক হবে</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  disabled={isCheckingConnection}
                  onClick={async () => {
                    setIsCheckingConnection(true);
                    await checkSupabaseConnection();
                    setIsCheckingConnection(false);
                    addToast('সংযোগ স্ট্যাটাস রিফ্রেশ করা হয়েছে', 'info');
                  }}
                  className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className={`w-4 h-4 ${isCheckingConnection ? 'animate-spin' : ''}`} />
                  <span>{isCheckingConnection ? 'যাচাই হচ্ছে...' : 'সংযোগ পুনঃযাচাই করুন'}</span>
                </button>

                <button
                  type="button"
                  disabled={isSyncingSupabase}
                  onClick={async () => {
                    setIsSyncingSupabase(true);
                    await syncAllToSupabase();
                    setIsSyncingSupabase(false);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
                >
                  <Upload className={`w-4 h-4 ${isSyncingSupabase ? 'animate-bounce' : ''}`} />
                  <span>{isSyncingSupabase ? 'সিঙ্ক হচ্ছে...' : 'সব পণ্য ও অর্ডার Supabase এ সিঙ্ক করুন'}</span>
                </button>
              </div>
            </div>

            {/* SQL Setup Instructions & Code */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/80">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Supabase SQL সেটআপ স্ক্রিপ্ট (1-ক্লিক কপি)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    আপনার Supabase ড্যাশবোর্ডের <strong>SQL Editor</strong> এ গিয়ে নিচের কোডটি পেস্ট করে <strong>Run</strong> ক্লিক করুন।
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://supabase.com/dashboard/project/ppwaosjmbdyocrmhnwak/sql/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SQL Editor খুলুন</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(supabaseSetupSql);
                      setSqlCopied(true);
                      addToast('SQL কোড কপি করা হয়েছে! Supabase SQL Editor এ পেস্ট করুন।', 'success');
                      setTimeout(() => setSqlCopied(false), 3000);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    {sqlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{sqlCopied ? 'কপি সম্পন্ন!' : 'SQL কোড কপি করুন'}</span>
                  </button>
                </div>
              </div>

              {/* Instructions steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">ধাপ 1:</span>
                  <span>Supabase ড্যাশবোর্ডে গিয়ে আপনার <strong>OneRoof Mart</strong> প্রজেক্ট ওপেন করুন।</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">ধাপ 2:</span>
                  <span>বাম পাশের মেনু থেকে <strong>SQL Editor</strong> নির্বাচন করে <strong>New query</strong> চাপুন।</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">ধাপ 3:</span>
                  <span>উপরে "SQL কোড কপি করুন" বাটনে ক্লিক করে পেস্ট করুন এবং <strong>Run</strong> চাপুন।</span>
                </div>
              </div>

              {/* Code display */}
              <div className="relative">
                <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-400/90 overflow-x-auto max-h-72 leading-relaxed scrollbar-thin">
                  {supabaseSetupSql}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SHOPBASEBD AUTO IMPORTER (15% PROFIT) */}
        {activeTab === 'shopbase' && (
          <ShopBaseImporter
            products={products}
            addMultipleProducts={addMultipleProducts}
            addProduct={addProduct}
            formatPrice={formatPrice}
            categories={categories}
            addCategory={addCategory}
          />
        )}
      </div>

      {/* Product Edit / Upload Modal */}
      <ProductEditModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
      />

      {/* Order Invoice View / Print Modal */}
      <OrderInvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />

      {/* Category Edit Modal */}
      {categoryToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-400" />
                <span>ক্যাটাগরি এডিট করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setCategoryToEdit(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCategorySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">ক্যাটাগরি নাম (বাংলা) *</label>
                <input
                  type="text"
                  value={editCatNameBn}
                  onChange={(e) => setEditCatNameBn(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">ক্যাটাগরি নাম (ইংরেজি)</label>
                <input
                  type="text"
                  value={editCatNameEn}
                  onChange={(e) => setEditCatNameEn(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">স্ল্যাগ (URL Slug) *</label>
                <input
                  type="text"
                  value={editCatSlug}
                  onChange={(e) => setEditCatSlug(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">ছবি বা আইকন URL</label>
                <input
                  type="url"
                  value={editCatImage}
                  onChange={(e) => setEditCatImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                  placeholder="URL দিন অথবা ফাইল সিলেক্ট করুন"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setEditCatImage)}
                  className="w-full mt-2 text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">সাব-ক্যাটাগরি (বাংলা)</label>
                <input
                  type="text"
                  value={editCatSubBn}
                  onChange={(e) => setEditCatSubBn(e.target.value)}
                  placeholder="কমা দিয়ে দিয়ে লিখুন (যেমন: পাঞ্জাবি, শাড়ি, জুতো)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Sub-Categories (English)</label>
                <input
                  type="text"
                  value={editCatSubEn}
                  onChange={(e) => setEditCatSubEn(e.target.value)}
                  placeholder="Comma separated (e.g. Punjabi, Sari, Shoes)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirmation({
                      type: 'category',
                      id: categoryToEdit.id,
                      name: categoryToEdit.nameBn,
                      details: `স্ল্যাগ: ${categoryToEdit.slug}`,
                    });
                  }}
                  className="px-4 py-2 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>মুছে ফেলুন</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCategoryToEdit(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    আপডেট করুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Edit Modal */}
      {bannerToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-400" />
                <span>ব্যানার স্লাইড এডিট করুন</span>
              </h3>
              <button
                type="button"
                onClick={() => setBannerToEdit(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateBannerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">ব্যানার শিরোনাম (বাংলা) *</label>
                <input
                  type="text"
                  value={editSlideTitleBn}
                  onChange={(e) => setEditSlideTitleBn(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">উপ-শিরোনাম বা অফার বিবরণ</label>
                <input
                  type="text"
                  value={editSlideSubtitleBn}
                  onChange={(e) => setEditSlideSubtitleBn(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">ব্যাজ টেক্সট</label>
                  <input
                    type="text"
                    value={editSlideBadge}
                    onChange={(e) => setEditSlideBadge(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">অফার / ডিসকাউন্ট টেক্সট</label>
                  <input
                    type="text"
                    value={editSlideDiscount}
                    onChange={(e) => setEditSlideDiscount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="space-y-2 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-indigo-400" />
                    <span>ব্যানার ছবি (ফোনের গ্যালারি বা ফাইল থেকে আপলোড) *</span>
                  </label>
                  {isUploadingEditBanner && (
                    <span className="text-[11px] text-indigo-400 animate-pulse flex items-center gap-1">
                      <RotateCcw className="w-3 h-3 animate-spin" />
                      <span>ছবি প্রসেস হচ্ছে...</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer shadow-md active:scale-98 transition-all text-xs">
                    <Upload className="w-4 h-4" />
                    <span>📁 ফোন / গ্যালারি থেকে নতুন ছবি সিলেক্ট করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBannerImageUpload(e, setEditSlideImage, setIsUploadingEditBanner)}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={editSlideImage}
                    onChange={(e) => setEditSlideImage(e.target.value)}
                    required
                    placeholder="অথবা সরাসরি ইমেজ লিংক (URL) দিন"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400 text-xs"
                  />
                </div>

                {editSlideImage && (
                  <div className="mt-2 relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                    <div className="aspect-[21/9] sm:aspect-[24/9] w-full max-h-40 overflow-hidden flex items-center justify-center">
                      <img
                        src={editSlideImage}
                        alt="Edit Banner Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-bold text-indigo-400 border border-indigo-400/30">
                      আপডেটেড লাইভ প্রিভিউ
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">টার্গেট ক্যাটাগরি</label>
                <select
                  value={editSlideTargetCat}
                  onChange={(e) => setEditSlideTargetCat(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-indigo-400 cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.nameBn} ({c.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirmation({
                      type: 'banner',
                      id: bannerToEdit.id,
                      name: bannerToEdit.titleBn,
                      details: bannerToEdit.subtitleBn,
                    });
                  }}
                  className="px-4 py-2 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>মুছে ফেলুন</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBannerToEdit(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    আপডেট করুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Universal In-App Delete Confirmation Modal (100% Reliable in iframe sandbox) */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <Trash2 className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white">
                  {deleteConfirmation.type === 'product' && 'প্রডাক্ট মুছে ফেলতে চান?'}
                  {deleteConfirmation.type === 'category' && 'ক্যাটাগরি মুছে ফেলতে চান?'}
                  {deleteConfirmation.type === 'order' && 'কাস্টমার অর্ডার মুছে ফেলতে চান?'}
                  {deleteConfirmation.type === 'banner' && 'ব্যানার মুছে ফেলতে চান?'}
                  {(deleteConfirmation.type.startsWith('reset') || deleteConfirmation.type === 'factory-reset') &&
                    'রিসেট নিশ্চিত করুন'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  আপনি কি নিশ্চিতভাবে এই আইটেমটি স্থায়ীভাবে ডিলিট করতে চান?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Item Preview Card */}
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-sm font-bold text-rose-300 truncate">
                {deleteConfirmation.name}
              </div>
              {deleteConfirmation.details && (
                <div className="text-xs text-slate-400">
                  {deleteConfirmation.details}
                </div>
              )}
            </div>

            <p className="text-[11px] text-amber-400/90 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>মুছে ফেলার পর ডাটা স্থায়ীভাবে ডিলিট হবে।</span>
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>হ্যাঁ, নিশ্চিত ডিলিট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
