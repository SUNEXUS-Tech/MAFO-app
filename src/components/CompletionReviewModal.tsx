import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { ServiceRequest, ReviewMetric } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CompletionReviewModalProps {
  request: ServiceRequest | null;
  onClose: () => void;
  onSubmitReview: (
    requestId: string,
    overallRating: number,
    metrics: ReviewMetric,
    feedback: string
  ) => void;
  onReportProblem: (request: ServiceRequest) => void;
}

export const CompletionReviewModal: React.FC<CompletionReviewModalProps> = ({
  request,
  onClose,
  onSubmitReview,
  onReportProblem,
}) => {
  const { isDark } = useTheme();
  const [overallRating, setOverallRating] = useState<number>(5);
  const [quality, setQuality] = useState<number>(5);
  const [professionalism, setProfessionalism] = useState<number>(5);
  const [communication, setCommunication] = useState<number>(5);
  const [reliability, setReliability] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>('');

  if (!request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview(
      request.id,
      overallRating,
      {
        quality,
        professionalism,
        communication,
        reliability,
      },
      feedback || 'Job executed with high standard and punctuality.'
    );
    onClose();
  };

  const renderStarSelector = (
    value: number,
    onChange: (val: number) => void,
    size: 'lg' | 'sm' = 'sm'
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 focus:outline-none transition-colors cursor-pointer"
          >
            <Star
              className={`${
                size === 'lg' ? 'w-7 h-7' : 'w-4 h-4'
              } ${
                star <= value
                  ? 'fill-amber-400 text-amber-400'
                  : isDark
                  ? 'text-[#23402A]'
                  : 'text-[#D2DFD4]'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-4 border ${
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
              Confirm Service & Build Reputation
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Job summary recap */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
              isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
            }`}
          >
            <div>
              <span className={`block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                {request.serviceTitle}
              </span>
              <strong className={`text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                Delivered by {request.providerName}
              </strong>
            </div>
            <span className="font-mono text-[#FF6600] font-black text-sm">{request.estimatedPrice}</span>
          </div>

          {/* Overall Rating */}
          <div
            className={`text-center py-3 rounded-xl border ${
              isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
            }`}
          >
            <label className={`block text-xs font-bold uppercase mb-2 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
              Overall Job Experience
            </label>
            <div className="flex justify-center mb-1">
              {renderStarSelector(overallRating, setOverallRating, 'lg')}
            </div>
            <span className="text-xs font-mono font-bold text-amber-500">
              {overallRating === 5
                ? 'Exceptional Workmanship (5/5)'
                : overallRating === 4
                ? 'Very Good Standard (4/5)'
                : `${overallRating} / 5 Stars`}
            </span>
          </div>

          {/* 4 Structured Feedback Pillars */}
          <div
            className={`space-y-3 p-4 rounded-xl border ${
              isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                1. Quality of Craft & Result
              </span>
              {renderStarSelector(quality, setQuality, 'sm')}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                2. Professionalism & Cleanliness
              </span>
              {renderStarSelector(professionalism, setProfessionalism, 'sm')}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                3. Communication & Punctuality
              </span>
              {renderStarSelector(communication, setCommunication, 'sm')}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                4. Reliability & Problem Solving
              </span>
              {renderStarSelector(reliability, setReliability, 'sm')}
            </div>
          </div>

          {/* Written feedback */}
          <div>
            <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
              Public Community Review (Optional)
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g. Uthman was prompt, delivered clean and robust code, and walked us through the deployment..."
              className={`w-full rounded-xl p-3 text-xs sm:text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                isDark
                  ? 'bg-[#0B1A0E] border-[#23402A] text-white placeholder-[#6D8A72]'
                  : 'bg-[#F5F8F4] border-[#D2DFD4] text-[#0D2214] placeholder-[#7A9880]'
              }`}
            />
          </div>

          {/* Bottom Actions */}
          <div className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onReportProblem(request);
              }}
              className="text-xs text-rose-500 hover:text-rose-400 underline underline-offset-4 cursor-pointer font-medium"
            >
              Have an issue? Report a problem instead
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Completion & Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
