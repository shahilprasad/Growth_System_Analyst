import React from 'react';
import { InterventionSignal, SignalCategory } from '../types';
import { Mail, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

interface Props {
  signal: InterventionSignal;
  specialty?: string;
}

export const SignalCard: React.FC<Props> = ({ signal, specialty }) => {
  const getBadgeColor = (category: SignalCategory) => {
    switch (category) {
      case SignalCategory.FRICTION: return 'bg-orange-100 text-orange-700 border-orange-200';
      case SignalCategory.REACTIVATION: return 'bg-red-100 text-red-700 border-red-200';
      case SignalCategory.POWER_USER: return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getIcon = (category: SignalCategory) => {
    switch (category) {
      case SignalCategory.FRICTION: return <AlertCircle className="w-4 h-4 mr-1" />;
      case SignalCategory.REACTIVATION: return <ClockIcon className="w-4 h-4 mr-1" />;
      case SignalCategory.POWER_USER: return <TrendingUp className="w-4 h-4 mr-1" />;
      default: return <CheckCircle2 className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">{signal.userId}</h3>
                <span className="text-xs font-medium text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">{specialty}</span>
            </div>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(signal.category)}`}>
                {getIcon(signal.category)}
                {signal.category}
            </div>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Confidence</span>
            <span className="text-sm font-bold text-gray-900">{signal.confidence}%</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {signal.reasoning}
      </p>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <Mail className="w-3 h-3" />
          Generated Intervention
        </div>
        <p className="text-sm text-gray-700 italic font-medium whitespace-pre-wrap">
          "{signal.emailDraft}"
        </p>
      </div>
    </div>
  );
};

const ClockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);