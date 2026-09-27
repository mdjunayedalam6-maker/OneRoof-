import React from 'react';
import officialLogoImg from '../assets/images/oneroof_logo_transparent_v3.png';

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
  // Height configurations tailored to showcase the wide-format logo with maximum clarity
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12 md:h-13 lg:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-20 sm:h-24',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${
        onClick ? 'cursor-pointer group transition-all duration-300 active:scale-95' : ''
      } ${className}`}
      title="OneRoof Mart - সবকিছু এক ছাদের নিচে"
    >
      <div
        className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03] ${sizeClasses} ${
          textColor === 'light'
            ? 'bg-white rounded-xl px-2.5 py-1 shadow-sm border border-slate-200/80'
            : ''
        }`}
      >
        <img
          src={officialLogoImg}
          alt="OneRoof Mart - সবকিছু এক ছাদের নিচে"
          referrerPolicy="no-referrer"
          className="h-full w-auto max-h-full object-contain transition-all duration-300"
        />
      </div>
    </div>
  );
};
