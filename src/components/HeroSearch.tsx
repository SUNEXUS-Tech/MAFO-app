import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Calendar, Wrench } from 'lucide-react';
import { ParsedNLPRequirement } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeroSearchProps {
  onSearch: (query: string, parsed?: ParsedNLPRequirement) => void;
  onRequestInstant: (parsed: ParsedNLPRequirement) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, onRequestInstant }) => {
  const { isDark } = useTheme();
  const [inputVal, setInputVal] = useState('');
  const [parsedData, setParsedData] = useState<ParsedNLPRequirement | null>(null);

  const samplePrompts = [
    {
      label: 'Web app & branding in Alagbaka',
      fullText: 'Need a custom web app and branding package for my business in Alagbaka, Akure',
      service: 'Web/App Development',
      task: 'Custom web platform & brand identity design',
      urgency: 'This week',
      location: 'Alagbaka, Akure',
    },
    {
      label: 'Solar & inverter in Oba Ile',
      fullText: 'Electrical fault inspection and solar inverter check in Oba Ile, Akure',
      service: 'Electrical & Solar',
      task: 'Inverter diagnostic & surge suppressor setup',
      urgency: 'Today / urgent',
      location: 'Oba Ile, Akure',
    },
    {
      label: 'Painting & screeding in Ijapo',
      fullText: 'Need wall screeding and clean interior painting in Ijapo, Akure',
      service: 'Painting & Screeding',
      task: 'Interior POP screeding and washable matte finish',
      urgency: 'Tomorrow',
      location: 'Ijapo, Akure',
    },
    {
      label: 'Fix leaking pipe in Oke-Aro',
      fullText: 'I need someone to fix a leaking bathroom pipe tomorrow in Oke-Aro, Akure',
      service: 'Plumbing & Water',
      task: 'Concealed pipe repair & pressure pump test',
      urgency: 'Tomorrow morning',
      location: 'Oke-Aro, Akure',
    },
  ];

  const parseQuery = (text: string): ParsedNLPRequirement | null => {
    if (!text || text.trim().length < 4) return null;
    const lower = text.toLowerCase();

    let service = 'General Services';
    let task = 'General service request';
    let urgency = 'Flexible schedule';
    let location = 'Akure (Pilot Area)';

    // Service identification
    if (lower.includes('web') || lower.includes('app') || lower.includes('software') || lower.includes('dev') || lower.includes('code') || lower.includes('portal')) {
      service = 'Web/App Development';
      task = 'Custom web application & portal engineering';
    } else if (lower.includes('brand') || lower.includes('logo') || lower.includes('market') || lower.includes('automat')) {
      service = 'Branding & Marketing';
      task = 'Brand identity design & workflow automation';
    } else if (lower.includes('inverter') || lower.includes('solar') || lower.includes('wire') || lower.includes('electr') || lower.includes('breaker')) {
      service = 'Electrical & Solar';
      task = 'Solar system installation & electrical diagnostics';
    } else if (lower.includes('paint') || lower.includes('screed') || lower.includes('wall') || lower.includes('pop')) {
      service = 'Painting & Screeding';
      task = 'Wall screeding & interior paint finish';
    } else if (lower.includes('pipe') || lower.includes('plumb') || lower.includes('leak') || lower.includes('water') || lower.includes('pump')) {
      service = 'Plumbing & Water';
      task = 'PPR pipe repair & water pump diagnostics';
    } else if (lower.includes('clean') || lower.includes('fumigat') || lower.includes('hygiene')) {
      service = 'Deep Cleaning';
      task = 'Deep residential hygiene & sanitization';
    } else if (lower.includes('photo') || lower.includes('video') || lower.includes('stream') || lower.includes('media')) {
      service = 'Photography & Media';
      task = 'Event photography & livestream production';
    }

    // Urgency
    if (lower.includes('tomorrow')) urgency = 'Tomorrow';
    else if (lower.includes('today') || lower.includes('urgent') || lower.includes('now')) urgency = 'Urgent / Today';
    else if (lower.includes('weekend') || lower.includes('saturday')) urgency = 'This weekend';

    // Location
    if (lower.includes('alagbaka')) location = 'Alagbaka, Akure';
    else if (lower.includes('ijapo')) location = 'Ijapo, Akure';
    else if (lower.includes('futa')) location = 'FUTA area, Akure';
    else if (lower.includes('oba ile')) location = 'Oba Ile, Akure';
    else if (lower.includes('oke-aro') || lower.includes('oke aro')) location = 'Oke-Aro, Akure';
    else if (lower.includes('isinkan')) location = 'Isinkan, Akure';
    else if (lower.includes('adebayo')) location = 'Adebayo, Akure';
    else if (lower.includes('akure')) location = 'Akure, Ondo State';

    return {
      rawText: text,
      service,
      task,
      urgency,
      location,
      preference: 'MAFO Verified Specialist',
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    setParsedData(parseQuery(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const parsed = parseQuery(inputVal);
    onSearch(inputVal, parsed || undefined);
  };

  const applyPrompt = (prompt: typeof samplePrompts[0]) => {
    setInputVal(prompt.fullText);
    const parsed: ParsedNLPRequirement = {
      rawText: prompt.fullText,
      service: prompt.service,
      task: prompt.task,
      urgency: prompt.urgency,
      location: prompt.location,
      preference: 'MAFO Verified Specialist',
    };
    setParsedData(parsed);
  };

  return (
    <section className="relative pt-6 pb-8 sm:pt-12 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Brand emotional reassurance badge */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-6 shadow-sm border transition-colors ${
          isDark
            ? 'bg-[#132517] border-[#23402A] text-[#C5D6C8]'
            : 'bg-white border-[#D2DFD4] text-[#2C4A33]'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
        <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>Má fo.</span>
        <span>Reduce uncertainty. Get things done with verified hands in Akure.</span>
      </div>

      <h1
        className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-4 font-['Space_Grotesk',sans-serif] ${
          isDark ? 'text-white' : 'text-[#0D2214]'
        }`}
      >
        What do you need done?
      </h1>

      <p
        className={`text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal ${
          isDark ? 'text-[#A1B8A5]' : 'text-[#3E5C45]'
        }`}
      >
        Tell MAFO what you need in plain words. We structure your request, match you with verified specialists in Akure, and protect your payment until you confirm satisfaction.
      </p>

      {/* Main Intelligent Search / Request Bar */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
          <div
            className={`relative flex items-center border-2 rounded-2xl shadow-xl transition-all overflow-hidden p-2 sm:p-2.5 ${
              isDark
                ? 'bg-[#132517] border-[#23402A] focus-within:border-[#FF6600]'
                : 'bg-white border-[#D2DFD4] focus-within:border-[#FF6600]'
            }`}
          >
            <div className="pl-3 pr-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6600]" />
            </div>

            <input
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              placeholder="Tell MAFO what you need... (e.g. need a web app or fix a pipe tomorrow)"
              aria-label="Service request input"
              className={`w-full bg-transparent text-sm sm:text-base px-2 py-2 focus:outline-none font-medium ${
                isDark ? 'text-white placeholder-[#6D8A72]' : 'text-[#0D2214] placeholder-[#7A9880]'
              }`}
            />

            <button
              type="submit"
              className="bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-colors shadow-md cursor-pointer"
            >
              <span>Find Providers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Dynamic AI-Assisted Request Structuring Card */}
        {parsedData && (
          <div
            className={`mt-4 p-4 rounded-xl text-left shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 border ${
              isDark
                ? 'bg-[#132517] border-[#FF6600]/40 text-[#F3F6F3]'
                : 'bg-white border-[#FF6600]/50 text-[#0D2214]'
            }`}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-[#23402A]/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF6600]" />
                <span className={`text-xs font-bold tracking-wide uppercase ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  MAFO Request Formulation
                </span>
              </div>
              <span className="text-[11px] text-[#FF6600] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Ready for matching
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 text-xs">
              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F4F7F3] border-[#D2DFD4]'
                }`}
              >
                <span className={`text-[10px] uppercase font-semibold block mb-0.5 flex items-center gap-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  <Wrench className="w-3 h-3 text-[#FF6600]" /> Service
                </span>
                <span className={`font-bold truncate block ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  {parsedData.service}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F4F7F3] border-[#D2DFD4]'
                }`}
              >
                <span className={`text-[10px] uppercase font-semibold block mb-0.5 flex items-center gap-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  <Calendar className="w-3 h-3 text-[#FF6600]" /> Urgency
                </span>
                <span className={`font-bold truncate block ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  {parsedData.urgency}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F4F7F3] border-[#D2DFD4]'
                }`}
              >
                <span className={`text-[10px] uppercase font-semibold block mb-0.5 flex items-center gap-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  <MapPin className="w-3 h-3 text-[#FF6600]" /> Location
                </span>
                <span className={`font-bold truncate block ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  {parsedData.location}
                </span>
              </div>

              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F4F7F3] border-[#D2DFD4]'
                }`}
              >
                <span className={`text-[10px] uppercase font-semibold block mb-0.5 flex items-center gap-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  <ShieldCheck className="w-3 h-3 text-[#FF6600]" /> Standard
                </span>
                <span className="font-bold text-[#FF6600] truncate block">MAFO Verified</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#23402A]/20">
              <span className={`text-[11px] truncate max-w-md ${isDark ? 'text-[#A1B8A5]' : 'text-[#44634B]'}`}>
                Task identified: <strong className={isDark ? 'text-white' : 'text-[#0D2214]'}>{parsedData.task}</strong>
              </span>
              <button
                type="button"
                onClick={() => onRequestInstant(parsedData)}
                className="text-xs font-bold text-[#FF6600] hover:text-[#FF7A1A] flex items-center gap-1 cursor-pointer underline underline-offset-4"
              >
                Send Request with these details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Suggested Prompts Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className={`text-[11px] font-medium mr-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            Try asking:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPrompt(p)}
              className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-[#132517] border-[#23402A] text-[#C5D6C8] hover:border-[#FF6600] hover:text-white'
                  : 'bg-white border-[#D2DFD4] text-[#2C4A33] hover:border-[#FF6600] hover:text-[#0D2214]'
              }`}
            >
              "{p.label}"
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
