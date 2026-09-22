import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ServiceRequest } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ReportProblemModalProps {
  request: ServiceRequest | null;
  onClose: () => void;
  onSubmitReport: (requestId: string, reason: string, details: string) => void;
}

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({
  request,
  onClose,
  onSubmitReport,
}) => {
  const { isDark } = useTheme();
  const [reason, setReason] = useState<string>('Workmanship did not meet standard');
  const [details, setDetails] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);

  if (!request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(request.id, reason, details || 'Customer filed an intervention request.');
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-4 border ${
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
            <AlertTriangle className="w-5 h-5 text-[#FF6600]" />
            <h3
              className={`font-bold text-base sm:text-lg font-['Space_Grotesk',sans-serif] ${
                isDark ? 'text-white' : 'text-[#0D2214]'
              }`}
            >
              Report an Issue / Dispute
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

        {isSent ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#FF6600]/15 border border-[#FF6600]/40 text-[#FF6600] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-mono text-[#FF6600] uppercase font-black tracking-wider">
                Má fo. You are covered.
              </span>
              <h4 className={`text-xl font-bold mt-1 mb-2 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                Escalation Ticket Opened
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed max-w-sm mx-auto ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
                Your payout to {request.providerName} remains frozen in safe escrow. A MAFO Case Manager will review details and contact both parties promptly.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-md"
            >
              Return to Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div
              className={`p-3.5 rounded-xl border text-xs ${
                isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
              }`}
            >
              <span className={`block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Job Reference</span>
              <strong className={isDark ? 'text-white' : 'text-[#0D2214]'}>{request.serviceTitle}</strong>
              <span className="text-[#FF6600] block mt-0.5 font-semibold">
                Specialist: {request.providerName}
              </span>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                What went wrong?
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className={`w-full rounded-xl px-3 py-2 text-xs sm:text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                  isDark
                    ? 'bg-[#0B1A0E] border-[#23402A] text-white'
                    : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214]'
                }`}
              >
                <option value="Workmanship did not meet standard">
                  Workmanship / quality did not meet agreed standard
                </option>
                <option value="Provider did not complete all items">
                  Provider marked complete before finishing all items
                </option>
                <option value="Unexpected charge or price dispute">
                  Provider demanded extra payment outside agreed estimate
                </option>
                <option value="Unprofessional behavior or delay">
                  Unprofessional conduct or extreme unexcused delay
                </option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                Describe specifics
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Give us brief context so our case manager can review immediately..."
                className={`w-full rounded-xl p-3 text-xs sm:text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                  isDark
                    ? 'bg-[#0B1A0E] border-[#23402A] text-white placeholder-[#6D8A72]'
                    : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214] placeholder-[#7A9880]'
                }`}
              />
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${isDark ? 'bg-[#0E2314] border-[#2E5437]' : 'bg-[#EBF5EE] border-[#B7D8BF]'}`}>
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                Escrow funds are withheld until mutual satisfaction or MAFO Case Manager mediation is finalized.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  isDark
                    ? 'bg-[#0B1A0E] border-[#23402A] text-[#C5D6C8] hover:text-white'
                    : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#2C4A33] hover:text-black'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                Submit Dispute Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
