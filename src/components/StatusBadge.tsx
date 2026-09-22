import React from 'react';
import {
  Send,
  Eye,
  CheckCircle,
  CalendarCheck,
  PlayCircle,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { RequestStatus } from '../types';

interface StatusBadgeProps {
  status: RequestStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const configs: Record<
    RequestStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ElementType }
  > = {
    request_sent: {
      label: 'REQUEST SENT',
      bg: 'bg-slate-800/80',
      text: 'text-slate-300',
      border: 'border-slate-700',
      icon: Send,
    },
    provider_reviewing: {
      label: 'PROVIDER REVIEWING',
      bg: 'bg-amber-950/40',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      icon: Eye,
    },
    accepted: {
      label: 'ACCEPTED',
      bg: 'bg-cyan-950/40',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      icon: CheckCircle,
    },
    scheduled: {
      label: 'SCHEDULED',
      bg: 'bg-blue-950/40',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      icon: CalendarCheck,
    },
    in_progress: {
      label: 'IN PROGRESS',
      bg: 'bg-emerald-950/60',
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      icon: PlayCircle,
    },
    completed: {
      label: 'SERVICE COMPLETED',
      bg: 'bg-teal-950/50',
      text: 'text-teal-300',
      border: 'border-teal-500/30',
      icon: CheckCircle2,
    },
    confirmed: {
      label: 'CONFIRMED & RESOLVED',
      bg: 'bg-emerald-900/50',
      text: 'text-emerald-300',
      border: 'border-emerald-500/50',
      icon: ShieldCheck,
    },
  };

  const current = configs[status] || configs.request_sent;
  const Icon = current.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold tracking-wide rounded-md border ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} shrink-0`} />
      <span>{current.label}</span>
    </span>
  );
};
