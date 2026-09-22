export type UserRole = 'customer' | 'provider';

export type VerificationType = 'identity' | 'phone' | 'service' | 'credentials';

export interface VerificationStatus {
  identity: boolean;
  phone: boolean;
  service: boolean;
  credentials: boolean;
}

export interface ReviewMetric {
  quality: number;
  professionalism: number;
  communication: number;
  reliability: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  date: string;
  comment: string;
  serviceTitle: string;
  metrics?: ReviewMetric;
  verifiedJob: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface Provider {
  id: string;
  name: string;
  businessName?: string;
  avatar: string;
  service: string;
  subCategories: string[];
  rating: number;
  completedJobs: number;
  reviewsCount: number;
  locationCity: string;
  serviceAreas: string[];
  availability: string;
  startingPrice: string;
  priceType: 'fixed' | 'hourly' | 'quote';
  responseRate: string;
  responseTime: string;
  repeatCustomersPercent: number;
  bio: string;
  experienceYears: number;
  verified: boolean;
  verifications: VerificationStatus;
  portfolio: PortfolioItem[];
  reviews: Review[];
  featured?: boolean;
}

export type RequestStatus =
  | 'request_sent'
  | 'provider_reviewing'
  | 'accepted'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'confirmed';

export interface StatusHistoryItem {
  status: RequestStatus;
  timestamp: string;
  note: string;
}

export interface ChatMessage {
  id: string;
  requestId: string;
  sender: 'customer' | 'provider' | 'system';
  text: string;
  timestamp: string;
  isSystemNote?: boolean;
}

export interface ServiceRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerLocation: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerService: string;
  serviceTitle: string;
  taskDescription: string;
  urgency: string;
  scheduledDate: string;
  scheduledTime: string;
  budgetPreference: string;
  estimatedPrice: string;
  status: RequestStatus;
  createdAt: string;
  timeline: StatusHistoryItem[];
  messages: ChatMessage[];
  problemReport?: {
    reported: boolean;
    reason: string;
    details: string;
    status: 'opened' | 'under_review' | 'resolved';
    createdAt: string;
  };
  review?: {
    rating: number;
    metrics: ReviewMetric;
    feedback: string;
    submittedAt: string;
  };
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  activeProviders: number;
  sampleQuery: string;
}

export interface ParsedNLPRequirement {
  rawText: string;
  service: string;
  task: string;
  urgency: string;
  location: string;
  budget?: string;
  preference: string;
}
