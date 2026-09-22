import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Star,
  Check,
  X,
  MessageSquare,
  PlayCircle,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { Provider, ServiceRequest, RequestStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { VerificationBadge } from './VerificationBadge';
import { useTheme } from '../context/ThemeContext';

interface ProviderDashboardProps {
  provider: Provider;
  requests: ServiceRequest[];
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onUpdateStatus: (requestId: string, newStatus: RequestStatus) => void;
  onOpenChat: (requestId: string) => void;
  onOpenTrustModal: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({
  provider,
  requests,
  onAcceptRequest,
  onDeclineRequest,
  onUpdateStatus,
  onOpenChat,
  onOpenTrustModal,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'new' | 'active' | 'reputation'>('new');

  // Filter requests
  const newRequests = requests.filter(
    (r) => r.status === 'request_sent' || r.status === 'provider_reviewing'
  );
  const activeJobs = requests.filter(
    (r) =>
      r.status === 'accepted' ||
      r.status === 'scheduled' ||
      r.status === 'in_progress' ||
      r.status === 'completed'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Welcome Bar */}
      <div
        className={`rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border ${
          isDark
            ? 'bg-[#132517] border-[#23402A]'
            : 'bg-white border-[#D2DFD4]'
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src={provider.avatar}
            alt={provider.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FF6600]"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                className={`text-xl sm:text-2xl font-bold font-['Space_Grotesk',sans-serif] ${
                  isDark ? 'text-white' : 'text-[#0D2214]'
                }`}
              >
                Welcome back, {provider.name.split(' ')[0]} 👋
              </h2>
              <VerificationBadge
                verifications={provider.verifications}
                size="sm"
                onOpenDetails={onOpenTrustModal}
              />
            </div>
            <p className="text-xs sm:text-sm text-[#FF6600] font-semibold mt-0.5">
              {provider.businessName} • {provider.locationCity} ({provider.serviceAreas[0]})
            </p>
            <span className={`text-[11px] font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              Operating Status: <strong className="text-emerald-500 font-bold">Online & Accepting Bookings</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`px-4 py-2.5 rounded-xl text-right border ${
              isDark
                ? 'bg-[#0B1A0E] border-[#23402A]'
                : 'bg-[#F5F8F4] border-[#D2DFD4]'
            }`}
          >
            <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              30-Day Volume (Est.)
            </span>
            <span className={`text-lg font-extrabold font-mono ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
              ₦{((provider.completedJobs * 25000) / 4).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
          }`}
        >
          <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            New Requests
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#FF6600]">{newRequests.length}</span>
            {newRequests.length > 0 && (
              <span className="text-[10px] font-bold text-amber-500 animate-pulse">Action needed</span>
            )}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
          }`}
        >
          <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            Active Jobs
          </span>
          <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{activeJobs.length}</span>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
          }`}
        >
          <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            Total Delivered
          </span>
          <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{provider.completedJobs}</span>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
          }`}
        >
          <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            Reputation Rating
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="text-2xl font-black text-amber-500">{provider.rating.toFixed(2)}</span>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
          }`}
        >
          <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            Response SLA
          </span>
          <span className="text-2xl font-black text-emerald-500">{provider.responseRate}</span>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
          }`}
        >
          <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
            Repeat Clients
          </span>
          <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{provider.repeatCustomersPercent}%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex items-center gap-2 border-b pb-3 ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'new'
              ? 'bg-[#FF6600] text-white shadow-md'
              : isDark
              ? 'bg-[#132517] text-[#C5D6C8] hover:text-white border border-[#23402A]'
              : 'bg-white text-[#2C4A33] hover:text-black border border-[#D2DFD4]'
          }`}
        >
          <span>Incoming Requests</span>
          <span
            className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-mono ${
              activeTab === 'new' ? 'bg-black/30 text-white' : 'bg-[#FF6600]/20 text-[#FF6600]'
            }`}
          >
            {newRequests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'active'
              ? 'bg-[#FF6600] text-white shadow-md'
              : isDark
              ? 'bg-[#132517] text-[#C5D6C8] hover:text-white border border-[#23402A]'
              : 'bg-white text-[#2C4A33] hover:text-black border border-[#D2DFD4]'
          }`}
        >
          <span>Active & Scheduled Jobs</span>
          <span
            className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-mono ${
              activeTab === 'active' ? 'bg-black/30 text-white' : 'bg-[#FF6600]/20 text-[#FF6600]'
            }`}
          >
            {activeJobs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reputation')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reputation'
              ? 'bg-[#FF6600] text-white shadow-md'
              : isDark
              ? 'bg-[#132517] text-[#C5D6C8] hover:text-white border border-[#23402A]'
              : 'bg-white text-[#2C4A33] hover:text-black border border-[#D2DFD4]'
          }`}
        >
          <span>Reputation & Vetting Dossier</span>
        </button>
      </div>

      {/* Tab 1: New Incoming Requests */}
      {activeTab === 'new' && (
        <div className="space-y-4">
          {newRequests.length === 0 ? (
            <div
              className={`p-12 text-center rounded-2xl border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <CheckCircle2 className="w-10 h-10 text-[#FF6600] mx-auto mb-3" />
              <h4 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                You're all caught up!
              </h4>
              <p className={`text-xs ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                New incoming requests in your Akure coverage areas will notify you here.
              </p>
            </div>
          ) : (
            newRequests.map((req) => (
              <div
                key={req.id}
                className={`rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 border-2 ${
                  isDark
                    ? 'bg-[#132517] border-[#FF6600]/40'
                    : 'bg-white border-[#FF6600]/40 shadow-sm'
                }`}
              >
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6600]">
                      {req.id}
                    </span>
                    <StatusBadge status={req.status} size="sm" />
                    <span className={`text-xs ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                      Received {req.createdAt}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#FF6600] font-mono">
                    Budget: {req.estimatedPrice} ({req.budgetPreference})
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 space-y-2.5">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                      {req.serviceTitle}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm p-3.5 rounded-xl border ${
                        isDark
                          ? 'bg-[#0B1A0E] border-[#23402A] text-[#E0ECE2]'
                          : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#1D3624]'
                      }`}
                    >
                      {req.taskDescription}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs pt-1">
                      <span className={`flex items-center gap-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                        <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
                        {req.customerLocation}
                      </span>
                      <span className={`flex items-center gap-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                        <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                        {req.scheduledDate} ({req.scheduledTime})
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {req.urgency}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      isDark
                        ? 'bg-[#0B1A0E] border-[#23402A]'
                        : 'bg-[#F5F8F4] border-[#D2DFD4]'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                        Client Contact
                      </span>
                      <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                        {req.customerName}
                      </h4>
                      <p className={`text-xs ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>{req.customerPhone}</p>
                      <div className="mt-2 text-[11px] text-emerald-500 font-semibold">
                        ✓ MAFO Verified Identity
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`pt-4 mt-3 border-t space-y-2 ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onAcceptRequest(req.id)}
                          className="py-2.5 px-3 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-md"
                        >
                          <Check className="w-4 h-4" /> Accept Job
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeclineRequest(req.id)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-colors cursor-pointer ${
                            isDark
                              ? 'bg-[#132517] border-[#23402A] text-[#C5D6C8] hover:text-rose-400 hover:border-rose-500/40'
                              : 'bg-white border-[#D2DFD4] text-[#2C4A33] hover:text-rose-600 hover:border-rose-300'
                          }`}
                        >
                          <X className="w-4 h-4" /> Decline
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenChat(req.id)}
                        className={`w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border cursor-pointer ${
                          isDark
                            ? 'bg-[#132517] border-[#23402A] text-white hover:bg-[#1C3522]'
                            : 'bg-white border-[#D2DFD4] text-[#0D2214] hover:bg-[#EBF1EB]'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#FF6600]" />
                        <span>Ask a Question</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Active & In-Progress Jobs */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeJobs.map((req) => (
            <div
              key={req.id}
              className={`rounded-2xl p-5 space-y-4 border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{req.id}</span>
                  <StatusBadge status={req.status} size="sm" />
                  <span className={`text-xs ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>{req.customerName}</span>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'accepted' && (
                    <button
                      onClick={() => onUpdateStatus(req.id, 'in_progress')}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <PlayCircle className="w-3.5 h-3.5" /> Start Execution
                    </button>
                  )}

                  {req.status === 'in_progress' && (
                    <button
                      onClick={() => onUpdateStatus(req.id, 'completed')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <FileCheck className="w-3.5 h-3.5" /> Mark Job Complete
                    </button>
                  )}

                  <button
                    onClick={() => onOpenChat(req.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border cursor-pointer ${
                      isDark
                        ? 'bg-[#0B1A0E] border-[#23402A] text-white hover:bg-[#1C3522]'
                        : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214] hover:bg-[#EBF1EB]'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#FF6600]" />
                    <span>Chat Client</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs">
                <div>
                  <h4 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                    {req.serviceTitle}
                  </h4>
                  <p className={`line-clamp-2 max-w-xl ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
                    {req.taskDescription}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                    Agreed Payout
                  </span>
                  <span className="text-base font-black text-[#FF6600] font-mono">{req.estimatedPrice}</span>
                  <span className="text-[10px] text-emerald-500 block mt-0.5 font-bold">Escrow Secured</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Reputation & Verification Center */}
      {activeTab === 'reputation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`rounded-2xl p-5 space-y-4 border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                Trust & Performance Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Quality</span>
                  <span className="text-lg font-bold text-[#FF6600] font-mono">4.9 / 5.0</span>
                  <span className={`text-[10px] block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Pristine code</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Professionalism</span>
                  <span className="text-lg font-bold text-[#FF6600] font-mono">5.0 / 5.0</span>
                  <span className={`text-[10px] block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Respectful</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Communication</span>
                  <span className="text-lg font-bold text-[#FF6600] font-mono">4.9 / 5.0</span>
                  <span className={`text-[10px] block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Fast updates</span>
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Reliability</span>
                  <span className="text-lg font-bold text-[#FF6600] font-mono">4.9 / 5.0</span>
                  <span className={`text-[10px] block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Timely delivery</span>
                </div>
              </div>
            </div>

            {/* Recent Client Reviews */}
            <div
              className={`rounded-2xl p-5 space-y-3 border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                Recent Verified Feedback
              </h3>
              <div className="space-y-3">
                {provider.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 border ${
                      isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                        {rev.authorName} ({rev.authorLocation})
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{rev.rating}</span>
                      </div>
                    </div>
                    <p className={`italic ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Vetted Credentials */}
          <div className="space-y-4">
            <div
              className={`rounded-2xl p-5 space-y-4 border ${
                isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Active Verification Dossier
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className={`flex items-center justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}>National ID / NIN</span>
                  <span className="text-emerald-500 font-mono font-bold">✓ VETTED</span>
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}>Phone & OTP Binding</span>
                  <span className="text-emerald-500 font-mono font-bold">✓ ACTIVE</span>
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}>Code Architecture & References</span>
                  <span className="text-emerald-500 font-mono font-bold">✓ VERIFIED</span>
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'}`}>
                  <span className={isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}>MAFO Escrow Protection</span>
                  <span className="text-emerald-500 font-mono font-bold">✓ COVERED</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenTrustModal}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                  isDark
                    ? 'bg-[#0B1A0E] border-[#23402A] text-[#C5D6C8] hover:text-white'
                    : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#2C4A33] hover:text-black'
                }`}
              >
                View Full Verification Framework
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
