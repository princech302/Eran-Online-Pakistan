import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PlayCircle,
  FileCheck,
  Globe,
  Smartphone,
  ShoppingBag,
  Gift,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export const EarnMoneyPage: React.FC = () => {
  const { navigate, currentUser } = useApp();

  const methods = [
    {
      title: 'Watch Sponsored Videos',
      rate: '$0.015 - $0.040 per video',
      time: '15 - 25 seconds',
      dailyCap: '10 videos per calendar day',
      desc: 'Watch unskippable brand videos from real corporate sponsors and answer a simple confirmation question.',
      icon: PlayCircle,
      cta: 'Watch Ads & Earn',
      action: () => navigate('/earn/ads')
    },
    {
      title: 'Market Research Surveys',
      rate: '$0.50 - $2.50 per survey',
      time: '5 - 15 minutes',
      dailyCap: 'Subject to sponsor quotas',
      desc: 'Participate in targeted consumer questionnaires covering technology, shopping preferences, and lifestyle habits.',
      icon: FileCheck,
      cta: 'Explore Surveys',
      action: () => navigate('/earn')
    },
    {
      title: 'Website & Service Discovery',
      rate: '$0.10 - $0.35 per visit',
      time: '60 - 90 seconds',
      dailyCap: 'Updated continuously',
      desc: 'Browse innovative fintech platforms, SaaS tools, and eco brands to test interactive calculators and navigation.',
      icon: Globe,
      cta: 'View Website Tasks',
      action: () => navigate('/earn')
    },
    {
      title: 'App Experience Reviews',
      rate: '$0.30 - $1.00 per test',
      time: '3 - 8 minutes',
      dailyCap: 'Subject to available tests',
      desc: 'Test web and mobile apps, preview onboarding flows, and evaluate audio or visual tools.',
      icon: Smartphone,
      cta: 'Test Apps',
      action: () => navigate('/earn')
    },
    {
      title: 'Referral Rewards (10%)',
      rate: '10% recurring reward share',
      time: 'Passive',
      dailyCap: 'No limit on eligible referrals',
      desc: 'Share your unique referral link. Earn 10% commission whenever your referred friends complete approved tasks.',
      icon: Users,
      cta: 'Get Referral Link',
      action: () => navigate('/referrals')
    },
    {
      title: 'Daily Streak Rewards',
      rate: 'Up to $0.75 milestone bonus',
      time: 'Instant login',
      dailyCap: '1 bonus claim every 24 hours',
      desc: 'Log in consecutively every day to advance your 7-day bonus progress and earn compounding streak payouts.',
      icon: Gift,
      cta: 'Claim Today’s Streak',
      action: () => navigate('/bonuses')
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Earning Opportunities
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            How to Earn on EarnTask
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Choose from a variety of approved task types. All rewards are fully backed by direct brand sponsors and credited transparently.
          </p>
        </div>

        {/* Earning Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-900/60">
                      {method.rate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {method.desc}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                    <div className="flex items-center justify-between">
                      <span>Time Investment:</span>
                      <span className="text-slate-200 font-medium">{method.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Daily Limit:</span>
                      <span className="text-slate-200 font-medium">{method.dailyCap}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80">
                  <button
                    onClick={method.action}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{method.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anti-Fraud Notice */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">
              Fair Reward Guarantee & Anti-Fraud Rules
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              EarnTask is dedicated to keeping this rewards marketplace sustainable for everyone. Automated completion scripts, VPN switching to bypass geographic restrictions, or submitting spoofed task confirmation codes will trigger immediate account suspension and reward revocation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
