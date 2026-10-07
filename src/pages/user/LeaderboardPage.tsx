import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../services/storageService';
import { Trophy, Medal, Eye, EyeOff, ShieldCheck, User } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { currentUser, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'earners' | 'tasks' | 'referrals'>('earners');
  const [showPublicly, setShowPublicly] = useState<boolean>(currentUser?.showOnLeaderboard ?? true);

  const handleTogglePrivacy = () => {
    if (!currentUser) return;
    const updated = !showPublicly;
    setShowPublicly(updated);
    const updatedUser = { ...currentUser, showOnLeaderboard: updated };
    StorageService.saveUser(updatedUser);
    addToast({
      type: 'info',
      title: 'Privacy Setting Updated',
      message: updated
        ? 'Your username is now visible on public leaderboards.'
        : 'Your username has been obfuscated as "Anonymous User" on public boards.'
    });
  };

  const topEarners = [
    { rank: 1, name: 'Elena_V', country: 'Germany', earnings: 142.80, tasks: 412, badge: 'gold' },
    { rank: 2, name: 'Devon_M', country: 'United States', earnings: 128.45, tasks: 388, badge: 'silver' },
    { rank: 3, name: showPublicly ? (currentUser?.username || 'alex_r') : 'Anonymous User', country: currentUser?.country || 'United States', earnings: 68.30, tasks: 165, badge: 'bronze', isCurrent: true },
    { rank: 4, name: 'Tariq_K', country: 'United Arab Emirates', earnings: 61.20, tasks: 190 },
    { rank: 5, name: 'Mateo_S', country: 'Spain', earnings: 54.10, tasks: 142 },
    { rank: 6, name: 'Aisha_B', country: 'United Kingdom', earnings: 49.85, tasks: 130 },
  ];

  const topCompleters = [
    { rank: 1, name: 'Elena_V', country: 'Germany', tasks: 412, earnings: 142.80 },
    { rank: 2, name: 'Devon_M', country: 'United States', tasks: 388, earnings: 128.45 },
    { rank: 3, name: 'Tariq_K', country: 'United Arab Emirates', tasks: 190, earnings: 61.20 },
    { rank: 4, name: showPublicly ? (currentUser?.username || 'alex_r') : 'Anonymous User', country: currentUser?.country || 'United States', tasks: 165, earnings: 68.30, isCurrent: true },
    { rank: 5, name: 'Mateo_S', country: 'Spain', tasks: 142, earnings: 54.10 },
  ];

  const topReferrers = [
    { rank: 1, name: 'MarketingPro_99', country: 'Canada', referrals: 48, commission: 84.50 },
    { rank: 2, name: 'TechReviews_UK', country: 'United Kingdom', referrals: 36, commission: 62.10 },
    { rank: 3, name: 'CryptoGuide', country: 'Singapore', referrals: 29, commission: 51.40 },
    { rank: 4, name: showPublicly ? (currentUser?.username || 'alex_r') : 'Anonymous User', country: currentUser?.country || 'United States', referrals: 3, commission: 5.55, isCurrent: true },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verified Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Celebrating the top honest task completers and community referrers on EarnTask.
          </p>
        </div>

        {/* Privacy Opt-out Toggle */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          {showPublicly ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
          <div>
            <div className="font-semibold text-slate-200">Public Username</div>
            <div className="text-[10px] text-slate-400">{showPublicly ? 'Visible' : 'Hidden as Anonymous'}</div>
          </div>
          <button
            onClick={handleTogglePrivacy}
            className={`ml-2 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              showPublicly ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-blue-600 text-white'
            }`}
          >
            {showPublicly ? 'Hide Me' : 'Show Me'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'earners', label: 'Top Earners', icon: Trophy },
          { id: 'tasks', label: 'Top Task Completers', icon: Medal },
          { id: 'referrals', label: 'Top Referrers', icon: User },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
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

      {/* Leaderboard Table Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">Rank</th>
                <th className="pb-3 font-semibold">Participant</th>
                <th className="pb-3 font-semibold">Country</th>
                {activeTab === 'earners' && <th className="pb-3 font-semibold">Lifetime Rewards</th>}
                {activeTab === 'tasks' && <th className="pb-3 font-semibold">Verified Tasks</th>}
                {activeTab === 'referrals' && <th className="pb-3 font-semibold">Referred Members</th>}
                {activeTab !== 'earners' && <th className="pb-3 font-semibold">Earnings</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {(activeTab === 'earners' ? topEarners : activeTab === 'tasks' ? topCompleters : topReferrers).map((row: any) => (
                <tr
                  key={row.rank}
                  className={`transition-colors ${
                    row.isCurrent ? 'bg-blue-950/30 border-l-2 border-blue-500' : 'hover:bg-slate-950/40'
                  }`}
                >
                  <td className="py-3.5 font-mono">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold ${
                      row.rank === 1
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : row.rank === 2
                        ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40'
                        : row.rank === 3
                        ? 'bg-amber-700/20 text-amber-600 border border-amber-700/40'
                        : 'text-slate-400'
                    }`}>
                      #{row.rank}
                    </span>
                  </td>
                  <td className="py-3.5 font-semibold text-white flex items-center gap-2">
                    <span>{row.name}</span>
                    {row.isCurrent && (
                      <span className="font-mono text-[9px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20">
                        YOU
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-slate-400">
                    {row.country}
                  </td>
                  {activeTab === 'earners' && (
                    <td className="py-3.5 font-mono font-bold text-emerald-400">
                      ${row.earnings.toFixed(2)}
                    </td>
                  )}
                  {activeTab === 'tasks' && (
                    <>
                      <td className="py-3.5 font-mono font-bold text-blue-400">
                        {row.tasks}
                      </td>
                      <td className="py-3.5 font-mono text-emerald-400">
                        ${row.earnings.toFixed(2)}
                      </td>
                    </>
                  )}
                  {activeTab === 'referrals' && (
                    <>
                      <td className="py-3.5 font-mono font-bold text-purple-400">
                        {row.referrals}
                      </td>
                      <td className="py-3.5 font-mono text-emerald-400">
                        ${row.commission.toFixed(2)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
