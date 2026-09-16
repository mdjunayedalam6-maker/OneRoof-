import React, { useState, useRef } from 'react';
import { 
  X, 
  User as UserIcon, 
  Lock, 
  Phone, 
  Mail, 
  ArrowRight,
  MapPin,
  Map,
  Home,
  CheckCircle2,
  ImagePlus,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS } from '../data/mockData';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, registerUser, language, addToast } = useApp();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState(BANGLADESH_DIVISIONS[0].nameBn);
  const [district, setDistrict] = useState(BANGLADESH_DIVISIONS[0].districts[0]);
  const [thana, setThana] = useState('');
  const [village, setVillage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthModalOpen) return null;

  // Division and district options
  const selectedDivObj = BANGLADESH_DIVISIONS.find(
    (d) => d.nameBn === division || d.nameEn === division
  ) || BANGLADESH_DIVISIONS[0];

  const handleDivisionChange = (newDiv: string) => {
    setDivision(newDiv);
    const divObj = BANGLADESH_DIVISIONS.find((d) => d.nameBn === newDiv || d.nameEn === newDiv);
    if (divObj && divObj.districts.length > 0) {
      setDistrict(divObj.districts[0]);
    }
  };

  // Handle Gallery / Local File Image Upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast(
        language === 'bn' ? 'দয়া করে একটি সঠিক ছবি ফাইল নির্বাচন করুন' : 'Please select a valid image file',
        'error'
      );
      return;
    }

    // Limit to 4MB to prevent excessive memory/storage bloat
    if (file.size > 4 * 1024 * 1024) {
      addToast(
        language === 'bn' ? 'ছবির সাইজ সর্বোচ্চ ৪MB হতে পারবে' : 'Image size must be less than 4MB',
        'error'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAvatar(result);
      setAvatarPreview(result);
      addToast(
        language === 'bn' ? 'প্রোফাইল ছবি সফলভাবে যুক্ত হয়েছে' : 'Profile photo selected successfully',
        'success'
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar('');
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      addToast(
        language === 'bn' ? 'দয়া করে আপনার ইমেইল অথবা মোবাইল নম্বর লিখুন' : 'Please enter your email or mobile number',
        'error'
      );
      return;
    }
    if (!loginPassword) {
      addToast(
        language === 'bn' ? 'দয়া করে আপনার পাসওয়ার্ড লিখুন' : 'Please enter your password',
        'error'
      );
      return;
    }

    loginUser(loginIdentifier, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      addToast(
        language === 'bn' ? 'একটি সঠিক ইমেইল অ্যাড্রেস দিন' : 'Please provide a valid email address',
        'error'
      );
      return;
    }

    if (!name.trim()) {
      addToast(
        language === 'bn' ? 'আপনার নাম লিখুন' : 'Please provide your full name',
        'error'
      );
      return;
    }

    const cleanDigits = phone.replace(/[^0-9]/g, '');
    if (cleanDigits.length < 10) {
      addToast(
        language === 'bn' ? 'কমপক্ষে ১০-১১ ডিজিটের সঠিক মোবাইল নম্বর দিন' : 'Please provide a valid 11-digit phone number',
        'error'
      );
      return;
    }

    if (!registerPassword || registerPassword.length < 4) {
      addToast(
        language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে' : 'Password must be at least 4 characters',
        'error'
      );
      return;
    }

    registerUser({
      email: email.trim(),
      name: name.trim(),
      phone: phone.trim(),
      password: registerPassword,
      division: division,
      district: district,
      thana: thana.trim(),
      village: village.trim(),
      avatar: avatar || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-5 sm:p-7 border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2.5 shadow-sm">
            {activeTab === 'login' ? <Lock className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {activeTab === 'login' 
              ? (language === 'bn' ? 'অ্যাকাউন্টে লগইন করুন' : 'Sign in to your account')
              : (language === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create a new account')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {activeTab === 'login'
              ? (language === 'bn' ? 'আপনার ইমেইল অথবা মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে লগইন করুন' : 'Log in using your registered email or mobile number & password')
              : (language === 'bn' ? 'ইমেইল, মোবাইল নম্বর ও প্রয়োজনীয় তথ্য দিয়ে রেজিস্ট্রেশন করুন' : 'Enter your email, mobile number and details to register')}
          </p>
        </div>

        {/* Top Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'লগইন' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'নতুন রেজিস্ট্রেশন' : 'Register'}
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === 'login' && (
          <div className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>{language === 'bn' ? 'ইমেইল অথবা মোবাইল নম্বর' : 'Email or Mobile Number'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {language === 'bn' ? 'উভয় দিয়ে লগইন সম্ভব' : 'Both supported'}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: example@gmail.com বা 017XXXXXXXX' : 'example@gmail.com or 017XXXXXXXX'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
                  />
                  <div className="absolute right-3 top-3 text-slate-400 pointer-events-none flex items-center gap-1">
                    {loginIdentifier.includes('@') ? (
                      <Mail className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Phone className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{language === 'bn' ? 'লগইন করুন' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              <p>
                {language === 'bn' ? 'নতুন একাউন্ট খুলতে চান?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  {language === 'bn' ? 'রেজিস্ট্রেশন করুন' : 'Register Now'}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            {/* 1. Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* 2. Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ জোনায়েদ' : 'Your Full Name'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 3. Address Section (Division, District, Thana, Village) */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 pb-1 border-b border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'বিস্তারিত ঠিকানা' : 'Detailed Address'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    {language === 'bn' ? 'বিভাগ' : 'Division'}
                  </label>
                  <select
                    value={division}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600 cursor-pointer shadow-xs"
                  >
                    {BANGLADESH_DIVISIONS.map((d) => (
                      <option key={d.nameEn} value={language === 'bn' ? d.nameBn : d.nameEn}>
                        {language === 'bn' ? d.nameBn : d.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    {language === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600 cursor-pointer shadow-xs"
                  >
                    {selectedDivObj.districts.map((dst) => (
                      <option key={dst} value={dst}>
                        {dst}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    {language === 'bn' ? 'থানা / উপজেলা' : 'Thana / Upazila'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি' : 'e.g. Dhanmondi'}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600 shadow-xs"
                    />
                    <Home className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    {language === 'bn' ? 'গ্রাম / এলাকা / বাসা' : 'Village / Area'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder={language === 'bn' ? 'রোড ও বাসা নং' : 'House / Road details'}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-600 shadow-xs"
                    />
                    <Map className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Profile Photo Upload from Gallery (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'bn' ? 'প্রোফাইল ছবি (গ্যালারি থেকে আপলোড)' : 'Profile Photo (From Gallery)'}
                </label>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {language === 'bn' ? 'ঐচ্ছিক (না দিলেও চলবে)' : 'Optional'}
                </span>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageFileChange}
                accept="image/*"
                className="hidden"
                id="gallery-avatar-upload"
              />

              {avatarPreview ? (
                <div className="flex items-center gap-3 bg-emerald-50/70 p-2.5 rounded-2xl border border-emerald-200">
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Uploaded avatar"
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-900 truncate">
                      {language === 'bn' ? 'ছবি নির্বাচন করা হয়েছে' : 'Photo selected'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === 'bn' ? 'রেজিস্ট্রেশনের পর এটি প্রোফাইলে দেখাবে' : 'Will be used as profile avatar'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-bold text-emerald-700 bg-white hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-200 shadow-xs cursor-pointer transition-colors"
                    >
                      {language === 'bn' ? 'পরিবর্তন' : 'Change'}
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title={language === 'bn' ? 'ছবি মুছুন' : 'Remove Photo'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/40 rounded-2xl p-3 text-center cursor-pointer transition-all flex items-center justify-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-full bg-white group-hover:bg-emerald-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-700 transition-colors shadow-xs">
                    <ImagePlus className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-800 transition-colors">
                      {language === 'bn' ? 'গ্যালারি থেকে ছবি আপলোড করুন' : 'Upload photo from gallery'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {language === 'bn' ? 'না দিলেও কোনো সমস্যা নেই, স্বয়ংক্রিয় ছবি বসবে' : 'Optional: Default avatar will be used if skipped'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'bn' ? 'পাসওয়ার্ড সেট করুন' : 'Create Password'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {language === 'bn' ? 'এই পাসওয়ার্ড এবং আপনার ইমেইল অথবা মোবাইল নম্বর দিয়ে পরে লগইন করতে পারবেন' : 'You can log in later with this password and your email or mobile number'}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{language === 'bn' ? 'রেজিস্ট্রেশন সম্পন্ন করুন' : 'Complete Registration'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <div className="mt-3 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              <p>
                {language === 'bn' ? 'ইতিমধ্যেই একাউন্ট আছে?' : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  {language === 'bn' ? 'লগইন করুন' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
