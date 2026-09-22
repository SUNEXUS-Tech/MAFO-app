import React from 'react';
import {
  Compass,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  ArrowRightLeft,
  MapPin,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { MafoLogo } from './MafoLogo';
import { UserRole } from '../types';
import { useTheme } from '../context/ThemeContext';
import { AKURE_AREAS } from '../data/mockData';

interface HeaderProps {
  currentRole: UserRole;
  onToggleRole: () => void;
  activeTab: 'home' | 'search' | 'requests' | 'messages' | 'provider_dashboard';
  setActiveTab: (tab: 'home' | 'search' | 'requests' | 'messages' | 'provider_dashboard') => void;
  activeRequestsCount: number;
  unreadMessagesCount: number;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenTrustModal: () => void;
  onOpenOnboardingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onToggleRole,
  activeTab,
  setActiveTab,
  activeRequestsCount,
  unreadMessagesCount,
  selectedCity,
  onSelectCity,
  onOpenTrustModal,
  onOpenOnboardingModal,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
        isDark
          ? 'bg-[#07140B]/95 border-[#23402A] text-[#F3F6F3]'
          : 'bg-[#F5F7F4]/95 border-[#D2DFD4] text-[#0D2214]'
      } backdrop-blur-md`}
    >
      {/* Top Reassurance Strip */}
      <div
        className={`hidden sm:flex items-center justify-between px-4 lg:px-8 py-1.5 border-b text-[11px] transition-colors ${
          isDark
            ? 'bg-[#0C1E12] border-[#1D3623] text-[#A1B8A5]'
            : 'bg-[#EBF0EA] border-[#D0DCD2] text-[#2C4A33]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse" />
          <span>
            <strong className={isDark ? 'text-white' : 'text-[#0D2214]'}>
              Akure Pilot Active:
            </strong>{' '}
            Verified service matching across Alagbaka, Ijapo, FUTA & surrounding areas with MAFO escrow protection.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenTrustModal}
            className="hover:text-[#FF6600] transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6600]" />
            MAFO Trust Standards
          </button>
          <span>•</span>
          <button
            onClick={onOpenOnboardingModal}
            className="hover:text-[#FF6600] transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />
            Join as Verified Provider
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <button
          onClick={() => setActiveTab(currentRole === 'customer' ? 'home' : 'provider_dashboard')}
          className="text-left cursor-pointer focus:outline-none"
        >
          <MafoLogo size="md" />
        </button>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {currentRole === 'customer' ? (
            <>
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-[#FF6600] text-white shadow-sm'
                    : isDark
                    ? 'text-[#C5D6C8] hover:text-white hover:bg-[#132517]'
                    : 'text-[#2C4A33] hover:text-[#0D2214] hover:bg-[#E2EBE2]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Discovery</span>
              </button>

              <button
                onClick={() => setActiveTab('search')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'search'
                    ? 'bg-[#FF6600] text-white shadow-sm'
                    : isDark
                    ? 'text-[#C5D6C8] hover:text-white hover:bg-[#132517]'
                    : 'text-[#2C4A33] hover:text-[#0D2214] hover:bg-[#E2EBE2]'
                }`}
              >
                <span>Find Providers</span>
              </button>

              <button
                onClick={() => setActiveTab('requests')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 relative cursor-pointer ${
                  activeTab === 'requests'
                    ? 'bg-[#FF6600] text-white shadow-sm'
                    : isDark
                    ? 'text-[#C5D6C8] hover:text-white hover:bg-[#132517]'
                    : 'text-[#2C4A33] hover:text-[#0D2214] hover:bg-[#E2EBE2]'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                <span>My Requests</span>
                {activeRequestsCount > 0 && (
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      activeTab === 'requests'
                        ? 'bg-white text-[#FF6600]'
                        : 'bg-[#FF6600] text-white'
                    }`}
                  >
                    {activeRequestsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 relative cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-[#FF6600] text-white shadow-sm'
                    : isDark
                    ? 'text-[#C5D6C8] hover:text-white hover:bg-[#132517]'
                    : 'text-[#2C4A33] hover:text-[#0D2214] hover:bg-[#E2EBE2]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Messages</span>
                {unreadMessagesCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse" />
                )}
              </button>
            </>
          ) : (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                isDark
                  ? 'bg-[#132517] border-[#23402A] text-[#F3F6F3]'
                  : 'bg-[#EBF0EA] border-[#D0DCD2] text-[#0D2214]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse" />
              <span>PROVIDER MODE: UTHMAN ADESOLA (WEB & BRANDING)</span>
            </div>
          )}
        </nav>

        {/* Right: City Filter, Theme Toggle, Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Akure Area Filter */}
          <div
            className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs ${
              isDark
                ? 'bg-[#132517] border-[#23402A] text-[#C5D6C8]'
                : 'bg-white border-[#D2DFD4] text-[#2C4A33]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              aria-label="Filter service city or area"
              className="bg-transparent border-none focus:outline-none cursor-pointer text-xs font-semibold"
            >
              <option value="All Akure Areas" className={isDark ? 'bg-[#07140B] text-white' : 'bg-white text-black'}>
                Akure: All Areas (Pilot)
              </option>
              {AKURE_AREAS.filter((a) => a !== 'All Akure Areas').map((area) => (
                <option
                  key={area}
                  value={area}
                  className={isDark ? 'bg-[#07140B] text-white' : 'bg-white text-black'}
                >
                  Akure: {area}
                </option>
              ))}
              <option value="All Cities" className={isDark ? 'bg-[#07140B] text-white' : 'bg-white text-black'}>
                Other Cities (Expansion)
              </option>
            </select>
          </div>

          {/* Functional Theme Toggle (Mandated in Section 4) */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-[#132517] border-[#23402A] text-amber-300 hover:border-amber-400/50'
                : 'bg-white border-[#D2DFD4] text-[#0D2214] hover:border-[#FF6600]/40'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
            aria-label="Toggle visual theme"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[#C5D6C8]">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#0D2214]" />
                <span className="hidden sm:inline text-[#2C4A33]">Dark</span>
              </>
            )}
          </button>

          {/* Role Switcher Button */}
          <button
            onClick={onToggleRole}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-sm ${
              isDark
                ? 'bg-[#132517] border-[#23402A] text-white hover:border-[#FF6600]'
                : 'bg-white border-[#D2DFD4] text-[#0D2214] hover:border-[#FF6600]'
            }`}
            title="Switch between Customer and Provider interfaces"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#FF6600]" />
            <span className="hidden sm:inline">Switch to</span>
            <strong className="text-[#FF6600]">
              {currentRole === 'customer' ? 'Provider View' : 'Customer View'}
            </strong>
          </button>

          {/* User profile avatar indicator */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${
              isDark
                ? 'bg-[#1B3522] border-[#23402A] text-[#FF6600]'
                : 'bg-[#EAF0E8] border-[#D0DCD2] text-[#FF6600]'
            }`}
          >
            {currentRole === 'customer' ? 'OF' : 'UA'}
          </div>
        </div>
      </div>
    </header>
  );
};
