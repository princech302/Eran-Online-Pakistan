import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { AdvertiserCampaign, TaskCategory } from '../../types';
import {
  Briefcase,
  Plus,
  BarChart3,
  CreditCard,
  PieChart,
  Eye,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Filter,
  Check,
  Send
} from 'lucide-react';

export const AdvertiserPortalPage: React.FC<{ initialTab?: string }> = ({ initialTab = 'dashboard' }) => {
  const { currentUser, wallet, refreshWallet, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [campaigns, setCampaigns] = useState<AdvertiserCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  // Create Campaign Form State
  const [cName, setCName] = useState('');
  const [cDesc, setCDesc] = useState('');
  const [cType, setCType] = useState<TaskCategory>('video');
  const [cMediaUrl, setCMediaUrl] = useState('https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80');
  const [cLandingUrl, setCLandingUrl] = useState('https://brand-partner.demo');
  const [cCountry, setCCountry] = useState('Worldwide');
  const [cAudience, setCAudience] = useState('Tech & Lifestyle Consumers');
  const [cDuration, setCDuration] = useState(20);
  const [cReward, setCReward] = useState(0.025);
  const [cCompletions, setCCompletions] = useState(2000);
  const [isCreating, setIsCreating] = useState(false);

  // Dynamic cost calculations
  const userRewardBudget = Number((cReward * cCompletions).toFixed(2));
  const platformFee = Number((userRewardBudget * 0.20).toFixed(2));
  const totalCampaignCost = Number((userRewardBudget + platformFee).toFixed(2));

  const loadCampaigns = async () => {
    setLoading(true);
    const res = await ApiService.getCampaigns(currentUser?.id);
    if (res.success && res.data) {
      setCampaigns(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCampaigns();
  }, [currentUser]);

  // Aggregate metrics
  const activeCampaignsCount = campaigns.filter(c => c.status === 'active').length;
  const totalCompletedTasks = campaigns.reduce((sum, c) => sum + c.completedCount, 0);
  const totalViews = campaigns.reduce((sum, c) => sum + c.viewsCount, 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spentBudget, 0);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if ((wallet?.availableBalance || 0) < totalCampaignCost) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `Campaign requires $${totalCampaignCost.toFixed(2)}, but advertiser balance is $${wallet?.availableBalance.toFixed(2)}.`
      });
      return;
    }

    setIsCreating(true);
    const res = await ApiService.createCampaign({
      advertiserId: currentUser.id,
      advertiserName: currentUser.fullName,
      name: cName,
      description: cDesc,
      type: cType,
      mediaUrl: cMediaUrl,
      landingUrl: cLandingUrl,
      targetCountry: cCountry,
      targetAudience: cAudience,
      durationSeconds: cDuration,
      rewardPerCompletion: cReward,
      maxCompletions: cCompletions,
      userBudget: userRewardBudget,
      platformFee,
      totalBudget: totalCampaignCost,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    });
    setIsCreating(false);

    if (res.success) {
      await refreshWallet();
      await loadCampaigns();
      addToast({
        type: 'success',
        title: 'Campaign Submitted for Review',
        message: 'Your sponsored campaign has entered compliance audit. It will activate once approved.'
      });
      setActiveTab('campaigns');
      setCName('');
      setCDesc('');
    } else {
      addToast({
        type: 'error',
        title: 'Submission Failed',
        message: res.error || 'Could not launch campaign.'
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Advertiser Enterprise Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Nexus Digital Brands & Co.
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage sponsored video promotions, review attention verification rates, and monitor campaign budgets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Advertiser Balance</div>
            <div className="text-base font-bold font-mono text-emerald-400">
              ${wallet?.availableBalance.toFixed(2) || '0.00'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'dashboard', label: 'Overview Dashboard', icon: BarChart3 },
          { id: 'create', label: 'Create Campaign', icon: Plus },
          { id: 'campaigns', label: 'My Campaigns', icon: Briefcase },
          { id: 'analytics', label: 'Attention Analytics', icon: PieChart },
          { id: 'billing', label: 'Billing & Invoices', icon: CreditCard },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* 5 Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Active Campaigns</div>
              <div className="text-xl font-bold font-mono text-white mt-1">{activeCampaignsCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Completed Tasks</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{totalCompletedTasks.toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Total Reach (Views)</div>
              <div className="text-xl font-bold font-mono text-blue-400 mt-1">{totalViews.toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Total Spend</div>
              <div className="text-xl font-bold font-mono text-white mt-1">${totalSpend.toFixed(2)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Remaining Balance</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">${wallet?.availableBalance.toFixed(2)}</div>
            </div>
          </div>

          {/* Quick Action Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Scale Your Audience Today</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Target verified global consumers with unskippable attention verification.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('create')}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Sponsored Campaign</span>
            </button>
          </div>

          {/* Recent Campaigns Snapshot */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Active Campaigns Snapshot</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                  <tr>
                    <th className="pb-3 font-semibold">Campaign</th>
                    <th className="pb-3 font-semibold">Format</th>
                    <th className="pb-3 font-semibold">Reward / User</th>
                    <th className="pb-3 font-semibold">Completions</th>
                    <th className="pb-3 font-semibold">Budget Used</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {campaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3 font-bold text-white">{c.name}</td>
                      <td className="py-3 uppercase font-mono text-[10px] text-blue-400">{c.type}</td>
                      <td className="py-3 font-mono text-emerald-400">${c.rewardPerCompletion.toFixed(3)}</td>
                      <td className="py-3 font-mono">{c.completedCount} / {c.maxCompletions}</td>
                      <td className="py-3 font-mono">${c.spentBudget.toFixed(2)} / ${c.totalBudget.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`inline-flex font-mono text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                          c.status === 'active'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                            : c.status === 'pending_review'
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {c.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREATE CAMPAIGN */}
      {activeTab === 'create' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">Create New Sponsored Promotion</h2>
            <p className="text-xs text-slate-400 mt-1">
              Configure target audience, duration, and user payout. Pricing updates dynamically.
            </p>
          </div>

          <form onSubmit={handleCreateCampaign} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  placeholder="e.g. EcoBreeze Smart Thermostat Launch"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Campaign Format</label>
                <select
                  value={cType}
                  onChange={(e) => setCType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="video">Sponsored Video (Unskippable + Quiz)</option>
                  <option value="website">Website Discovery & Visit</option>
                  <option value="app">App Experience Preview</option>
                  <option value="survey">Market Research Questionnaire</option>
                  <option value="product">Product Catalog Review</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Campaign Brief & Instructions</label>
              <textarea
                required
                rows={3}
                value={cDesc}
                onChange={(e) => setCDesc(e.target.value)}
                placeholder="Highlight key value propositions users should absorb during the promotion..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Landing URL</label>
                <input
                  type="url"
                  required
                  value={cLandingUrl}
                  onChange={(e) => setCLandingUrl(e.target.value)}
                  placeholder="https://yourbrand.com/promo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Media Creative URL</label>
                <input
                  type="url"
                  required
                  value={cMediaUrl}
                  onChange={(e) => setCMediaUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  User Reward ($ USD)
                </label>
                <input
                  type="number"
                  step="0.005"
                  min="0.015"
                  max="1.000"
                  value={cReward}
                  onChange={(e) => setCReward(parseFloat(e.target.value) || 0.02)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Max Verified Completions
                </label>
                <input
                  type="number"
                  step="500"
                  min="500"
                  max="50000"
                  value={cCompletions}
                  onChange={(e) => setCCompletions(parseInt(e.target.value, 10) || 500)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Unskippable Duration (Seconds)
                </label>
                <input
                  type="number"
                  min="15"
                  max="60"
                  step="5"
                  value={cDuration}
                  onChange={(e) => setCDuration(parseInt(e.target.value, 10) || 15)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Dynamic Cost Math Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Estimated User Rewards ({cCompletions.toLocaleString()} users × ${cReward.toFixed(3)}):</span>
                <span className="text-white">${userRewardBudget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>EarnTask Platform Fee (20%):</span>
                <span className="text-blue-400">+${platformFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Campaign Cost:</span>
                <span className="text-emerald-400">${totalCampaignCost.toFixed(2)} USD</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-4 rounded-2xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isCreating ? 'Submitting Campaign...' : `Submit Campaign for Compliance Review ($${totalCampaignCost.toFixed(2)})`}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: MY CAMPAIGNS */}
      {activeTab === 'campaigns' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Campaign Roster ({campaigns.length})</h3>
          <div className="space-y-3">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1">
                    <span className="text-blue-400 uppercase">{c.type}</span>
                    <span>·</span>
                    <span>Target: {c.targetCountry}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{c.description}</p>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Completions</span>
                    <span className="font-bold text-white">{c.completedCount} / {c.maxCompletions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Budget</span>
                    <span className="font-bold text-emerald-400">${c.spentBudget.toFixed(2)} / ${c.totalBudget.toFixed(2)}</span>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                    c.status === 'active'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                  }`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Attention Retention Rate</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">98.4%</div>
              <p className="text-[11px] text-slate-500 mt-1">Finished unskippable video duration</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Post-Quiz Accuracy</div>
              <div className="text-2xl font-bold font-mono text-blue-400 mt-1">94.1%</div>
              <p className="text-[11px] text-slate-500 mt-1">First-pass correct comprehension</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Bot Shield Rejection</div>
              <div className="text-2xl font-bold font-mono text-purple-400 mt-1">100%</div>
              <p className="text-[11px] text-slate-500 mt-1">Suspicious automation attempts blocked</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BILLING */}
      {activeTab === 'billing' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">Advertiser Balance & Invoices</h3>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Available Advertiser Balance</span>
              <div className="text-2xl font-bold font-mono text-white">${wallet?.availableBalance.toFixed(2)}</div>
            </div>
            <button
              onClick={() => addToast({ type: 'info', message: 'Demo mode: In production, connects to corporate wire or credit card gateway.' })}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950"
            >
              Add Demo Funds (+$500)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
