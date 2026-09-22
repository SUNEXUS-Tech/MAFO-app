import React from 'react';
import {
  X,
  ShieldCheck,
  UserCheck,
  Smartphone,
  Lock,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-6 border ${
          isDark
            ? 'bg-[#132517] border-[#23402A]'
            : 'bg-white border-[#D2DFD4]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 sm:p-5 border-b ${
            isDark ? 'border-[#23402A] bg-[#0B1A0E]' : 'border-[#D2DFD4] bg-[#F5F8F4]'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3
              className={`font-bold text-base sm:text-lg font-['Space_Grotesk',sans-serif] ${
                isDark ? 'text-white' : 'text-[#0D2214]'
              }`}
            >
              MAFO Trust Architecture & Verification
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#132517] border-[#23402A] text-[#C5D6C8] hover:text-white'
                : 'bg-white border-[#D2DFD4] text-[#2C4A33] hover:text-black'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF6600] uppercase tracking-wider">
              The Má fo Assurance Framework
            </span>
            <h2
              className={`text-xl sm:text-2xl font-black mt-1 mb-2 font-['Space_Grotesk',sans-serif] ${
                isDark ? 'text-white' : 'text-[#0D2214]'
              }`}
            >
              How MAFO removes uncertainty from hiring services.
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
              We do not treat trust as marketing decoration. Every provider displaying the{' '}
              <strong className="text-emerald-500 font-bold">MAFO VERIFIED</strong> badge must undergo multi-tiered vetting before receiving customer requests in the Akure pilot.
            </p>
          </div>

          {/* 4 Pillars of Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs sm:text-sm">
                <UserCheck className="w-4 h-4" />
                <span>1. Identity Verification</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                National Identity Number (NIN), Voter's Card, or International Passport validation ensuring real-name accountability for every specialist on site.
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs sm:text-sm">
                <Smartphone className="w-4 h-4" />
                <span>2. Phone & OTP Binding</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Verified Nigerian mobile number and active channel tied to identity for direct, accountable communication.
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>3. Competency & Reference Vetting</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Review of past projects, diagnostic competency interview, and customer references across their stated operational neighborhoods.
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4" />
                <span>4. Safe Escrow & Payout Protection</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Your payment remains protected in escrow until you personally inspect and confirm that the work has been completed to agreed standards.
              </p>
            </div>
          </div>

          {/* Reassurance Callout */}
          <div
            className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              isDark
                ? 'bg-[#0E2314] border-[#2E5437] text-[#C5D6C8]'
                : 'bg-[#EBF5EE] border-[#B7D8BF] text-[#2C4A33]'
            }`}
          >
            <strong className="text-[#FF6600] block font-bold text-sm">
              Our Promise: Má fo.
            </strong>
            <p className="leading-relaxed">
              If an unexpected fault or delay occurs, the MAFO Resolution Desk directly intervenes. You never have to chase an unaccountable artisan again.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
