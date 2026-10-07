import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Users,
  Target,
  BarChart3,
  ArrowRight,
  Briefcase
} from 'lucide-react';

export const AdvertisePage: React.FC = () => {
  const { navigate, switchRole } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            Enterprise & Direct Brand Advertising
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Reach 100% Verified Human Attention Without Ad-Fraud
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Eliminate wasted ad spend. On EarnTask, users complete unskippable sponsored videos, test product demos, and take authenticated surveys with post-view attention checks.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                switchRole('advertiser');
                navigate('/advertiser/campaigns/create');
              }}
              className="px-8 py-3.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25 transition-all flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Launch a Campaign (Demo Portal)</span>
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
            >
              View Pricing Models
            </button>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Guaranteed Watch Time</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Videos are locked to 15, 20, or 30-second unskippable durations. Users cannot tab away or fast-forward without resetting the playback timer.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Attention Verification</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rewards are credited only after users successfully answer a comprehension question about your product, guaranteeing mental retention.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Transparent Flat Pricing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You choose the per-user reward ($0.02 - $0.05). We charge a clear 20% platform fee. No hidden auction inflation or opaque algorithmic bidding.
            </p>
          </div>
        </div>

        {/* Campaign Types Table */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white">
            Available Campaign Formats
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                <tr>
                  <th className="pb-3 font-semibold">Format</th>
                  <th className="pb-3 font-semibold">User Duration</th>
                  <th className="pb-3 font-semibold">Engagement Goal</th>
                  <th className="pb-3 font-semibold">Suggested Reward</th>
                  <th className="pb-3 font-semibold">Verification Rail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 font-semibold text-white">Sponsored Video</td>
                  <td className="py-3">15 - 30 seconds</td>
                  <td className="py-3">Brand Awareness & Messaging</td>
                  <td className="py-3 font-mono text-emerald-400">$0.02 - $0.04</td>
                  <td className="py-3">Comprehension Quiz</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Website Discovery</td>
                  <td className="py-3">60 - 90 seconds</td>
                  <td className="py-3">Landing Page Testing & Features</td>
                  <td className="py-3 font-mono text-emerald-400">$0.15 - $0.35</td>
                  <td className="py-3">Page Confirmation Token</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Market Research Survey</td>
                  <td className="py-3">5 - 12 minutes</td>
                  <td className="py-3">Demographic Consumer Data</td>
                  <td className="py-3 font-mono text-emerald-400">$0.75 - $2.50</td>
                  <td className="py-3">Authenticated Questionnaire</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">App Experience Preview</td>
                  <td className="py-3">3 - 5 minutes</td>
                  <td className="py-3">Onboarding Trial & Feedback</td>
                  <td className="py-3 font-mono text-emerald-400">$0.40 - $1.00</td>
                  <td className="py-3">Interactive Session Code</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Create Your First Campaign in Minutes
          </h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Test our campaign creator in the interactive Advertiser Portal. All campaigns undergo compliance review to ensure ethical, high-quality experiences for consumers.
          </p>
          <button
            onClick={() => {
              switchRole('advertiser');
              navigate('/advertiser/campaigns/create');
            }}
            className="px-8 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
          >
            <span>Open Campaign Creator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
