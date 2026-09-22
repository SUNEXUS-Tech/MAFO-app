import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ClipboardList,
  MessageSquare,
  Compass,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import {
  Provider,
  ServiceRequest,
  UserRole,
  RequestStatus,
  ReviewMetric,
  ParsedNLPRequirement,
} from './types';
import { MOCK_PROVIDERS, INITIAL_REQUESTS } from './data/mockData';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { HeroSearch } from './components/HeroSearch';
import { ServiceCategoryGrid } from './components/ServiceCategoryGrid';
import { ProviderCard } from './components/ProviderCard';
import { SearchView } from './components/SearchView';
import { ProviderProfileModal } from './components/ProviderProfileModal';
import { RequestServiceModal } from './components/RequestServiceModal';
import { RequestTrackingView } from './components/RequestTrackingView';
import { MessagingView } from './components/MessagingView';
import { CompletionReviewModal } from './components/CompletionReviewModal';
import { ReportProblemModal } from './components/ReportProblemModal';
import { ProviderDashboard } from './components/ProviderDashboard';
import { VerificationModal } from './components/VerificationModal';
import { ProviderOnboardingModal } from './components/ProviderOnboardingModal';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { isDark } = useTheme();
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [activeTab, setActiveTab] = useState<
    'home' | 'search' | 'requests' | 'messages' | 'provider_dashboard'
  >('home');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Data State
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    INITIAL_REQUESTS[0]?.id || null
  );

  // Modals
  const [activeProfileProvider, setActiveProfileProvider] = useState<Provider | null>(null);
  const [requestModalProvider, setRequestModalProvider] = useState<Provider | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [parsedNLInitial, setParsedNLInitial] = useState<ParsedNLPRequirement | null>(null);

  const [reviewModalRequest, setReviewModalRequest] = useState<ServiceRequest | null>(null);
  const [problemModalRequest, setProblemModalRequest] = useState<ServiceRequest | null>(null);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState<boolean>(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);

  // Active provider representation for Provider OS view
  const currentProviderProfile =
    providers.find((p) => p.id === 'p-adebayo') || providers[0];

  // Role switching
  const handleToggleRole = () => {
    if (currentRole === 'customer') {
      setCurrentRole('provider');
      setActiveTab('provider_dashboard');
    } else {
      setCurrentRole('customer');
      setActiveTab('home');
    }
  };

  // Search trigger from Hero
  const handleHeroSearch = (query: string, parsed?: ParsedNLPRequirement) => {
    setSearchInitialQuery(query);
    if (parsed) {
      setSelectedCategory(parsed.service);
    }
    setActiveTab('search');
  };

  const handleInstantRequest = (parsed: ParsedNLPRequirement) => {
    // Find matched provider or fallback to first verified
    const matched =
      providers.find(
        (p) =>
          p.service.toLowerCase().includes(parsed.service.toLowerCase()) ||
          p.locationCity.toLowerCase().includes(parsed.location.toLowerCase())
      ) || providers[0];

    setRequestModalProvider(matched);
    setParsedNLInitial(parsed);
    setIsRequestModalOpen(true);
  };

  // Submit new request
  const handleSubmitRequest = (newReq: ServiceRequest) => {
    setRequests((prev) => [newReq, ...prev]);
    setSelectedRequestId(newReq.id);
  };

  // Provider accepts request
  const handleAcceptRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          const updatedTimeline = [
            ...r.timeline,
            {
              status: 'accepted' as RequestStatus,
              timestamp: 'Just now',
              note: `${r.providerName} accepted the request and confirmed the schedule.`,
            },
          ];
          const updatedMessages = [
            ...r.messages,
            {
              id: `m-${Date.now()}`,
              requestId,
              sender: 'system' as const,
              text: `${r.providerName} has accepted your request. Slot booked for ${r.scheduledDate}.`,
              timestamp: 'Just now',
              isSystemNote: true,
            },
          ];
          return {
            ...r,
            status: 'accepted' as RequestStatus,
            timeline: updatedTimeline,
            messages: updatedMessages,
          };
        }
        return r;
      })
    );
  };

  // Provider declines request
  const handleDeclineRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  // Update status (e.g. In Progress, Completed)
  const handleUpdateStatus = (requestId: string, newStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          const notes: Record<RequestStatus, string> = {
            request_sent: 'Request initiated.',
            provider_reviewing: 'Provider reviewing request.',
            accepted: 'Provider accepted request.',
            scheduled: 'Service scheduled.',
            in_progress: 'Specialist is currently executing work on site.',
            completed: 'Specialist marked job as completed. Customer confirmation pending.',
            confirmed: 'Customer confirmed job completion. Payment released.',
          };
          return {
            ...r,
            status: newStatus,
            timeline: [
              ...r.timeline,
              {
                status: newStatus,
                timestamp: 'Just now',
                note: notes[newStatus] || 'Status updated.',
              },
            ],
            messages: [
              ...r.messages,
              {
                id: `m-${Date.now()}`,
                requestId,
                sender: 'system' as const,
                text: `Job status transitioned to: ${newStatus.replace('_', ' ').toUpperCase()}`,
                timestamp: 'Just now',
                isSystemNote: true,
              },
            ],
          };
        }
        return r;
      })
    );
  };

  // Chat message send
  const handleSendMessage = (requestId: string, text: string) => {
    const sender = currentRole === 'customer' ? 'customer' : 'provider';
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            messages: [
              ...r.messages,
              {
                id: `msg-${Date.now()}`,
                requestId,
                sender,
                text,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ],
          };
        }
        return r;
      })
    );
  };

  // Review submission
  const handleSubmitReview = (
    requestId: string,
    overallRating: number,
    metrics: ReviewMetric,
    feedback: string
  ) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'confirmed' as RequestStatus,
            review: {
              rating: overallRating,
              metrics,
              feedback,
              submittedAt: 'Today',
            },
            timeline: [
              ...r.timeline,
              {
                status: 'confirmed' as RequestStatus,
                timestamp: 'Just now',
                note: `Customer verified work quality and awarded ${overallRating} stars. Escrow released.`,
              },
            ],
            messages: [
              ...r.messages,
              {
                id: `m-${Date.now()}`,
                requestId,
                sender: 'system' as const,
                text: `Job confirmed and closed. Customer rating: ${overallRating} ⭐`,
                timestamp: 'Just now',
                isSystemNote: true,
              },
            ],
          };
        }
        return r;
      })
    );

    // Update provider's overall score in state
    setProviders((prev) =>
      prev.map((p) => {
        const req = requests.find((r) => r.id === requestId);
        if (req && p.id === req.providerId) {
          return {
            ...p,
            completedJobs: p.completedJobs + 1,
            reviewsCount: p.reviewsCount + 1,
          };
        }
        return p;
      })
    );
  };

  // Report problem
  const handleSubmitReport = (requestId: string, reason: string, details: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          return {
            ...r,
            problemReport: {
              reported: true,
              reason,
              details,
              status: 'opened',
              createdAt: 'Just now',
            },
            messages: [
              ...r.messages,
              {
                id: `m-${Date.now()}`,
                requestId,
                sender: 'system' as const,
                text: `Escalation report filed: "${reason}". Payout paused pending MAFO review.`,
                timestamp: 'Just now',
                isSystemNote: true,
              },
            ],
          };
        }
        return r;
      })
    );
  };

  // Provider onboarded
  const handleProviderJoined = (newProv: Provider) => {
    setProviders((prev) => [newProv, ...prev]);
    setActiveTab('search');
  };

  const activeRequestObj =
    requests.find((r) => r.id === selectedRequestId) || requests[0];

  const filteredFeaturedProviders = providers.filter((p) => {
    if (selectedCity !== 'All Cities' && p.locationCity !== selectedCity) {
      return false;
    }
    if (selectedCategory && p.service.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div
      className={`min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] pb-20 md:pb-10 transition-colors duration-200 ${
        isDark ? 'bg-[#07140B] text-[#F3F6F3]' : 'bg-[#F5F7F4] text-[#0D2214]'
      }`}
    >
      {/* Header */}
      <Header
        currentRole={currentRole}
        onToggleRole={handleToggleRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRequestsCount={requests.filter((r) => r.status !== 'confirmed').length}
        unreadMessagesCount={1}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenTrustModal={() => setIsTrustModalOpen(true)}
        onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* CUSTOMER MODE */}
        {currentRole === 'customer' && (
          <>
            {/* VIEW 1: HOME / DISCOVERY */}
            {activeTab === 'home' && (
              <div className="space-y-6">
                {/* Hero with Natural Language Input */}
                <HeroSearch
                  onSearch={handleHeroSearch}
                  onRequestInstant={handleInstantRequest}
                />

                {/* Popular Services Grid */}
                <ServiceCategoryGrid
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => setSelectedCategory(cat)}
                />

                {/* Trusted Near You Section (Section 4 in spec) */}
                <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#FF6600] font-mono uppercase tracking-wider">
                        Vetted Specialists
                      </span>
                      <h2
                        className={`text-xl sm:text-2xl font-black tracking-tight font-['Space_Grotesk',sans-serif] ${
                          isDark ? 'text-white' : 'text-[#0D2214]'
                        }`}
                      >
                        Trusted Near You{' '}
                        {selectedCity !== 'All Cities' && `in ${selectedCity}`}
                      </h2>
                    </div>

                    <button
                      onClick={() => setActiveTab('search')}
                      className="text-xs font-bold text-[#FF6600] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore all {providers.length} verified specialists</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredFeaturedProviders.slice(0, 6).map((prov) => (
                      <ProviderCard
                        key={prov.id}
                        provider={prov}
                        onViewProfile={(p) => setActiveProfileProvider(p)}
                        onRequestService={(p) => {
                          setRequestModalProvider(p);
                          setParsedNLInitial(null);
                          setIsRequestModalOpen(true);
                        }}
                        onOpenTrustModal={() => setIsTrustModalOpen(true)}
                      />
                    ))}
                  </div>
                </section>

                {/* Má fo Assurance Strip (Section 20 & 21 in spec) */}
                <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  <div
                    className={`rounded-3xl p-6 sm:p-10 relative overflow-hidden border ${
                      isDark
                        ? 'bg-[#132517] border-[#23402A]'
                        : 'bg-white border-[#D2DFD4] shadow-sm'
                    }`}
                  >
                    <div className="relative z-10 max-w-2xl">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border ${
                          isDark
                            ? 'bg-[#0E2314] border-[#2E5437] text-emerald-400'
                            : 'bg-[#EBF5EE] border-[#B7D8BF] text-[#2C4A33]'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        The MAFO Guarantee
                      </div>
                      <h2
                        className={`text-2xl sm:text-3xl font-black mb-3 font-['Space_Grotesk',sans-serif] ${
                          isDark ? 'text-white' : 'text-[#0D2214]'
                        }`}
                      >
                        “Má fo” — don't worry. Be assured. We've got it handled.
                      </h2>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                          isDark ? 'text-[#C5D6C8]' : 'text-[#3E5C45]'
                        }`}
                      >
                        Hiring services across Nigeria used to carry uncertainty: unannounced pricing, flaky arrivals, and zero accountability. MAFO replaces hesitation with verified identity, agreed escrow pricing, and an accountable live tracking timeline.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
                        <div
                          className={`flex items-start gap-2 ${
                            isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Strict NIN & identity screening</span>
                        </div>
                        <div
                          className={`flex items-start gap-2 ${
                            isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Payout only released on your confirmation</span>
                        </div>
                        <div
                          className={`flex items-start gap-2 ${
                            isDark ? 'text-[#C5D6C8]' : 'text-[#2C4A33]'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>24/7 dedicated resolution desk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* VIEW 2: SEARCH / DISCOVERY */}
            {activeTab === 'search' && (
              <SearchView
                providers={providers}
                initialCategory={selectedCategory}
                initialQuery={searchInitialQuery}
                onViewProfile={(p) => setActiveProfileProvider(p)}
                onRequestService={(p) => {
                  setRequestModalProvider(p);
                  setParsedNLInitial(null);
                  setIsRequestModalOpen(true);
                }}
                onOpenTrustModal={() => setIsTrustModalOpen(true)}
              />
            )}

            {/* VIEW 3: REQUESTS TRACKING */}
            {activeTab === 'requests' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
                    isDark ? 'border-[#23402A]' : 'border-[#D2DFD4]'
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#FF6600] uppercase tracking-wider">
                      Operational Ledger
                    </span>
                    <h1
                      className={`text-2xl sm:text-3xl font-black font-['Space_Grotesk',sans-serif] ${
                        isDark ? 'text-white' : 'text-[#0D2214]'
                      }`}
                    >
                      My Service Requests
                    </h1>
                  </div>

                  {/* Quick request selector if multiple */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {requests.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRequestId(r.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer border ${
                          selectedRequestId === r.id
                            ? 'bg-[#FF6600] text-white border-[#FF6600] shadow-sm'
                            : isDark
                            ? 'bg-[#132517] text-[#C5D6C8] border-[#23402A] hover:bg-[#1A3320]'
                            : 'bg-white text-[#2C4A33] border-[#D2DFD4] hover:bg-[#EBF5EE]'
                        }`}
                      >
                        {r.id} ({r.serviceTitle.slice(0, 18)}...)
                      </button>
                    ))}
                  </div>
                </div>

                {activeRequestObj ? (
                  <RequestTrackingView
                    request={activeRequestObj}
                    onOpenChat={(reqId) => {
                      setSelectedRequestId(reqId);
                      setActiveTab('messages');
                    }}
                    onConfirmCompletion={(req) => setReviewModalRequest(req)}
                    onReportProblem={(req) => setProblemModalRequest(req)}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ) : (
                  <div
                    className={`p-12 text-center rounded-2xl border ${
                      isDark
                        ? 'bg-[#132517] border-[#23402A]'
                        : 'bg-white border-[#D2DFD4]'
                    }`}
                  >
                    <ClipboardList className="w-10 h-10 text-[#FF6600] mx-auto mb-3" />
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-[#0D2214]'
                      }`}
                    >
                      No Active Requests
                    </h3>
                    <p
                      className={`text-xs mb-4 ${
                        isDark ? 'text-[#A1B8A5]' : 'text-[#506E56]'
                      }`}
                    >
                      You haven't requested any services yet.
                    </p>
                    <button
                      onClick={() => setActiveTab('home')}
                      className="px-5 py-2.5 rounded-xl bg-[#FF6600] text-white font-bold text-xs hover:bg-[#FF7A1A] cursor-pointer shadow-md"
                    >
                      Find a Specialist
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: TRANSACTIONAL MESSAGING */}
            {activeTab === 'messages' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <MessagingView
                  requests={requests}
                  selectedRequestId={selectedRequestId}
                  onSelectRequest={(id) => setSelectedRequestId(id)}
                  onSendMessage={handleSendMessage}
                  onBackToRequests={() => setActiveTab('requests')}
                  currentRole={currentRole}
                />
              </div>
            )}
          </>
        )}

        {/* PROVIDER MODE (PROVIDER OS) */}
        {currentRole === 'provider' && (
          <>
            {activeTab === 'provider_dashboard' && (
              <ProviderDashboard
                provider={currentProviderProfile}
                requests={requests}
                onAcceptRequest={handleAcceptRequest}
                onDeclineRequest={handleDeclineRequest}
                onUpdateStatus={handleUpdateStatus}
                onOpenChat={(reqId) => {
                  setSelectedRequestId(reqId);
                  setActiveTab('messages');
                }}
                onOpenTrustModal={() => setIsTrustModalOpen(true)}
              />
            )}

            {activeTab === 'messages' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <MessagingView
                  requests={requests}
                  selectedRequestId={selectedRequestId}
                  onSelectRequest={(id) => setSelectedRequestId(id)}
                  onSendMessage={handleSendMessage}
                  onBackToRequests={() => setActiveTab('provider_dashboard')}
                  currentRole={currentRole}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* MODALS */}
      {/* 1. Provider Profile Modal */}
      <ProviderProfileModal
        provider={activeProfileProvider}
        onClose={() => setActiveProfileProvider(null)}
        onRequestService={(p) => {
          setActiveProfileProvider(null);
          setRequestModalProvider(p);
          setParsedNLInitial(null);
          setIsRequestModalOpen(true);
        }}
        onStartMessage={(p) => {
          setActiveProfileProvider(null);
          // Find or point to request
          const existing = requests.find((r) => r.providerId === p.id);
          if (existing) {
            setSelectedRequestId(existing.id);
            setActiveTab('messages');
          } else {
            // Open request modal
            setRequestModalProvider(p);
            setIsRequestModalOpen(true);
          }
        }}
        onOpenTrustModal={() => {
          setActiveProfileProvider(null);
          setIsTrustModalOpen(true);
        }}
      />

      {/* 2. Request Service Modal (6-step flow + review + confirmation) */}
      {isRequestModalOpen && (
        <RequestServiceModal
          provider={requestModalProvider}
          parsedInitial={parsedNLInitial}
          onClose={() => {
            setIsRequestModalOpen(false);
            setRequestModalProvider(null);
            setParsedNLInitial(null);
          }}
          onSubmitRequest={handleSubmitRequest}
          onNavigateToRequest={(reqId) => {
            setSelectedRequestId(reqId);
            setActiveTab('requests');
          }}
          onNavigateToChat={(reqId) => {
            setSelectedRequestId(reqId);
            setActiveTab('messages');
          }}
        />
      )}

      {/* 3. Confirm Completion & Structured Review Modal */}
      <CompletionReviewModal
        request={reviewModalRequest}
        onClose={() => setReviewModalRequest(null)}
        onSubmitReview={handleSubmitReview}
        onReportProblem={(req) => {
          setReviewModalRequest(null);
          setProblemModalRequest(req);
        }}
      />

      {/* 4. Report Problem / Dispute Modal */}
      <ReportProblemModal
        request={problemModalRequest}
        onClose={() => setProblemModalRequest(null)}
        onSubmitReport={handleSubmitReport}
      />

      {/* 5. Trust Architecture / Verification Modal */}
      <VerificationModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
      />

      {/* 6. Provider Onboarding Modal */}
      <ProviderOnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        onProviderJoined={handleProviderJoined}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentRole={currentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRequestsCount={requests.filter((r) => r.status !== 'confirmed').length}
        unreadMessagesCount={1}
        onToggleRole={handleToggleRole}
      />
    </div>
  );
}
