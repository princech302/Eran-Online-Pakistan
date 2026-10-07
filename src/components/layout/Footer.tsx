import React from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, ShieldCheck, Lock, Award, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-emerald-500 flex items-center justify-center text-white font-extrabold text-sm">
                E<Coins className="w-3.5 h-3.5 -ml-0.5 text-emerald-300" />
              </div>
              <span className="font-bold text-base text-white">EarnTask</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The verified reward marketplace connecting legitimate brands with engaged consumers.
              Direct advertiser sponsorships, audited verification, and transparent rewards.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Bot Traffic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Encrypted Payouts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Fair Play Certified</span>
              </div>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/earn/ads')} className="hover:text-emerald-400 transition-colors">Watch Sponsored Ads</button></li>
              <li><button onClick={() => navigate('/earn')} className="hover:text-emerald-400 transition-colors">All Earning Tasks</button></li>
              <li><button onClick={() => navigate('/referrals')} className="hover:text-emerald-400 transition-colors">Referral Program</button></li>
              <li><button onClick={() => navigate('/bonuses')} className="hover:text-emerald-400 transition-colors">Daily Streak Bonus</button></li>
              <li><button onClick={() => navigate('/leaderboard')} className="hover:text-emerald-400 transition-colors">Top Earners</button></li>
            </ul>
          </div>

          {/* Col 3: Advertisers */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">For Advertisers</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/advertise')} className="hover:text-blue-400 transition-colors">Create Brand Campaign</button></li>
              <li><button onClick={() => navigate('/pricing')} className="hover:text-blue-400 transition-colors">Audience Pricing</button></li>
              <li><button onClick={() => navigate('/advertiser')} className="hover:text-blue-400 transition-colors">Advertiser Portal</button></li>
              <li><button onClick={() => navigate('/advertiser-policy')} className="hover:text-blue-400 transition-colors">Campaign Quality Standards</button></li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Trust & Policies</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/terms')} className="hover:text-slate-200 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => navigate('/privacy')} className="hover:text-slate-200 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/reward-policy')} className="hover:text-slate-200 transition-colors">Reward & Payout Policy</button></li>
              <li><button onClick={() => navigate('/acceptable-use')} className="hover:text-slate-200 transition-colors">Acceptable Use Policy</button></li>
              <li><button onClick={() => navigate('/help')} className="hover:text-slate-200 transition-colors">Help & FAQ</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-slate-200 transition-colors">Contact Support</button></li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Platform Compliance Notice */}
        <div className="border-t border-slate-900 pt-6 mt-6 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Important Regulatory Notice:</strong> EarnTask is a promotional rewards marketplace.
            Earnings represent nominal rewards for verified consumer attention and completed engagement on direct advertiser campaigns.
            Rewards are not guaranteed income or full-time employment. All tasks are subject to advertiser verification and fraud checks.
            EarnTask does NOT partner with or reward third-party display ad network clicks (such as Google AdSense). All campaigns are direct sponsor promotions.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div>
              &copy; 2026 EarnTask Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Demo Build v2.4.0
              </span>
              <span>·</span>
              <span>TLS 1.3 End-to-End Encrypted</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
