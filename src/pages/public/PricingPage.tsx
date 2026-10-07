import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigate, switchRole } = useApp();

  // Interactive Calculator State
  const [rewardPerUser, setRewardPerUser] = useState<number>(0.025);
  const [completions, setCompletions] = useState<number>(2000);

  const userRewardsBudget = Number((rewardPerUser * completions).toFixed(2));
  const platformFee = Number((userRewardsBudget * 0.20).toFixed(2));
  const totalCampaignCost = Number((userRewardsBudget + platformFee).toFixed(2));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            Clear Cost Structure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Transparent Pricing for Advertisers
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Zero hidden bidding fees. You dictate the user reward, choose your target volume, and only pay for verified completions.
          </p>
        </div>

        {/* Live Interactive Budget Calculator */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Interactive Campaign Budget Calculator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                User Reward Per Verified Completion: ${rewardPerUser.toFixed(3)}
              </label>
              <input
                type="range"
                min="0.015"
                max="0.100"
                step="0.005"
                value={rewardPerUser}
                onChange={(e) => setRewardPerUser(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>$0.015 (Standard)</span>
                <span>$0.050 (High Attention)</span>
                <span>$0.100 (Premium)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Target Verified Completions: {completions.toLocaleString()} users
              </label>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={completions}
                onChange={(e) => setCompletions(parseInt(e.target.value, 10))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>500</span>
                <span>10,000</span>
                <span>25,000</span>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Direct User Rewards Budget:</span>
              <span className="font-bold text-white">${userRewardsBudget.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>EarnTask Platform Fee (20%):</span>
              <span className="text-blue-400">+${platformFee.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
              <span>Total Campaign Cost:</span>
              <span className="text-emerald-400 text-base">${totalCampaignCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                switchRole('advertiser');
                navigate('/advertiser/campaigns/create');
              }}
              className="px-8 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors inline-flex items-center gap-2"
            >
              <span>Build This Campaign in Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Advertiser Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-white">Starter Spotlight</h4>
            <div className="text-2xl font-bold font-mono text-white">$120</div>
            <p className="text-xs text-slate-400">
              Ideal for startups testing initial product messaging and website feedback.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 4,000 verified views</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Standard 15s video slot</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Verification question filter</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic conversion analytics</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-blue-500/50 shadow-xl shadow-blue-900/20 space-y-4 relative">
            <span className="absolute -top-2.5 right-6 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full font-mono">
              Most Popular
            </span>
            <h4 className="text-base font-bold text-white">Growth Velocity</h4>
            <div className="text-2xl font-bold font-mono text-emerald-400">$300</div>
            <p className="text-xs text-slate-400">
              For established brands requiring comprehensive product awareness and quiz retention.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 10,000+ verified views</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 20s or 30s video format</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Geographic country targeting</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority compliance review</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-white">Custom Enterprise</h4>
            <div className="text-2xl font-bold font-mono text-white">$1,000+</div>
            <p className="text-xs text-slate-400">
              For enterprise apps, custom demographic survey panels, and white-glove support.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited completions</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom multi-step surveys</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated account manager</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom API integrations</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
