import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  PlayCircle,
  CheckSquare,
  Wallet,
  Users,
  Gift,
  Trophy,
  LifeBuoy,
  User,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export const UserSidebar: React.FC = () => {
  const { currentPath, navigate, dailyAdsRemaining, wallet } = useApp();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    {
      label: 'Watch Ads & Earn',
      path: '/earn/ads',
      icon: PlayCircle,
      badge: `${dailyAdsRemaining} left`,
      highlight: true
    },
    { label: 'All Earning Tasks', path: '/earn', icon: CheckSquare },
    { label: 'Wallet & Payouts', path: '/wallet', icon: Wallet },
    { label: 'Referrals (10%)', path: '/referrals', icon: Users },
    { label: 'Daily Streak Bonus', path: '/bonuses', icon: Gift },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { label: 'Support & Help', path: '/support', icon: LifeBuoy },
    { label: 'Profile & Security', path: '/profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900/60 border-r border-slate-800 min-h-[calc(100vh-4rem)] p-4 shrink-0">
      
      {/* Wallet Balance Widget */}
      <div className="p-3.5 mb-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Available Payout</span>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/60">
            DEMO
          </span>
        </div>
        <div className="text-xl font-bold font-mono text-white mb-2">
          ${wallet?.availableBalance.toFixed(2) || '0.00'}
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
          <span>Pending:</span>
          <span className="font-mono text-amber-300 font-semibold">
            ${wallet?.pendingBalance.toFixed(2) || '0.00'}
          </span>
        </div>
        <button
          onClick={() => navigate('/wallet/withdraw')}
          className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1 transition-colors"
        >
          <span>Withdraw Funds</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="space-y-1 flex-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
          Navigation
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 font-semibold border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-blue-400'
                      : item.highlight
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Security notice in sidebar */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-300 block mb-0.5">Fair Play Enforced</span>
          <span>Automated bots, scripts, or multiple accounts lead to immediate forfeiture.</span>
        </div>
      </div>
    </aside>
  );
};
