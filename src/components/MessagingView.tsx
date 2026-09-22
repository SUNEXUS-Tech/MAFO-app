import React, { useState } from 'react';
import {
  Send,
  ShieldCheck,
  Calendar,
  ChevronLeft,
} from 'lucide-react';
import { ServiceRequest } from '../types';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '../context/ThemeContext';

interface MessagingViewProps {
  requests: ServiceRequest[];
  selectedRequestId: string | null;
  onSelectRequest: (id: string) => void;
  onSendMessage: (requestId: string, text: string) => void;
  onBackToRequests: () => void;
  currentRole: 'customer' | 'provider';
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  requests,
  selectedRequestId,
  onSelectRequest,
  onSendMessage,
  onBackToRequests,
  currentRole,
}) => {
  const { isDark } = useTheme();
  const [inputText, setInputText] = useState('');

  const currentReq =
    requests.find((r) => r.id === selectedRequestId) || requests[0] || null;

  const quickReplies =
    currentRole === 'customer'
      ? [
          'Hello, are you still on track for our scheduled time in Akure?',
          'The office/home entrance is near the main landmark.',
          'Please let me know once you arrive at the gate.',
        ]
      : [
          'Good day! I have confirmed your request and will be on site with tools.',
          'Job is completed. Please inspect and confirm when satisfied.',
          'I am 10 minutes away from your location.',
        ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentReq) return;
    onSendMessage(currentReq.id, inputText);
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    if (!currentReq) return;
    onSendMessage(currentReq.id, text);
  };

  if (!currentReq) {
    return (
      <div
        className={`rounded-2xl p-12 text-center max-w-xl mx-auto my-8 border ${
          isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
        }`}
      >
        <ShieldCheck className="w-10 h-10 text-[#FF6600] mx-auto mb-3" />
        <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
          No Active Service Messages
        </h3>
        <p className={`text-xs ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
          Conversations are automatically initiated when a service request is created.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 h-[720px]">
      {/* Left Sidebar: Conversations List */}
      <div
        className={`hidden md:flex flex-col rounded-2xl overflow-hidden border ${
          isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
        }`}
      >
        <div className={`p-4 border-b ${isDark ? 'border-[#23402A] bg-[#0B1A0E]' : 'border-[#D2DFD4] bg-[#F5F8F4]'}`}>
          <h3 className={`font-bold text-sm flex items-center justify-between ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
            <span>Job Communications</span>
            <span className="text-xs font-mono font-bold text-[#FF6600]">{requests.length} Active</span>
          </h3>
        </div>

        <div className="overflow-y-auto flex-1 p-2 space-y-1.5">
          {requests.map((r) => {
            const isSelected = r.id === currentReq.id;
            const lastMsg = r.messages[r.messages.length - 1];

            return (
              <button
                key={r.id}
                onClick={() => onSelectRequest(r.id)}
                className={`w-full p-3 rounded-xl text-left transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF6600]/15 border-[#FF6600]'
                    : isDark
                    ? 'bg-[#0B1A0E] border-[#23402A] hover:bg-[#18311E]'
                    : 'bg-[#F9FAF9] border-[#D2DFD4] hover:bg-[#EEF3EF]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold truncate max-w-[140px] ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                    {currentRole === 'customer' ? r.providerName : r.customerName}
                  </span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>{r.id}</span>
                </div>

                <p className="text-[11px] text-[#FF6600] font-semibold truncate mb-1">
                  {r.serviceTitle}
                </p>

                {lastMsg && (
                  <p className={`text-[11px] line-clamp-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                    {lastMsg.text}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Main Chat Area: Context Banner + Messages */}
      <div
        className={`md:col-span-2 flex flex-col rounded-2xl overflow-hidden border ${
          isDark ? 'bg-[#132517] border-[#23402A]' : 'bg-white border-[#D2DFD4]'
        }`}
      >
        {/* Transactional Context Header */}
        <div
          className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isDark ? 'border-[#23402A] bg-[#0B1A0E]' : 'border-[#D2DFD4] bg-[#F5F8F4]'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToRequests}
              className={`p-1.5 rounded-lg md:hidden border ${
                isDark ? 'bg-[#132517] border-[#23402A] text-white' : 'bg-white border-[#D2DFD4] text-black'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                  {currentRole === 'customer' ? currentReq.providerName : currentReq.customerName}
                </h4>
                <StatusBadge status={currentReq.status} size="sm" />
              </div>
              <p className={`text-xs truncate max-w-sm font-medium ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
                {currentReq.serviceTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className={`flex items-center gap-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
              <Calendar className="w-3 h-3 text-[#FF6600]" />
              {currentReq.scheduledDate}
            </span>
            <span>•</span>
            <span className="text-[#FF6600] font-black">{currentReq.estimatedPrice}</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {currentReq.messages.map((m) => {
            const isMe =
              (currentRole === 'customer' && m.sender === 'customer') ||
              (currentRole === 'provider' && m.sender === 'provider');

            if (m.isSystemNote || m.sender === 'system') {
              return (
                <div
                  key={m.id}
                  className={`p-2.5 rounded-xl border text-center max-w-md mx-auto my-2 ${
                    isDark
                      ? 'bg-[#0E2314] border-[#2E5437]'
                      : 'bg-[#EBF5EE] border-[#B7D8BF]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#FF6600] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MAFO Transaction Notice</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>{m.text}</p>
                </div>
              );
            }

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-[#FF6600] text-white font-medium rounded-br-none'
                      : isDark
                      ? 'bg-[#0B1A0E] text-[#F3F6F3] rounded-bl-none border border-[#23402A]'
                      : 'bg-[#F2F6F2] text-[#0D2214] rounded-bl-none border border-[#D2DFD4]'
                  }`}
                >
                  {m.text}
                </div>
                <span className={`text-[10px] mt-1 px-1 font-mono ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  {m.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick Transactional Prompts */}
        <div
          className={`px-4 py-2 border-t flex gap-2 overflow-x-auto ${
            isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
          }`}
        >
          {quickReplies.map((qr, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickReply(qr)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border whitespace-nowrap cursor-pointer transition-colors ${
                isDark
                  ? 'bg-[#132517] border-[#23402A] text-[#C5D6C8] hover:text-[#FF6600] hover:border-[#FF6600]'
                  : 'bg-white border-[#D2DFD4] text-[#2C4A33] hover:text-[#FF6600] hover:border-[#FF6600]'
              }`}
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={handleSend}
          className={`p-3 border-t flex items-center gap-2 ${
            isDark ? 'bg-[#0B1A0E] border-[#23402A]' : 'bg-[#F5F8F4] border-[#D2DFD4]'
          }`}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a service message or update..."
            className={`flex-1 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
              isDark
                ? 'bg-[#132517] border-[#23402A] text-white placeholder-[#6D8A72]'
                : 'bg-white border-[#D2DFD4] text-[#0D2214] placeholder-[#7A9880]'
            }`}
          />

          <button
            type="submit"
            className="px-5 py-2 bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
