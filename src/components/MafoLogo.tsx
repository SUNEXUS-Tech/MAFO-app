import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface MafoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const MafoLogo: React.FC<MafoLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const { isDark } = useTheme();

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Distinctive MAFO O. Symbol: Orbit & Connection Motif with Orange & Deep Green */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer continuous orbit circle */}
          <circle
            cx="22"
            cy="22"
            r="19"
            stroke={isDark ? '#23402A' : '#CBD8CE'}
            strokeWidth="3"
          />
          {/* Active progressive sector in brand orange */}
          <path
            d="M 22 3 A 19 19 0 0 1 41 22"
            stroke="#FF6600"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Inner core node */}
          <circle cx="22" cy="22" r="7" fill={isDark ? '#1C3A24' : '#0D2B16'} />
          {/* Orbiting satellite connection node in orange */}
          <circle cx="22" cy="3" r="3.5" fill="#FF6600" />
          {/* Secondary trust satellite */}
          <circle cx="36" cy="36" r="2.5" fill="#10B981" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 leading-none">
          <span
            className={`font-black tracking-tight font-['Space_Grotesk',sans-serif] ${
              isDark ? 'text-white' : 'text-[#0D2214]'
            } ${textSizes[size]}`}
          >
            MAFO<span className="text-[#FF6600]">.</span>
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[11px] font-medium tracking-tight mt-0.5 ${
              isDark ? 'text-[#A1B8A5]' : 'text-[#44634B]'
            }`}
          >
            Má fo<span className="text-[#FF6600] font-semibold ml-1">· Don't worry</span>
          </span>
        )}
      </div>
    </div>
  );
};
