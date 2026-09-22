import React from 'react';
import { Star, MapPin, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Provider } from '../types';
import { VerificationBadge } from './VerificationBadge';
import { useTheme } from '../context/ThemeContext';

interface ProviderCardProps {
  provider: Provider;
  onViewProfile: (provider: Provider) => void;
  onRequestService: (provider: Provider) => void;
  onOpenTrustModal: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onViewProfile,
  onRequestService,
  onOpenTrustModal,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:shadow-xl group border ${
        isDark
          ? 'bg-[#132517] border-[#23402A] hover:border-[#386341]'
          : 'bg-white border-[#D2DFD4] hover:border-[#B2CAB6] shadow-sm'
      }`}
    >
      <div>
        {/* Top Header: Avatar, Name, Verification, Business Title */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="relative shrink-0">
            <img
              src={provider.avatar}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border transition-colors ${
                isDark ? 'border-[#2D5236] group-hover:border-[#FF6600]' : 'border-[#CBD8CE] group-hover:border-[#FF6600]'
              }`}
            />
            <span
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#132517]"
              title="Verified & Active"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3
                className={`font-bold text-base sm:text-lg truncate transition-colors font-['Space_Grotesk',sans-serif] ${
                  isDark ? 'text-white group-hover:text-amber-200' : 'text-[#0D2214] group-hover:text-[#FF6600]'
                }`}
              >
                {provider.name}
              </h3>
              {provider.verified && (
                <VerificationBadge
                  verifications={provider.verifications}
                  size="sm"
                  onOpenDetails={onOpenTrustModal}
                />
              )}
            </div>

            <p className={`text-xs font-semibold truncate ${isDark ? 'text-[#FF6600]' : 'text-[#EA580C]'}`}>
              {provider.businessName || provider.service}
            </p>

            <div className={`flex items-center gap-3 mt-1.5 text-xs ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {provider.rating.toFixed(2)}
                <span className={`font-normal ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  ({provider.reviewsCount})
                </span>
              </span>
              <span>•</span>
              <span className="font-semibold text-[11px] font-mono">
                {provider.completedJobs} completed jobs
              </span>
            </div>
          </div>
        </div>

        {/* Bio snippet */}
        <p
          className={`text-xs line-clamp-2 mb-3 leading-relaxed ${
            isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'
          }`}
        >
          {provider.bio}
        </p>

        {/* Subcategories tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {provider.subCategories.slice(0, 3).map((sub, i) => (
            <span
              key={i}
              className={`text-[10px] px-2.5 py-0.5 rounded-md font-semibold border ${
                isDark
                  ? 'bg-[#0E1F12] border-[#23402A] text-[#C5D6C8]'
                  : 'bg-[#F2F6F2] border-[#D2DFD4] text-[#2C4A33]'
              }`}
            >
              {sub}
            </span>
          ))}
          {provider.subCategories.length > 3 && (
            <span className={`text-[10px] px-1.5 py-0.5 font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              +{provider.subCategories.length - 3} more
            </span>
          )}
        </div>

        {/* Key Metrics Strip: Location, Availability & Response */}
        <div
          className={`rounded-xl p-2.5 space-y-1.5 text-[11px] mb-4 border ${
            isDark
              ? 'bg-[#0B1A0E] border-[#23402A]'
              : 'bg-[#F5F8F4] border-[#D2DFD4]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              <MapPin className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
              Service Area
            </span>
            <span className={`font-semibold truncate max-w-[170px] ${isDark ? 'text-[#F3F6F3]' : 'text-[#0D2214]'}`}>
              {provider.locationCity} ({provider.serviceAreas[0]})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              <Calendar className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
              Availability
            </span>
            <span className="font-semibold text-emerald-500 truncate max-w-[170px]">
              {provider.availability}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              <Clock className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
              Response SLA
            </span>
            <span className={`font-medium ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
              {provider.responseRate} ({provider.responseTime})
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: Pricing & CTAs */}
      <div
        className={`pt-3 flex items-center justify-between gap-2 border-t ${
          isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'
        }`}
      >
        <div>
          <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            Starting Rate
          </span>
          <span className={`text-sm sm:text-base font-extrabold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
            {provider.startingPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewProfile(provider)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
              isDark
                ? 'bg-[#1B3522] text-[#F3F6F3] hover:bg-[#23442C] border-[#2E5437]'
                : 'bg-[#EBF1EB] text-[#0D2214] hover:bg-[#E0E9E0] border-[#CCDACC]'
            }`}
          >
            View Profile
          </button>

          <button
            type="button"
            onClick={() => onRequestService(provider)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FF6600] hover:bg-[#FF7A1A] text-white transition-all flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <span>Request</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
