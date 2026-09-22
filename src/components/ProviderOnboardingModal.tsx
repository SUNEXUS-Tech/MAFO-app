import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Provider } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProviderOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProviderJoined: (newProvider: Provider) => void;
}

export const ProviderOnboardingModal: React.FC<ProviderOnboardingModalProps> = ({
  isOpen,
  onClose,
  onProviderJoined,
}) => {
  const { isDark } = useTheme();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('Babatunde Adeleke');
  const [businessName, setBusinessName] = useState('Adeleke Plumbing & Engineering');
  const [phone, setPhone] = useState('+234 802 334 9918');
  const [service, setService] = useState('Plumbing');
  const [city, setCity] = useState('Akure');
  const [areas, setAreas] = useState('Alagbaka, Oba-Ile, Ijapo Estate');
  const [experience, setExperience] = useState('8');
  const [startingRate, setStartingRate] = useState('₦12,000');
  const [ninNumber, setNinNumber] = useState('5541-9923-0182');
  const [bio, setBio] = useState(
    'Specialist in residential piping, solar-assisted borehole pump systems, and leak diagnostics.'
  );

  if (!isOpen) return null;

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handlePublish = () => {
    const newProv: Provider = {
      id: `p-${Date.now()}`,
      name: fullName,
      businessName: businessName,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      service: service,
      subCategories: ['General Repairs', 'Diagnostic', 'Installations'],
      rating: 5.0,
      completedJobs: 1,
      reviewsCount: 1,
      locationCity: city,
      serviceAreas: areas.split(',').map((s) => s.trim()),
      availability: 'Available tomorrow (9:00 AM)',
      startingPrice: startingRate,
      priceType: 'fixed',
      responseRate: '100%',
      responseTime: '< 10 mins',
      repeatCustomersPercent: 0,
      bio: bio,
      experienceYears: parseInt(experience, 10) || 5,
      verified: true,
      verifications: {
        identity: true,
        phone: true,
        service: true,
        credentials: true,
      },
      portfolio: [],
      reviews: [],
    };

    onProviderJoined(newProv);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-6 border ${
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600]" />
            <h3
              className={`font-bold text-base sm:text-lg font-['Space_Grotesk',sans-serif] ${
                isDark ? 'text-white' : 'text-[#0D2214]'
              }`}
            >
              Join MAFO as a Verified Specialist
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

        {/* Steps */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className={`flex items-center justify-between text-xs border-b pb-2 ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
            <span className="font-mono text-[#FF6600] uppercase font-bold">
              Step {step} of 4 —{' '}
              {step === 1 && 'Basic Professional Identity'}
              {step === 2 && 'Discipline & Rates'}
              {step === 3 && 'Verification & NIN'}
              {step === 4 && 'Profile Confirmation'}
            </span>
            <span className={`font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>{step * 25}%</span>
          </div>

          {step === 1 && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                    isDark
                      ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                      : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                    isDark
                      ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                      : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  WhatsApp / Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                    isDark
                      ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                      : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                  }`}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Primary Discipline
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                    isDark
                      ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                      : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                  }`}
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical & Solar">Electrical & Solar</option>
                  <option value="AC & Cooling">AC & Refrigeration</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Carpentry & Wood">Carpentry & Wood</option>
                  <option value="Painting & Screeding">Painting & Screeding</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                    Operating City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                      isDark
                        ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                        : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                    }`}
                  >
                    <option value="Akure">Akure (Pilot City)</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                  </select>
                </div>
                <div>
                  <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                      isDark
                        ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                        : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Starting Base Rate in ₦
                </label>
                <input
                  type="text"
                  value={startingRate}
                  onChange={(e) => setStartingRate(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                    isDark
                      ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                      : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                  }`}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3.5 text-xs">
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark
                    ? 'bg-[#0E2314] border-[#2E5437] text-[#C5D6C8]'
                    : 'bg-[#EBF5EE] border-[#B7D8BF] text-[#2C4A33]'
                }`}
              >
                <span className="font-bold text-[#FF6600] block mb-1">
                  Trust is our product foundation:
                </span>
                We verify government-issued identifiers before listing your profile on the MAFO network.
              </div>

              <div>
                <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  National Identification Number (NIN)
                </label>
                <input
                  type="text"
                  value={ninNumber}
                  onChange={(e) => setNinNumber(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-sm font-mono border focus:outline-none focus:border-[#FF6600] ${
                    isDark
                      ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                      : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Professional Summary & Standards
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`w-full rounded-xl p-3 text-xs font-medium border focus:outline-none focus:border-[#FF6600] ${
                    isDark
                      ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                      : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                  }`}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div
              className={`space-y-3 p-4 rounded-xl border text-xs ${
                isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
              }`}
            >
              <div className={`flex items-center gap-2 pb-2 border-b ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Ready to Publish Profile
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Name:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Discipline:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{service}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Coverage:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{city} ({areas})</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Starting Rate:</span>
                <span className="text-[#FF6600] font-black">{startingRate}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Status:</span>
                <span className="text-emerald-500 font-bold">MAFO Verified Fast-Track</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={`pt-3 border-t flex items-center justify-between ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  isDark
                    ? 'bg-[#0B1A0E] border-[#23402A] text-[#C5D6C8] hover:text-white'
                    : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#2C4A33] hover:text-black'
                }`}
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="px-6 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                Publish & Start Accepting Jobs
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
