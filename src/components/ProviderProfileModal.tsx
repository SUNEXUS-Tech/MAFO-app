import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { Provider } from '../types';
import { VerificationBadge } from './VerificationBadge';
import { useTheme } from '../context/ThemeContext';

interface ProviderProfileModalProps {
  provider: Provider | null;
  onClose: () => void;
  onRequestService: (provider: Provider) => void;
  onStartMessage: (provider: Provider) => void;
  onOpenTrustModal: () => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  provider,
  onClose,
  onRequestService,
  onStartMessage,
  onOpenTrustModal,
}) => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<'overview' | 'portfolio' | 'reviews'>('overview');

  if (!provider) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh] border ${
          isDark
            ? 'bg-[#07140B] border-[#23402A] text-[#F3F6F3]'
            : 'bg-[#F5F7F4] border-[#D2DFD4] text-[#0D2214]'
        }`}
      >
        {/* Sticky Header with Close */}
        <div
          className={`flex items-center justify-between p-4 sm:p-5 border-b sticky top-0 z-20 backdrop-blur-md ${
            isDark
              ? 'bg-[#07140B]/95 border-[#23402A]'
              : 'bg-[#F5F7F4]/95 border-[#D2DFD4]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#FF6600] uppercase tracking-wider">
              Verified Specialist File
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>•</span>
            <span className={`text-xs font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#44634B]'}`}>
              Ref: {provider.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
              isDark
                ? 'bg-[#132517] text-[#C5D6C8] hover:text-white border-[#23402A]'
                : 'bg-white text-[#2C4A33] hover:text-black border-[#D2DFD4]'
            }`}
            aria-label="Close provider profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Profile Header Block */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border ${
              isDark
                ? 'bg-[#132517] border-[#23402A]'
                : 'bg-white border-[#D2DFD4]'
            }`}
          >
            <img
              src={provider.avatar}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 shrink-0 ${
                isDark ? 'border-[#FF6600]' : 'border-[#FF6600]'
              }`}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2
                  className={`text-xl sm:text-2xl font-bold tracking-tight font-['Space_Grotesk',sans-serif] ${
                    isDark ? 'text-white' : 'text-[#0D2214]'
                  }`}
                >
                  {provider.name}
                </h2>
                <VerificationBadge
                  verifications={provider.verifications}
                  size="md"
                  onOpenDetails={onOpenTrustModal}
                />
              </div>

              <p className="text-sm font-semibold text-[#FF6600] mb-2">
                {provider.businessName || provider.service}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {provider.rating.toFixed(2)} ({provider.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  {provider.completedJobs} jobs delivered
                </span>
                <span>•</span>
                <span className={`flex items-center gap-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#44634B]'}`}>
                  <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
                  {provider.locationCity} (Pilot Zone)
                </span>
              </div>
            </div>
          </div>

          {/* 4 Pillars Trust Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Response Rate
              </span>
              <span className={`text-base font-extrabold block ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                {provider.responseRate}
              </span>
              <span className="text-[11px] text-[#FF6600] font-semibold">{provider.responseTime}</span>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Experience
              </span>
              <span className={`text-base font-extrabold block ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                {provider.experienceYears}+ Years
              </span>
              <span className={`text-[11px] ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Active practice</span>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Repeat Clients
              </span>
              <span className={`text-base font-extrabold block ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                {provider.repeatCustomersPercent}%
              </span>
              <span className="text-[11px] text-emerald-500 font-semibold">High retention</span>
            </div>

            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Starting Rate
              </span>
              <span className={`text-base font-extrabold block ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                {provider.startingPrice}
              </span>
              <span className={`text-[11px] ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Transparent quotes</span>
            </div>
          </div>

          {/* Section Tabs */}
          <div className={`flex gap-6 border-b ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
            <button
              onClick={() => setActiveSection('overview')}
              className={`pb-2.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                activeSection === 'overview'
                  ? 'border-[#FF6600] text-[#FF6600]'
                  : `border-transparent ${isDark ? 'text-[#A1B8A5] hover:text-white' : 'text-[#44634B] hover:text-black'}`
              }`}
            >
              Professional Background
            </button>
            <button
              onClick={() => setActiveSection('portfolio')}
              className={`pb-2.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                activeSection === 'portfolio'
                  ? 'border-[#FF6600] text-[#FF6600]'
                  : `border-transparent ${isDark ? 'text-[#A1B8A5] hover:text-white' : 'text-[#44634B] hover:text-black'}`
              }`}
            >
              Delivered Work ({provider.portfolio.length})
            </button>
            <button
              onClick={() => setActiveSection('reviews')}
              className={`pb-2.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                activeSection === 'reviews'
                  ? 'border-[#FF6600] text-[#FF6600]'
                  : `border-transparent ${isDark ? 'text-[#A1B8A5] hover:text-white' : 'text-[#44634B] hover:text-black'}`
              }`}
            >
              Verified Reviews ({provider.reviews.length})
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className={`text-xs uppercase tracking-wider font-mono mb-2 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  About Specialist & Services
                </h4>
                <p
                  className={`text-sm leading-relaxed p-4 rounded-xl border ${
                    isDark
                      ? 'bg-[#132517] border-[#23402A] text-[#E0ECE2]'
                      : 'bg-white border-[#D2DFD4] text-[#1D3624]'
                  }`}
                >
                  {provider.bio}
                </p>
              </div>

              {/* Service Areas */}
              <div>
                <h4 className={`text-xs uppercase tracking-wider font-mono mb-2 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  Covered Neighborhoods in {provider.locationCity}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border ${
                        isDark
                          ? 'bg-[#132517] border-[#23402A] text-[#F3F6F3]'
                          : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-[#FF6600]" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Trust Evidence */}
              <div
                className={`p-4 rounded-xl border ${
                  isDark
                    ? 'bg-[#0E2314] border-[#2E5437]'
                    : 'bg-[#EBF5EE] border-[#B7D8BF]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                    MAFO Trust & Verification Dossier
                  </span>
                </div>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Government ID & Biometrics Validated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>WhatsApp / GSM Direct Phone Authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Trade Competency & References Inspected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>MAFO Resolution & Safe Escrow Bond</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Portfolio */}
          {activeSection === 'portfolio' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {provider.portfolio.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl overflow-hidden border group ${
                    isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-3.5">
                    <span className="text-[10px] font-mono text-[#FF6600] uppercase tracking-wider block mb-1 font-bold">
                      {item.category}
                    </span>
                    <h5 className={`font-bold text-xs sm:text-sm mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                      {item.title}
                    </h5>
                    {item.description && (
                      <p className={`text-xs leading-normal ${isDark ? 'text-[#A1B8A5]' : 'text-[#44634B]'}`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Customer Reviews */}
          {activeSection === 'reviews' && (
            <div className="space-y-4">
              {provider.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`p-4 rounded-xl border space-y-2.5 ${
                    isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                          {rev.authorName}
                        </span>
                        {rev.verifiedJob && (
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Verified Job
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                        {rev.authorLocation} • {rev.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed italic ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                    "{rev.comment}"
                  </p>

                  {rev.metrics && (
                    <div
                      className={`pt-2 border-t grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono ${
                        isDark ? 'border-[#23402A] text-[#A1B8A5]' : 'border-[#D2DFD4] text-[#506E56]'
                      }`}
                    >
                      <div>Quality: <strong className="text-emerald-500">{rev.metrics.quality}/5</strong></div>
                      <div>Professionalism: <strong className="text-emerald-500">{rev.metrics.professionalism}/5</strong></div>
                      <div>Communication: <strong className="text-emerald-500">{rev.metrics.communication}/5</strong></div>
                      <div>Reliability: <strong className="text-emerald-500">{rev.metrics.reliability}/5</strong></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Bottom Actions */}
        <div
          className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isDark
              ? 'bg-[#07140B] border-[#23402A]'
              : 'bg-[#F5F7F4] border-[#D2DFD4]'
          }`}
        >
          <div className="text-center sm:text-left">
            <span className={`text-[11px] block font-medium ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              {provider.availability}
            </span>
            <div className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
              Starting rate from <span className="text-[#FF6600]">{provider.startingPrice}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onStartMessage(provider)}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#132517] border-[#23402A] text-white hover:bg-[#1C3522]'
                  : 'bg-white border-[#D2DFD4] text-[#0D2214] hover:bg-[#EBF1EB]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#FF6600]" />
              <span>Ask a Question</span>
            </button>

            <button
              type="button"
              onClick={() => onRequestService(provider)}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-lg cursor-pointer"
            >
              <span>Request Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
