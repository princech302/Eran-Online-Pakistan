import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserPlus,
  Compass,
  CheckCircle,
  Wallet,
  ArrowRight,
  Shield,
  Clock,
  AlertCircle
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            Clear Verification Standards
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            How EarnTask Works
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            A step-by-step breakdown of how verified members explore direct sponsor campaigns, earn transparent micro-rewards, and withdraw to their accounts.
          </p>
        </div>

        {/* Detailed Lifecycle */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg">
              01
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-400" />
                <span>Account Registration & Verification</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Register with a valid email address and profile details. To comply with anti-fraud rules and ensure unique participants, each member must verify their email. EarnTask enforces a strict single-account rule per individual.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg">
              02
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Browsing Available Brand Campaigns</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Browse our marketplace for active campaigns sponsored by vetted companies. Watch up to 10 daily unskippable promotional videos, respond to market surveys, or test preview features of new applications.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg">
              03
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>Task Execution & Attention Verification</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sponsored videos require full watch time without tab switching or skipping. Following playback, a quick attention confirmation question ensures honest human observation. General tasks require submitting a confirmation code or completion token.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg">
              04
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Balance Crediting (Available vs Pending)</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sponsored video rewards credit directly into Available Balance. Detailed survey responses and interactive app tests enter Pending Verification for up to 24 hours so campaign sponsors can audit valid submissions against duplicate spam.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 font-mono font-bold text-lg">
              05
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-teal-400" />
                <span>Withdrawing Earnings</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Once your available balance reaches the minimum threshold ($5.00), submit a payout request. Choose PayPal, Direct Bank ACH/SEPA, or Mobile Wallet. Requests are audited by compliance to prevent fraudulent exploitation.
              </p>
            </div>
          </div>
        </div>

        {/* Responsible Earnings Callout */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Realistic Reward Expectations</span>
          </div>
          <p className="leading-relaxed">
            EarnTask does not promise full-time wages or unrealistic returns. Task rewards are modest compensations funded directly by marketing budgets of our brand partners. We maintain an honest environment where brand sponsors get authentic eyes and consumers get verified micro-payouts.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/earn/ads')}
            className="px-8 py-3.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <span>Try It in Demo Mode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
