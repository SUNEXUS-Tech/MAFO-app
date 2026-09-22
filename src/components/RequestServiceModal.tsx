import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Image as ImageIcon,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { Provider, ServiceRequest, ParsedNLPRequirement } from '../types';
import { useTheme } from '../context/ThemeContext';
import { AKURE_AREAS } from '../data/mockData';

interface RequestServiceModalProps {
  provider: Provider | null;
  parsedInitial?: ParsedNLPRequirement | null;
  onClose: () => void;
  onSubmitRequest: (newReq: ServiceRequest) => void;
  onNavigateToRequest: (reqId: string) => void;
  onNavigateToChat: (reqId: string) => void;
}

export const RequestServiceModal: React.FC<RequestServiceModalProps> = ({
  provider,
  parsedInitial,
  onClose,
  onSubmitRequest,
  onNavigateToRequest,
  onNavigateToChat,
}) => {
  const { isDark } = useTheme();
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdRequestId, setCreatedRequestId] = useState<string>('');

  // Form State with Akure Pilot defaults
  const [serviceCategory, setServiceCategory] = useState<string>(
    provider?.service || parsedInitial?.service || 'Web/App Development'
  );
  const [taskSummary, setTaskSummary] = useState<string>(
    parsedInitial?.task || 'Custom web application & portal engineering'
  );
  const [city, setCity] = useState<string>('Akure');
  const [area, setArea] = useState<string>(
    provider?.serviceAreas[0] || 'Alagbaka'
  );
  const [addressDetails, setAddressDetails] = useState<string>(
    'Plot 14, Alagbaka GRA, near State Secretariat, Akure'
  );
  const [urgency, setUrgency] = useState<string>(
    parsedInitial?.urgency || 'This week'
  );
  const [scheduledDate, setScheduledDate] = useState<string>('Tomorrow, Sep 16');
  const [scheduledTime, setScheduledTime] = useState<string>('10:00 AM');
  const [description, setDescription] = useState<string>(
    parsedInitial?.rawText ||
      'Need an intuitive web platform with client onboarding, secure document upload, and automated receipt delivery for our firm.'
  );
  const [budgetType, setBudgetType] = useState<string>('Agreed Package');
  const [estimatedBudget, setEstimatedBudget] = useState<string>(
    provider ? provider.startingPrice : '₦250,000'
  );
  const [attachedFiles] = useState<string[]>([
    'project_scope_doc_v1.pdf',
  ]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 7));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinalSubmit = () => {
    const newReqId = `REQ-AK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: ServiceRequest = {
      id: newReqId,
      customerName: 'Olumide Fashola',
      customerPhone: '+234 803 219 4481',
      customerLocation: `${area}, ${city}`,
      providerId: provider?.id || 'p-uthman',
      providerName: provider?.name || 'Uthman Adesola',
      providerAvatar:
        provider?.avatar ||
        'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&auto=format&fit=crop&q=80',
      providerService: serviceCategory,
      serviceTitle: taskSummary,
      taskDescription: description,
      urgency: urgency,
      scheduledDate: scheduledDate,
      scheduledTime: scheduledTime,
      budgetPreference: budgetType,
      estimatedPrice: estimatedBudget,
      status: 'request_sent',
      createdAt: 'Just now',
      timeline: [
        {
          status: 'request_sent',
          timestamp: 'Just now',
          note: 'Request formulated with MAFO escrow guarantee.',
        },
      ],
      messages: [
        {
          id: `m-${Date.now()}`,
          requestId: newReqId,
          sender: 'system',
          text: `Service request #${newReqId} sent to ${provider?.name || 'Specialist'}. MAFO escrow security enabled.`,
          timestamp: 'Just now',
          isSystemNote: true,
        },
        {
          id: `m-${Date.now() + 1}`,
          requestId: newReqId,
          sender: 'customer',
          text: `Hello ${provider?.name || 'Specialist'}, I submitted this request: "${description}". Scheduled for ${scheduledDate} around ${scheduledTime}.`,
          timestamp: 'Just now',
        },
      ],
    };

    setCreatedRequestId(newReqId);
    onSubmitRequest(newRequest);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh] border ${
          isDark
            ? 'bg-[#07140B] border-[#23402A] text-[#F3F6F3]'
            : 'bg-[#F5F7F4] border-[#D2DFD4] text-[#0D2214]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 sm:p-5 border-b sticky top-0 z-10 backdrop-blur-md ${
            isDark
              ? 'bg-[#07140B]/95 border-[#23402A]'
              : 'bg-[#F5F7F4]/95 border-[#D2DFD4]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600]" />
            <h3 className={`font-bold text-base sm:text-lg font-['Space_Grotesk',sans-serif] ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
              {isSubmitted ? 'Request Transmitted' : 'Initiate Service Request'}
            </h3>
            {provider && (
              <span className={`text-xs hidden sm:inline ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                with <strong className="text-[#FF6600]">{provider.name}</strong>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
              isDark
                ? 'bg-[#132517] text-[#C5D6C8] hover:text-white border-[#23402A]'
                : 'bg-white text-[#2C4A33] hover:text-black border-[#D2DFD4]'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reassurance Confirmation Screen */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-[#FF6600]/15 border-2 border-[#FF6600] text-[#FF6600] flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono text-[#FF6600] mb-2 border border-[#FF6600]/30 bg-[#FF6600]/10 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Má fo. We've got it handled.
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                Request Sent Successfully
              </h2>
              <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>
                MAFO has notified{' '}
                <strong className={isDark ? 'text-white' : 'text-[#0D2214]'}>
                  {provider?.name || 'Uthman Adesola'}
                </strong>
                . You are guaranteed a prompt response under our Akure pilot SLA.
              </p>
            </div>

            {/* Structured Summary Card */}
            <div
              className={`rounded-2xl p-5 text-left space-y-3 max-w-md mx-auto text-xs border ${
                isDark
                  ? 'bg-[#132517] border-[#23402A]'
                  : 'bg-white border-[#D2DFD4]'
              }`}
            >
              <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                <span className={`font-mono uppercase ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                  Request Reference
                </span>
                <span className="font-black text-[#FF6600] font-mono">{createdRequestId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Service</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{serviceCategory}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Task</span>
                <span className={`font-semibold truncate max-w-[200px] ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                  {taskSummary}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Scheduled Date</span>
                <span className={`font-semibold ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                  {scheduledDate} ({scheduledTime})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Location</span>
                <span className={`font-semibold ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>
                  {area}, {city}
                </span>
              </div>
              <div className={`flex items-center justify-between pt-2 border-t ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                <span className={isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}>Budget Preference</span>
                <span className="font-extrabold text-[#FF6600]">{estimatedBudget} ({budgetType})</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToRequest(createdRequestId);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
              >
                Track Request Progress
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToChat(createdRequestId);
                }}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#132517] border-[#23402A] text-white hover:bg-[#1B3522]'
                    : 'bg-white border-[#D2DFD4] text-[#0D2214] hover:bg-[#EBF1EB]'
                }`}
              >
                Message Specialist
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Step Indicators */}
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
              <span className="text-xs font-mono text-[#FF6600] uppercase tracking-wider font-bold">
                Step {step} of 7 —{' '}
                {step === 1 && 'What service do you need?'}
                {step === 2 && 'Where in Akure is the job?'}
                {step === 3 && 'When do you need it done?'}
                {step === 4 && 'Describe the task'}
                {step === 5 && 'Budget & Pricing Preference'}
                {step === 6 && 'Attachments & Documents'}
                {step === 7 && 'Review & Confirm Request'}
              </span>
              <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                {Math.round((step / 7) * 100)}%
              </span>
            </div>

            {/* Step 1: Service */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                    Select Core Discipline
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2.5 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                      isDark
                        ? 'bg-[#132517] border-[#23402A] text-white'
                        : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                    }`}
                  >
                    <option value="Web/App Development">Web/App Development & Portals</option>
                    <option value="Branding & Marketing">Branding, Marketing & Automation</option>
                    <option value="Painting & Screeding">Painting & Wall Screeding</option>
                    <option value="Electrical & Solar">Electrical & Solar Inverters</option>
                    <option value="Plumbing & Water">Plumbing & Water Systems</option>
                    <option value="Deep Cleaning">Deep Cleaning & Sanitization</option>
                    <option value="Photography & Media">Photography & Livestream</option>
                    <option value="Fashion & Tailoring">Fashion & Bespoke Tailoring</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                    Specific Task / Problem Title
                  </label>
                  <input
                    type="text"
                    value={taskSummary}
                    onChange={(e) => setTaskSummary(e.target.value)}
                    placeholder="e.g. Build client dashboard or fix bathroom pipe"
                    className={`w-full rounded-xl px-3 py-2.5 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                      isDark
                        ? 'bg-[#132517] border-[#23402A] text-white placeholder-[#6D8A72]'
                        : 'bg-white border-[#D2DFD4] text-[#0D2214] placeholder-[#7A9880]'
                    }`}
                  />
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                    Be concise. You will provide complete details in step 4.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                      City / Pilot Zone
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full rounded-xl px-3 py-2.5 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                        isDark
                          ? 'bg-[#132517] border-[#23402A] text-white'
                          : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                      }`}
                    >
                      <option value="Akure">Akure (Ondo State Pilot)</option>
                      <option value="Ibadan">Ibadan (Expansion)</option>
                      <option value="Lagos">Lagos (Expansion)</option>
                      <option value="Abuja">Abuja (Expansion)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                      Neighborhood / Area
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className={`w-full rounded-xl px-3 py-2.5 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                        isDark
                          ? 'bg-[#132517] border-[#23402A] text-white'
                          : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                      }`}
                    >
                      {AKURE_AREAS.filter((a) => a !== 'All Akure Areas').map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                    Street Address & Landmark
                  </label>
                  <input
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    placeholder="e.g. Plot 14, Alagbaka GRA, near State Secretariat"
                    className={`w-full rounded-xl px-3 py-2.5 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                      isDark
                        ? 'bg-[#132517] border-[#23402A] text-white placeholder-[#6D8A72]'
                        : 'bg-white border-[#D2DFD4] text-[#0D2214] placeholder-[#7A9880]'
                    }`}
                  />
                  <span className={`text-[11px] mt-1 block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                    Your precise address is protected until the specialist confirms the request.
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: When */}
            {step === 3 && (
              <div className="space-y-4">
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                  Urgency / Timeline
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'This week', sub: 'Kickoff in 1-2 days' },
                    { label: 'Tomorrow', sub: 'Urgent morning slot' },
                    { label: 'Flexible Date', sub: 'Next 7-14 days' },
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUrgency(option.label)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        urgency.includes(option.label)
                          ? 'bg-[#FF6600]/15 border-[#FF6600] text-[#FF6600]'
                          : isDark
                          ? 'bg-[#132517] border-[#23402A] text-[#A1B8A5] hover:border-[#355B3C]'
                          : 'bg-white border-[#D2DFD4] text-[#2C4A33] hover:border-[#B2CAB6]'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm block">{option.label}</span>
                      <span className="text-[10px] opacity-80">{option.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                      Preferred Date
                    </label>
                    <input
                      type="text"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                        isDark ? 'bg-[#132517] border-[#23402A] text-white' : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                      Preferred Time Slot
                    </label>
                    <input
                      type="text"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                        isDark ? 'bg-[#132517] border-[#23402A] text-white' : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Describe */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                    Describe what needs to be delivered or fixed
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe specific goals, issues, expectations, or required outcomes..."
                    className={`w-full rounded-xl p-3 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                      isDark
                        ? 'bg-[#132517] border-[#23402A] text-white'
                        : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                    }`}
                  />
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                    Clear requirements allow the specialist to scope and confirm milestones rapidly.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Budget */}
            {step === 5 && (
              <div className="space-y-4">
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                  Pricing Model
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'Agreed Package', sub: 'Project based on agreed scope' },
                    { label: 'Request Quote', sub: 'Specialist provides custom quote' },
                    { label: 'Inspection First', sub: 'Preliminary site review first' },
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBudgetType(option.label)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        budgetType === option.label
                          ? 'bg-[#FF6600]/15 border-[#FF6600] text-[#FF6600]'
                          : isDark
                          ? 'bg-[#132517] border-[#23402A] text-[#A1B8A5] hover:border-[#355B3C]'
                          : 'bg-white border-[#D2DFD4] text-[#2C4A33] hover:border-[#B2CAB6]'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm block">{option.label}</span>
                      <span className="text-[10px] opacity-80">{option.sub}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase mb-1 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                    Agreed Estimate in ₦
                  </label>
                  <input
                    type="text"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    placeholder="e.g. ₦250,000"
                    className={`w-full rounded-xl px-3 py-2.5 text-sm font-medium border focus:outline-none focus:border-[#FF6600] ${
                      isDark
                        ? 'bg-[#132517] border-[#23402A] text-white'
                        : 'bg-white border-[#D2DFD4] text-[#0D2214]'
                    }`}
                  />
                  <span className="text-[11px] text-[#FF6600] mt-1 block font-semibold">
                    Funds are held in MAFO Escrow and released only upon your final verification.
                  </span>
                </div>
              </div>
            )}

            {/* Step 6: Photos */}
            {step === 6 && (
              <div className="space-y-4">
                <label className={`block text-xs font-bold uppercase mb-1.5 ${isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'}`}>
                  Attachments & Reference Files
                </label>
                <div
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                    isDark
                      ? 'border-[#23402A] hover:border-[#FF6600] bg-[#0E1F12]'
                      : 'border-[#D2DFD4] hover:border-[#FF6600] bg-white'
                  }`}
                >
                  <ImageIcon className="w-8 h-8 text-[#FF6600] mx-auto mb-2" />
                  <p className={`text-xs font-medium mb-1 ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                    Upload brief, specs, or site photos (optional)
                  </p>
                  <span className={`text-[11px] ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                    Supports PDF, DOCX, PNG, JPG up to 15MB
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {attachedFiles.map((f, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                        isDark
                          ? 'bg-[#132517] border-[#23402A] text-[#E0ECE2]'
                          : 'bg-white border-[#D2DFD4] text-[#1D3624]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6600]" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Review Request */}
            {step === 7 && (
              <div className="space-y-4">
                <div
                  className={`rounded-2xl p-5 border space-y-3.5 ${
                    isDark
                      ? 'bg-[#132517] border-[#FF6600]/40'
                      : 'bg-white border-[#FF6600]/50 shadow-sm'
                  }`}
                >
                  <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                    <span className="text-xs font-mono uppercase text-[#FF6600] font-bold">
                      REVIEW REQUEST DETAILS
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                      MAFO Escrow Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                        Service
                      </span>
                      <strong className={`text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>{serviceCategory}</strong>
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                        Assigned Specialist
                      </span>
                      <strong className="text-[#FF6600] text-sm">
                        {provider?.name || 'Uthman Adesola'}
                      </strong>
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                        Schedule
                      </span>
                      <strong className={`text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                        {scheduledDate} ({scheduledTime})
                      </strong>
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                        Location
                      </span>
                      <strong className={`text-sm ${isDark ? 'text-white' : 'text-[#0D2214]'}`}>
                        {area}, {city}
                      </strong>
                    </div>
                  </div>

                  <div className={`pt-2 border-t ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                    <span className={`text-[10px] uppercase font-mono block mb-0.5 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                      Task Scope
                    </span>
                    <p className={`text-xs ${isDark ? 'text-[#E0ECE2]' : 'text-[#1D3624]'}`}>{taskSummary}</p>
                  </div>

                  <div className={`pt-2 border-t ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                    <span className={`text-[10px] uppercase font-mono block mb-0.5 ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>
                      Description
                    </span>
                    <p className={`text-xs italic ${isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'}`}>{description}</p>
                  </div>

                  <div className={`pt-2 border-t flex items-center justify-between ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
                    <span className={`text-xs ${isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'}`}>Budget Preference:</span>
                    <span className="font-black text-[#FF6600] text-sm">
                      {estimatedBudget} ({budgetType})
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Form Navigation */}
            <div className={`pt-4 border-t flex items-center justify-between ${isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'}`}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isDark
                      ? 'bg-[#132517] border-[#23402A] text-[#C5D6C8] hover:text-white'
                      : 'bg-white border-[#D2DFD4] text-[#2C4A33] hover:text-black'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 7 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-6 py-2.5 rounded-xl bg-[#FF6600] hover:bg-[#FF7A1A] text-white text-xs sm:text-sm font-black flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" /> Send Request with Má fo Assurance
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
