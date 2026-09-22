import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  ShieldCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { Provider } from '../types';
import { ProviderCard } from './ProviderCard';
import { useTheme } from '../context/ThemeContext';

interface SearchViewProps {
  providers: Provider[];
  initialCategory?: string | null;
  initialQuery?: string;
  onViewProfile: (provider: Provider) => void;
  onRequestService: (provider: Provider) => void;
  onOpenTrustModal: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  providers,
  initialCategory,
  initialQuery = '',
  onViewProfile,
  onRequestService,
  onOpenTrustModal,
}) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedCity, setSelectedCity] = useState<string>('All Locations');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [minRating, setMinRating] = useState<number>(0);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(providers.map((p) => p.service));
    return ['All', ...Array.from(set)];
  }, [providers]);

  const cities = useMemo(() => {
    const set = new Set(providers.map((p) => p.locationCity));
    return ['All Locations', ...Array.from(set)];
  }, [providers]);

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesBusiness = (p.businessName || '').toLowerCase().includes(term);
        const matchesService = p.service.toLowerCase().includes(term);
        const matchesSubs = p.subCategories.some((s) => s.toLowerCase().includes(term));
        const matchesCity = p.locationCity.toLowerCase().includes(term);
        const matchesAreas = p.serviceAreas.some((a) => a.toLowerCase().includes(term));

        if (!matchesName && !matchesBusiness && !matchesService && !matchesSubs && !matchesCity && !matchesAreas) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && p.service.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // City
      if (selectedCity !== 'All Locations' && p.locationCity.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Verified only
      if (verifiedOnly && !p.verified) {
        return false;
      }

      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // Availability
      if (availabilityFilter === 'today' && !p.availability.toLowerCase().includes('today')) {
        return false;
      }
      if (availabilityFilter === 'tomorrow' && !p.availability.toLowerCase().includes('tomorrow')) {
        return false;
      }

      return true;
    });
  }, [providers, searchTerm, selectedCategory, selectedCity, verifiedOnly, minRating, availabilityFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCity('All Locations');
    setVerifiedOnly(false);
    setMinRating(0);
    setAvailabilityFilter('All');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    selectedCity !== 'All Locations' ||
    minRating > 0 ||
    availabilityFilter !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-[#FF6600] font-mono uppercase tracking-wider">
            Verified Network Directory
          </span>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-['Space_Grotesk',sans-serif] ${
              isDark ? 'text-white' : 'text-[#0D2214]'
            }`}
          >
            Verified Specialists & Artisans
          </h1>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#FF6600] hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <X className="w-3.5 h-3.5" /> Reset all filters
          </button>
        )}
      </div>

      {/* Filter Control Strip */}
      <div
        className={`rounded-2xl p-4 shadow-lg space-y-3 border ${
          isDark
            ? 'bg-[#132517] border-[#23402A]'
            : 'bg-white border-[#D2DFD4]'
        }`}
      >
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#FF6600] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by specialty, name, or area (e.g. Uthman, Alagbaka, Solar, Web)..."
            className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
              isDark
                ? 'bg-[#0B1A0E] border-[#23402A] text-white placeholder-[#6D8A72]'
                : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214] placeholder-[#7A9880]'
            }`}
          />
        </div>

        {/* Filter dropdowns & chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium border focus:outline-none focus:border-[#FF6600] ${
              isDark
                ? 'bg-[#0B1A0E] border-[#23402A] text-[#F3F6F3]'
                : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
            }`}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Discipline: {c}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium border focus:outline-none focus:border-[#FF6600] ${
              isDark
                ? 'bg-[#0B1A0E] border-[#23402A] text-[#F3F6F3]'
                : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
            }`}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                Zone: {city}
              </option>
            ))}
          </select>

          {/* Availability */}
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium border focus:outline-none focus:border-[#FF6600] ${
              isDark
                ? 'bg-[#0B1A0E] border-[#23402A] text-[#F3F6F3]'
                : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
            }`}
          >
            <option value="All">Availability: Any Time</option>
            <option value="today">Available Today</option>
            <option value="tomorrow">Available Tomorrow</option>
          </select>

          {/* Rating 4.9+ */}
          <button
            type="button"
            onClick={() => setMinRating(minRating === 4.9 ? 0 : 4.9)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
              minRating >= 4.9
                ? 'bg-[#FF6600]/15 border-[#FF6600] text-[#FF6600]'
                : isDark
                ? 'bg-[#0B1A0E] border-[#23402A] text-[#A1B8A5] hover:text-white'
                : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#506E56] hover:text-black'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>4.9+ Rating</span>
          </button>

          {/* Verified Only Toggle */}
          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              verifiedOnly
                ? 'bg-[#FF6600]/15 border-[#FF6600] text-[#FF6600]'
                : isDark
                ? 'bg-[#0B1A0E] border-[#23402A] text-[#A1B8A5] hover:text-white'
                : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#506E56] hover:text-black'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MAFO Verified Only</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>
          Showing <strong className={`font-mono font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{filteredProviders.length}</strong> vetted specialists
        </span>
        <span className="font-mono font-bold text-[#FF6600]">Escrow Protected</span>
      </div>

      {/* Provider Cards Grid */}
      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onViewProfile={onViewProfile}
              onRequestService={onRequestService}
              onOpenTrustModal={onOpenTrustModal}
            />
          ))}
        </div>
      ) : (
        /* Thoughtful Empty State with "Má fo" Reassurance */
        <div
          className={`rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 border ${
            isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#FF6600]/15 border border-[#FF6600]/40 text-[#FF6600] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs font-mono text-[#FF6600] font-bold uppercase">
              Má fo · Don't worry
            </span>
            <h3 className={`text-lg font-bold mt-1 mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
              No matching providers found
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              We couldn't find a specialist matching your exact filters right now. Try expanding your search area or discipline.
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="px-5 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
          >
            Reset Filters & View All
          </button>
        </div>
      )}
    </div>
  );
};
