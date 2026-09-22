import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, Smartphone, Award } from 'lucide-react';
import { VerificationStatus } from '../types';
import { useTheme } from '../context/ThemeContext';

interface VerificationBadgeProps {
  verifications?: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showDetailsTooltip?: boolean;
  onOpenDetails?: () => void;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verifications,
  size = 'md',
  showDetailsTooltip = true,
  onOpenDetails,
  className = '',
}) => {
  const { isDark } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const badgeConfig = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetails?.();
        }}
        className={`inline-flex items-center font-bold rounded-full transition-all shadow-sm focus:outline-none cursor-pointer border ${
          isDark
            ? 'bg-[#0E2314] border-[#2E5437] text-emerald-400 hover:border-emerald-400/80'
            : 'bg-[#EAF3EC] border-[#A8CEB1] text-[#0A5726] hover:bg-[#DDECE0]'
        } ${badgeConfig[size]}`}
        title="MAFO Verified Provider"
      >
        <ShieldCheck className={`${iconSizes[size]} text-emerald-500 shrink-0`} />
        <span className="tracking-wider">MAFO VERIFIED</span>
      </button>

      {/* Trust tooltip showing verified attributes */}
      {showDetailsTooltip && showTooltip && verifications && (
        <div
          className={`absolute z-50 bottom-full left-0 mb-2 w-64 p-3 rounded-xl shadow-2xl text-left pointer-events-none animate-in fade-in zoom-in-95 duration-150 border ${
            isDark
              ? 'bg-[#132517] border-[#23402A] text-white'
              : 'bg-white border-[#D2DFD4] text-[#0D2214]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#23402A]/20 pb-2 mb-2">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6600]" />
              MAFO Trust Framework
            </span>
            <span className="text-[10px] text-emerald-500 font-mono font-bold">100% Vetted</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className={`flex items-center justify-between ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3 h-3 text-[#FF6600]" /> Government ID Verified
              </span>
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  verifications.identity ? 'text-emerald-500' : 'text-slate-400'
                }`}
              />
            </div>
            <div className={`flex items-center justify-between ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3 h-3 text-[#FF6600]" /> Phone & OTP Verified
              </span>
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  verifications.phone ? 'text-emerald-500' : 'text-slate-400'
                }`}
              />
            </div>
            <div className={`flex items-center justify-between ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#FF6600]" /> Service Competency
              </span>
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  verifications.service ? 'text-emerald-500' : 'text-slate-400'
                }`}
              />
            </div>
            <div className={`flex items-center justify-between ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
              <span className="flex items-center gap-1.5">
                <Award className="w-3 h-3 text-[#FF6600]" /> Credentials / Track Record
              </span>
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  verifications.credentials ? 'text-emerald-500' : 'text-slate-400'
                }`}
              />
            </div>
          </div>

          <div
            className={`mt-2.5 pt-2 border-t text-[10px] ${
              isDark ? 'border-[#23402A] text-[#A1B8A5]' : 'border-[#D2DFD4] text-[#55755D]'
            }`}
          >
            Backed by <strong className="text-[#FF6600] font-medium">Má fo Safety Promise</strong> & dispute escrow.
          </div>
        </div>
      )}
    </div>
  );
};
