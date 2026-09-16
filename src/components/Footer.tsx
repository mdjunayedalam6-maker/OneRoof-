import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
  Lock,
  MessageCircle,
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { 
    language, 
    t, 
    setCurrentPage, 
    setFilterState,
    isAdminAuthenticated,
    setIsAdminModalOpen,
    siteSettings,
    currentUser,
    isUserAdmin,
    loginAdmin
  } = useApp();

  return (
    <footer className="bg-[#0A2540] text-white pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Brand Info */}
          <div className="flex flex-col items-center text-center space-y-4">
            <BrandLogo onClick={() => setCurrentPage('home')} size="md" textColor="light" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'OneRoof হলো বাংলাদেশের আধুনিকতম অল-ইন-ওয়ান মাল্টি-ভেন্ডার ই-কমার্স মার্কেটপ্লেস। এক ছাদের নিচে ইলেকট্রনিক্স, ফ্যাশন, গ্রোসারি, রূপচর্চা সহ প্রাত্যহিক জীবনের সকল প্রয়োজনীয় পণ্য পৌঁছে দিচ্ছি বিশ্বস্ততার সাথে।'
                : 'OneRoof is Bangladesh’s premier all-in-one marketplace delivering lifestyle, electronics, groceries, and essentials under one single roof with authentic guarantee.'}
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:01929637253" className="hover:text-emerald-400 transition-colors">
                  হটলাইন: <strong className="font-mono text-white">01929637253</strong> (সকাল ৯টা - রাত ১০টা)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:mdzunayedali6@gmail.com" className="hover:text-emerald-400 transition-colors">
                  mdzunayedali6@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>রামপুর, তারাকান্দা, ময়মনসিংহ, বাংলাদেশ</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {siteSettings.whatsappLink && (
                <a 
                  href={siteSettings.whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/20 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-bold">WhatsApp</span>
                </a>
              )}
              {siteSettings.facebookLink && (
                <a 
                  href={siteSettings.facebookLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/20 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="text-xs font-bold">Facebook</span>
                </a>
              )}
              {siteSettings.messengerLink && (
                <a 
                  href={siteSettings.messengerLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00B2FF]/10 hover:bg-[#00B2FF] text-[#00B2FF] hover:text-white border border-[#00B2FF]/20 transition-colors"
                  title="Messenger"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold">Messenger</span>
                </a>
              )}
              {siteSettings.imoLink && (
                <a 
                  href={siteSettings.imoLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0056FF]/10 hover:bg-[#0056FF] text-[#0056FF] hover:text-white border border-[#0056FF]/20 transition-colors"
                  title="Imo"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span className="text-xs font-bold">Imo</span>
                </a>
              )}
              {siteSettings.youtubeLink && (
                <a 
                  href={siteSettings.youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white border border-[#FF0000]/20 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="text-xs font-bold">YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Discreet Secret Admin Entry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <p>
            © {new Date().getFullYear()} OneRoof Marketplace Ltd. {t.allRightsReserved}
          </p>
          <button
            onClick={() => {
              if (isAdminAuthenticated || (currentUser && isUserAdmin(currentUser))) {
                loginAdmin();
                setCurrentPage('admin');
              } else {
                setIsAdminModalOpen(true);
              }
            }}
            className="text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px] p-1 rounded-md cursor-pointer group"
            title="Secret Admin Access (Ctrl+Shift+A)"
          >
            <Lock className="w-3 h-3 text-amber-500/70 group-hover:scale-110 transition-transform" />
            <span className="opacity-70 group-hover:opacity-100 font-mono">সিক্রেট এডমিন</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          ট্রেড লাইসেন্স নং: TRAD/DNCC/012938/2024 | ডিবিআইডি নং: ৯৮৪২১
        </p>
      </div>
    </footer>
  );
};
