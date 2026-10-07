import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PlayCircle,
  FileCheck,
  Globe,
  Smartphone,
  ShoppingBag,
  Gift,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  AlertTriangle,
  HelpCircle,
  Coins
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate, currentUser } = useApp();

  const features = [
    {
      title: 'Watch Sponsored Videos',
      description: 'Engage with up to 10 verified direct advertiser video campaigns daily with strict anti-skip attention verification.',
      icon: PlayCircle,
      tag: '10 Ads / Day Limit',
      link: '/earn/ads',
      accent: 'emerald'
    },
    {
      title: 'Complete Surveys',
      description: 'Share demographic feedback and consumer insights on authenticated market research panels.',
      icon: FileCheck,
      tag: 'High Value',
      link: '/earn',
      accent: 'blue'
    },
    {
      title: 'Website Tasks',
      description: 'Explore newly launched digital services, fintech calculators, and corporate landing pages.',
      icon: Globe,
      tag: 'Quick 60s',
      link: '/earn',
      accent: 'purple'
    },
    {
      title: 'App Promotions',
      description: 'Test genuine mobile and web apps, test demo interactive soundscapes, and evaluate user onboarding.',
      icon: Smartphone,
      tag: 'Product Preview',
      link: '/earn',
      accent: 'amber'
    },
    {
      title: 'Product Discovery',
      description: 'Review organic and sustainable brand catalog releases, specs, and certified ingredients.',
      icon: ShoppingBag,
      tag: 'Brand Review',
      link: '/earn',
      accent: 'cyan'
    },
    {
      title: 'Bonus Tasks & Streaks',
      description: 'Maintain 7-day login streaks, finish profile verification checklists, and earn referral commissions.',
      icon: Gift,
      tag: 'Daily Bonus',
      link: '/bonuses',
      accent: 'rose'
    }
  ];

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up in under 60 seconds. Verify your email and set up your secure profile credentials.' },
    { num: '02', title: 'Choose a Task', desc: 'Browse sponsored campaigns across videos, research surveys, or website discoveries.' },
    { num: '03', title: 'Complete the Task', desc: 'Follow step-by-step sponsor guidelines. Genuine consumer attention is monitored.' },
    { num: '04', title: 'Receive Reward', desc: 'Verified completions credit immediately to your available or pending wallet balance.' },
    { num: '05', title: 'Withdraw When Eligible', desc: 'Disburse earnings starting from just $5.00 via PayPal, Bank Wire, or Mobile Wallet.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60">
        <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Legitimate Reward Marketplace · Direct Sponsor Promotions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Earn Rewards by Completing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300">
                Simple Online Tasks
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Watch sponsored promotions, complete surveys, discover products, visit websites, and complete approved tasks to earn rewards.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => navigate(currentUser ? '/earn/ads' : '/register')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>START EARNING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => navigate('/advertise')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 shadow-sm transition-all"
              >
                ADVERTISE WITH US
              </button>
            </div>

            {/* Crucial Legal Disclaimer */}
            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400 max-w-xl mx-auto">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Rewards depend on available campaigns and eligibility. Earnings are not guaranteed income.
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">$5.00</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Low Minimum Payout</div>
            </div>
            <div className="p-3 text-center border-l border-slate-800">
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">10 Daily</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Max Sponsored Ads</div>
            </div>
            <div className="p-3 text-center border-l border-slate-800">
              <div className="text-xl sm:text-2xl font-bold font-mono text-blue-400">100% Direct</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Sponsor Campaigns</div>
            </div>
            <div className="p-3 text-center border-l border-slate-800">
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">0% Bots</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Audited Attention</div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Multiple Ways to Earn Verified Rewards
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Pick tasks matching your schedule and interest. All tasks are sponsored directly by verified brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(currentUser ? feat.link : '/register')}
                className="group p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center text-xs font-semibold text-blue-400 group-hover:text-emerald-400 transition-colors">
                  <span>Start Activity</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works (5 Steps) */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Transparent Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              How It Works
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From account signup to wallet disbursement in five straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-extrabold font-mono text-slate-700">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-2 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Anti-Fraud Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Responsible Marketplace
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 mb-4">
              Built on Transparency & Authenticity
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Unlike dubious traffic exchanges or ad-click schemes, EarnTask is engineered around strict compliance standards.
              We protect both brand advertisers and honest reward members.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Sponsored Campaigns Only</h4>
                  <p className="text-xs text-slate-400">
                    We never reward users for clicking third-party ad network tags or Google AdSense. Every campaign is vetted directly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Strict Anti-Bot & Speed Checks</h4>
                  <p className="text-xs text-slate-400">
                    Automated scripts, device farms, and speed clicking are detected immediately, preserving high value for real users.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Controlled Daily Limits</h4>
                  <p className="text-xs text-slate-400">
                    A strict 10-ad daily ceiling prevents burnout, ensures organic engagement, and protects campaign sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advertiser Value Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">
              Are You an Advertiser or Brand Manager?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Connect directly with verified humans. Receive genuine video view time, feedback surveys, and product consideration without intermediary bot fraud.
            </p>

            <div className="space-y-2.5 mb-6 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Attention Retention:</span>
                <span className="text-emerald-400 font-bold">100% Unskippable</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Verification Method:</span>
                <span className="text-blue-400 font-bold">Interactive Post-Quiz</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Platform Commission:</span>
                <span className="text-slate-100 font-bold">Flat Transparent 20%</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/advertise')}
              className="w-full py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all text-center"
            >
              Launch Advertiser Campaign
            </button>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Start Completing Tasks?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Join thousands of members earning verified rewards every day. Test our demo mode now with pre-configured accounts.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(currentUser ? '/dashboard' : '/register')}
              className="px-8 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
            >
              Sign Up Now (Free)
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="px-6 py-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Read Program Guidelines
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
