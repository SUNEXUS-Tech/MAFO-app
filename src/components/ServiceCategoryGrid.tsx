import React from 'react';
import {
  Wrench,
  Zap,
  FlameKindling,
  Hammer,
  Sparkles,
  Paintbrush,
  Palette,
  Camera,
  GraduationCap,
  Scissors,
  Cpu,
  Utensils,
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { Category } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ServiceCategoryGridProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export const ServiceCategoryGrid: React.FC<ServiceCategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { isDark } = useTheme();

  const iconMap: Record<string, React.ElementType> = {
    Wrench,
    Zap,
    FlameKindling,
    Hammer,
    Sparkles,
    Paintbrush,
    Palette,
    Camera,
    GraduationCap,
    Scissors,
    Cpu,
    Utensils,
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs font-bold text-[#FF6600] uppercase tracking-wider font-mono">
            Browse Disciplines • Akure Pilot
          </span>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight font-['Space_Grotesk',sans-serif] ${
              isDark ? 'text-white' : 'text-[#0D2214]'
            }`}
          >
            Verified Services & Trades
          </h2>
        </div>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className={`text-xs flex items-center gap-1 cursor-pointer font-semibold transition-colors ${
              isDark ? 'text-[#FF6600] hover:text-white' : 'text-[#FF6600] hover:text-[#0D2214]'
            }`}
          >
            Clear category filter ({selectedCategory}) ×
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat: Category) => {
          const Icon = iconMap[cat.iconName] || Wrench;
          const isSelected = selectedCategory?.toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.name)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer group flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-[#FF6600]/15 border-[#FF6600] shadow-md ring-2 ring-[#FF6600]/40'
                  : isDark
                  ? 'bg-[#132517] border-[#23402A] hover:border-[#37613F] hover:bg-[#18311E]'
                  : 'bg-white border-[#D2DFD4] hover:border-[#B2CAB6] hover:bg-[#F9FAF9] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#FF6600] text-white font-bold'
                      : isDark
                      ? 'bg-[#0B1A0E] text-[#FF6600] group-hover:bg-[#1E3E24]'
                      : 'bg-[#F2F6F2] text-[#FF6600] group-hover:bg-[#E2EBE3]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  {cat.activeProviders} vetted
                </span>
              </div>

              <div>
                <h3
                  className={`font-bold text-xs sm:text-sm transition-colors ${
                    isSelected
                      ? 'text-[#FF6600]'
                      : isDark
                      ? 'text-white group-hover:text-amber-100'
                      : 'text-[#0D2214] group-hover:text-[#FF6600]'
                  }`}
                >
                  {cat.name}
                </h3>
                <p
                  className={`text-[11px] line-clamp-1 mt-0.5 font-normal ${
                    isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'
                  }`}
                >
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
