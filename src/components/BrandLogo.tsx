import React, { useState } from 'react';
import officialLogoImg from '../assets/images/oneroof_logo_clean.png';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: 'dark' | 'light';
  onClick?: () => void;
  className?: string;
  useImageOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  textColor = 'dark',
  onClick,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  // Height configurations tailored to showcase the wide-format logo with maximum clarity
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-12 sm:h-14 md:h-16 lg:h-17',
    lg: 'h-18 sm:h-22',
    xl: 'h-24 sm:h-28',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${
        onClick ? 'cursor-pointer group transition-all duration-300 active:scale-95' : ''
      } ${className}`}
      title="OneRoof - সবকিছু এক ছাদের নিচে"
    >
      {/* Container with optional backdrop for dark themes */}
      <div
        className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03] ${sizeClasses} ${
          textColor === 'light'
            ? 'bg-white rounded-2xl px-3 py-1.5 shadow-md border border-slate-200/90'
            : ''
        }`}
      >
        {!imgError ? (
          <img
            src={officialLogoImg}
            alt="OneRoof - সবকিছু এক ছাদের নিচে"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-auto max-h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,56,130,0.08)] transition-all duration-300"
          />
        ) : (
          /* SVG Vector Reproduction matching user's uploaded logo design */
          <svg
            viewBox="0 0 540 380"
            className="h-full w-auto max-h-full object-contain select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA000" />
                <stop offset="50%" stopColor="#FF7700" />
                <stop offset="100%" stopColor="#FF4F00" />
              </linearGradient>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#004CB3" />
                <stop offset="100%" stopColor="#002D6E" />
              </linearGradient>
              <linearGradient id="orangeTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF8C00" />
                <stop offset="100%" stopColor="#FF4900" />
              </linearGradient>
              <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0047AB" />
                <stop offset="100%" stopColor="#002366" />
              </linearGradient>
            </defs>

            {/* Roof Chimney */}
            <path d="M335 110 V165 H370 V135 Z" fill="url(#roofGrad)" />

            {/* Roof Pitch */}
            <path
              d="M85 195 L 260 80 L 435 195 L 400 195 L 260 102 L 120 195 Z"
              fill="url(#roofGrad)"
            />

            {/* 4 Blue Windows in 2x2 Grid */}
            <rect x="236" y="132" width="22" height="22" rx="3" fill="url(#windowGrad)" />
            <rect x="262" y="132" width="22" height="22" rx="3" fill="url(#windowGrad)" />
            <rect x="236" y="158" width="22" height="22" rx="3" fill="url(#windowGrad)" />
            <rect x="262" y="158" width="22" height="22" rx="3" fill="url(#windowGrad)" />

            {/* 'One' in Royal Blue */}
            <text
              x="68"
              y="275"
              fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
              fontWeight="900"
              fontSize="105"
              letterSpacing="-3"
              fill="url(#blueGrad)"
            >
              One
            </text>

            {/* Orange Orbital Ring swooshing around 'O' */}
            <path
              d="M 50 255 C 45 285, 115 305, 175 255 C 205 230, 220 195, 210 185 C 200 178, 175 200, 140 235 C 105 270, 55 270, 50 255 Z"
              fill="url(#roofGrad)"
            />

            {/* 'Roof' in Vivid Orange */}
            <text
              x="235"
              y="275"
              fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
              fontWeight="900"
              fontSize="105"
              letterSpacing="-3"
              fill="url(#orangeTextGrad)"
            >
              Roof
            </text>

            {/* Shopping Cart */}
            <g transform="translate(420, 205)">
              <line x1="65" y1="18" x2="90" y2="18" stroke="#FFA500" strokeWidth="4" strokeLinecap="round" />
              <line x1="60" y1="28" x2="85" y2="28" stroke="#FFA500" strokeWidth="4" strokeLinecap="round" />
              <line x1="55" y1="38" x2="78" y2="38" stroke="#FFA500" strokeWidth="4" strokeLinecap="round" />
              <path
                d="M 0 50 H 42 L 54 12 H 88"
                stroke="#003580"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path d="M 12 40 H 46 L 52 20 H 18 Z" fill="#0047AB" />
              <circle cx="15" cy="62" r="6.5" fill="#003580" />
              <circle cx="36" cy="62" r="6.5" fill="#003580" />
            </g>

            {/* Bengali Tagline Underneath: '— সবকিছু এক ছাদের নিচে —' */}
            <line x1="38" y1="332" x2="115" y2="332" stroke="#003882" strokeWidth="2.5" strokeLinecap="round" />
            <text
              x="260"
              y="340"
              textAnchor="middle"
              fontFamily="'Hind Siliguri', 'Noto Sans Bengali', sans-serif"
              fontWeight="700"
              fontSize="29"
              fill="#0A1128"
            >
              সবকিছু এক ছাদের নিচে
            </text>
            <line x1="405" y1="332" x2="482" y2="332" stroke="#003882" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
};
