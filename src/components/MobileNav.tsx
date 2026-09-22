import React from 'react';
import { Compass, Search, ClipboardList, MessageSquare, UserCheck, Sun, Moon } from 'lucide-react';
import { UserRole } from '../types';
import { useTheme } from '../context/ThemeContext';

interface MobileNavProps {
  currentRole: UserRole;
  activeTab: 'home' | 'search' | 'requests' | 'messages' | 'provider_dashboard';
  setActiveTab: (tab: 'home' | 'search' | 'requests' | 'messages' | 'provider_dashboard') => void;
  activeRequestsCount: number;
  unreadMessagesCount: number;
  onToggleRole: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentRole,
  activeTab,
  setActiveTab,
  activeRequestsCount,
  unreadMessagesCount,
  onToggleRole,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t px-2 py-2 safe-bottom transition-colors ${
        isDark
          ? 'bg-[#07140B]/95 border-[#23402A] text-[#F3F6F3]'
          : 'bg-[#F5F7F4]/95 border-[#D2DFD4] text-[#0D2214]'
      }`}
    >
      <div className="flex items-center justify-around">
        {currentRole === 'customer' ? (
          <>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#FF6600]'
                  : isDark
                  ? 'text-[#A1B8A5] hover:text-white'
                  : 'text-[#44634B] hover:text-black'
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold tracking-tight">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'search'
                  ? 'text-[#FF6600]'
                  : isDark
                  ? 'text-[#A1B8A5] hover:text-white'
                  : 'text-[#44634B] hover:text-black'
              }`}
            >
              <Search className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold tracking-tight">Find</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1.5 rounded-lg relative transition-colors cursor-pointer ${
                activeTab === 'requests'
                  ? 'text-[#FF6600]'
                  : isDark
                  ? 'text-[#A1B8A5] hover:text-white'
                  : 'text-[#44634B] hover:text-black'
              }`}
            >
              <div className="relative">
                <ClipboardList className="w-5 h-5 mb-0.5" />
                {activeRequestsCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#FF6600] text-white text-[9px] font-bold flex items-center justify-center">
                    {activeRequestsCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold tracking-tight">Requests</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1.5 rounded-lg relative transition-colors cursor-pointer ${
                activeTab === 'messages'
                  ? 'text-[#FF6600]'
                  : isDark
                  ? 'text-[#A1B8A5] hover:text-white'
                  : 'text-[#44634B] hover:text-black'
              }`}
            >
              <div className="relative">
                <MessageSquare className="w-5 h-5 mb-0.5" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF6600]" />
                )}
              </div>
              <span className="text-[10px] font-semibold tracking-tight">Chat</span>
            </button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-amber-400' : 'text-[#0D2214]'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 mb-0.5" /> : <Moon className="w-5 h-5 mb-0.5" />}
              <span className="text-[10px] font-semibold tracking-tight">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={onToggleRole}
              className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] py-1 px-1.5 rounded-lg text-[#FF6600] cursor-pointer"
              title="Switch role"
            >
              <UserCheck className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">Provider</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('provider_dashboard')}
              className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] py-1 px-2 rounded-lg text-[#FF6600] cursor-pointer"
            >
              <UserCheck className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center justify-center min-w-[60px] min-h-[44px] py-1 px-2 rounded-lg cursor-pointer ${
                activeTab === 'messages'
                  ? 'text-[#FF6600]'
                  : isDark
                  ? 'text-[#A1B8A5]'
                  : 'text-[#44634B]'
              }`}
            >
              <MessageSquare className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold tracking-tight">Messages</span>
            </button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex flex-col items-center justify-center min-w-[60px] min-h-[44px] py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-amber-400' : 'text-[#0D2214]'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 mb-0.5" /> : <Moon className="w-5 h-5 mb-0.5" />}
              <span className="text-[10px] font-semibold tracking-tight">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={onToggleRole}
              className={`flex flex-col items-center justify-center min-w-[60px] min-h-[44px] py-1 px-2 rounded-lg cursor-pointer ${
                isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold tracking-tight">Customer</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
