import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  MessageSquare,
  FileCheck,
} from 'lucide-react';
import { ServiceRequest, RequestStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '../context/ThemeContext';

interface RequestTrackingViewProps {
  request: ServiceRequest;
  onOpenChat: (requestId: string) => void;
  onConfirmCompletion: (request: ServiceRequest) => void;
  onReportProblem: (request: ServiceRequest) => void;
  onUpdateStatus?: (requestId: string, newStatus: RequestStatus) => void;
  isProviderView?: boolean;
}

export const RequestTrackingView: React.FC<RequestTrackingViewProps> = ({
  request,
  onOpenChat,
  onConfirmCompletion,
  onReportProblem,
  onUpdateStatus,
  isProviderView = false,
}) => {
  const { isDark } = useTheme();

  const steps: { key: RequestStatus; label: string; desc: string }[] = [
    { key: 'request_sent', label: 'REQUEST SENT', desc: 'Received by MAFO' },
    { key: 'provider_reviewing', label: 'REVIEWING', desc: 'Assessing scope & distance' },
    { key: 'accepted', label: 'ACCEPTED', desc: 'Agreed to estimate' },
    { key: 'scheduled', label: 'SCHEDULED', desc: 'Slot booked' },
    { key: 'in_progress', label: 'IN PROGRESS', desc: 'Execution underway' },
    { key: 'completed', label: 'COMPLETED', desc: 'Delivered by specialist' },
    { key: 'confirmed', label: 'CONFIRMED', desc: 'Closed & verified' },
  ];

  const statusOrder: Record<RequestStatus, number> = {
    request_sent: 0,
    provider_reviewing: 1,
    accepted: 2,
    scheduled: 3,
    in_progress: 4,
    completed: 5,
    confirmed: 6,
  };

  const currentStepIdx = statusOrder[request.status];

  return (
    <div className="space-y-6">
      {/* Top Banner with Má fo Assurance */}
      <div
        className={`rounded-2xl p-5 sm:p-6 shadow-xl border ${
          isDark
            ? 'bg-[#132517] border-[#23402A]'
            : 'bg-white border-[#D2DFD4]'
        }`}
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b ${
            isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-mono font-black text-[#FF6600]">
                {request.id}
              </span>
              <StatusBadge status={request.status} size="md" />
              <span className={`text-xs font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                Initiated {request.createdAt}
              </span>
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black font-['Space_Grotesk',sans-serif] ${
                isDark ? 'text-white' : 'text-[#0D2214]'
              }`}
            >
              {request.serviceTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenChat(request.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#0B1A0E] border-[#23402A] text-white hover:bg-[#1C3522]'
                  : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214] hover:bg-[#EBF1EB]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#FF6600]" />
              <span>Job Messages ({request.messages.length})</span>
            </button>
          </div>
        </div>

        {/* 7-Step Visual Timeline */}
        <div className="py-6 overflow-x-auto">
          <div className="min-w-[680px]">
            <div className="flex items-center justify-between relative">
              {/* Background bar */}
              <div className={`absolute top-4 left-6 right-6 h-1 -z-0 ${isDark ? 'bg-[#0B1A0E]' : 'bg-[#E3EDE5]'}`} />
              {/* Progress filled bar */}
              <div
                className="absolute top-4 left-6 h-1 bg-[#FF6600] transition-all duration-500 -z-0"
                style={{
                  width: `${(currentStepIdx / (steps.length - 1)) * 92}%`,
                }}
              />

              {steps.map((s, idx) => {
                const isPassed = idx < currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={s.key} className="flex flex-col items-center text-center z-10 w-24">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isPassed
                          ? 'bg-[#FF6600] text-white ring-4 ' + (isDark ? 'ring-[#132517]' : 'ring-white')
                          : isCurrent
                          ? 'bg-[#FF6600] text-white ring-4 ring-[#FF6600]/30 animate-pulse'
                          : isDark
                          ? 'bg-[#0B1A0E] text-[#506E56] ring-4 ring-[#132517]'
                          : 'bg-[#E3EDE5] text-[#7A9880] ring-4 ring-white'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <span
                      className={`text-[10px] font-bold mt-2 tracking-tight ${
                        isCurrent
                          ? 'text-[#FF6600]'
                          : isPassed
                          ? isDark ? 'text-white' : 'text-[#0D2214]'
                          : isDark ? 'text-[#506E56]' : 'text-[#7A9880]'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className={`text-[9px] hidden sm:block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                      {s.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Special Status Intervention Alert */}
        {request.status === 'completed' && (
          <div
            className={`p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border ${
              isDark
                ? 'bg-[#0E2314] border-[#2E5437]'
                : 'bg-[#EAF3EC] border-[#A8CEB1]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-500" />
                <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Service Marked Complete by Specialist
                </h4>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                Please inspect the job thoroughly. Confirming releases the escrow payout to {request.providerName}.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onReportProblem(request)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-rose-950/40 text-rose-300 border-rose-500/30 hover:bg-rose-900/40'
                    : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                }`}
              >
                Report Problem
              </button>

              <button
                type="button"
                onClick={() => onConfirmCompletion(request)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF6600] hover:bg-[#FF7A1A] transition-colors cursor-pointer shadow-md"
              >
                Confirm Completion & Review
              </button>
            </div>
          </div>
        )}

        {request.status === 'confirmed' && (
          <div
            className={`p-4 rounded-xl flex items-center justify-between border ${
              isDark
                ? 'bg-[#0E2314] border-[#2E5437]'
                : 'bg-[#EAF3EC] border-[#A8CEB1]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <div>
                <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  Job Successfully Confirmed & Closed
                </h4>
                <p className={`text-xs ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                  Thank you for trusting MAFO. Specialist reputation and verification scores updated.
                </p>
              </div>
            </div>
            {request.review && (
              <span className="text-xs font-mono font-extrabold text-[#FF6600]">
                Rated {request.review.rating} / 5 Stars
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Timeline notes */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className={`rounded-2xl p-5 space-y-4 border ${
              isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
            }`}
          >
            <h3 className={`text-xs uppercase font-mono font-bold ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              Task Specifications
            </h3>

            <p
              className={`text-sm leading-relaxed p-4 rounded-xl border ${
                isDark
                  ? 'bg-[#0B1A0E] border-[#23402A] text-[#E0ECE2]'
                  : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#1D3624]'
              }`}
            >
              {request.taskDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
                }`}
              >
                <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  Location
                </span>
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
                  {request.customerLocation}
                </span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
                }`}
              >
                <span className={`text-[10px] uppercase font-mono block mb-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  Scheduled Time
                </span>
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                  {request.scheduledDate} at {request.scheduledTime}
                </span>
              </div>
            </div>
          </div>

          {/* Audit Trail / Timeline Log */}
          <div
            className={`rounded-2xl p-5 space-y-3 border ${
              isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
            }`}
          >
            <h3 className={`text-xs uppercase font-mono font-bold ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              Live Service Timeline & Log
            </h3>

            <div className="space-y-3">
              {request.timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6600] mt-1 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold uppercase font-mono text-[11px] ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                      <span className={`font-mono text-[10px] ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                        {item.timestamp}
                      </span>
                    </div>
                    <p className={`mt-0.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Counterparty Card & Safety Shield */}
        <div className="space-y-6">
          {/* Provider Card */}
          <div
            className={`rounded-2xl p-5 border ${
              isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
            }`}
          >
            <span className={`text-[10px] uppercase font-mono block mb-3 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              {isProviderView ? 'Customer Details' : 'Matched Verified Specialist'}
            </span>

            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={request.providerAvatar}
                alt={request.providerName}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#FF6600]"
              />
              <div>
                <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  {isProviderView ? request.customerName : request.providerName}
                </h4>
                <p className="text-xs text-[#FF6600] font-semibold">{request.providerService}</p>
                <p className={`text-[11px] font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  {isProviderView ? request.customerPhone : 'Verified Partner'}
                </p>
              </div>
            </div>

            <div className={`pt-3 border-t space-y-2 text-xs ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Agreed Price</span>
                <span className="font-extrabold text-[#FF6600] text-sm">{request.estimatedPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Pricing Terms</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{request.budgetPreference}</span>
              </div>
            </div>

            <div className={`mt-4 pt-3 border-t flex gap-2 ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
              <button
                onClick={() => onOpenChat(request.id)}
                className="w-full py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Transaction Chat</span>
              </button>
            </div>
          </div>

          {/* Má fo Assurance Card */}
          <div
            className={`p-4 rounded-2xl border space-y-2.5 ${
              isDark
                ? 'bg-[#0E2314] border-[#2E5437]'
                : 'bg-[#EBF5EE] border-[#B7D8BF]'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <h4 className={`font-bold text-xs uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                Má fo Service Guarantee
              </h4>
            </div>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
              Every job booked through MAFO is backed by verified identity credentials, SLA tracking, and escrow payout security. If anything fails to meet agreed standards, our resolution desk handles remediation.
            </p>
            <div className="text-[10px] text-[#FF6600] font-mono flex items-center gap-1 pt-1 font-bold">
              <span>● Akure Pilot Resolution Hotline Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
