import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { GeneralTask, SponsoredAdTask } from '../../types';
import { WatchAdModal } from '../../components/ads/WatchAdModal';
import { TaskDetailModal } from '../../components/tasks/TaskDetailModal';
import {
  Wallet,
  Clock,
  TrendingUp,
  ArrowUpRight,
  PlayCircle,
  CheckCircle2,
  Gift,
  Users,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const {
    currentUser,
    wallet,
    navigate,
    dailyAdsCount,
    dailyAdsRemaining,
    dailyAdsEarnings,
    refreshWallet,
    refreshDailyAds
  } = useApp();

  const [topAds, setTopAds] = useState<SponsoredAdTask[]>([]);
  const [recommendedTasks, setRecommendedTasks] = useState<GeneralTask[]>([]);
  const [activeAdModal, setActiveAdModal] = useState<SponsoredAdTask | null>(null);
  const [activeTaskModal, setActiveTaskModal] = useState<GeneralTask | null>(null);

  useEffect(() => {
    const load = async () => {
      const adsRes = await ApiService.getSponsoredAds();
      if (adsRes.success && adsRes.data) {
        setTopAds(adsRes.data.slice(0, 3));
      }
      const tasksRes = await ApiService.getGeneralTasks();
      if (tasksRes.success && tasksRes.data) {
        setRecommendedTasks(tasksRes.data.slice(0, 3));
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {currentUser?.fullName || 'Member'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your verified earnings, daily sponsored video limit, and payout eligibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/wallet/withdraw')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <span>Request Payout</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Available Balance */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>AVAILABLE BALANCE</span>
            <span className="font-mono text-[10px] text-emerald-400 font-bold">READY</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            ${wallet?.availableBalance.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <span>Min. withdrawal: $5.00</span>
          </div>
        </div>

        {/* Pending Rewards */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>PENDING REWARDS</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-300">
            ${wallet?.pendingBalance.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Verification clears in 12–24h
          </div>
        </div>

        {/* Total Earned */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>TOTAL EARNED</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            ${wallet?.lifetimeEarnings.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Lifetime verified rewards
          </div>
        </div>

        {/* Total Withdrawn */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>TOTAL WITHDRAWN</span>
            <Wallet className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            ${wallet?.lifetimeWithdrawals.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Disbursed to bank / wallets
          </div>
        </div>

      </div>

      {/* Main CTA: Daily Watch Ads & Earn Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-900 border border-blue-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Sponsor Spotlight</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Watch Sponsored Ads & Earn
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete up to 10 eligible direct advertiser videos per day. Earn verified instant micro-rewards while discovering new products.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Today's Ads</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {dailyAdsCount} / 10
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Today's Earnings</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">
                  ${dailyAdsEarnings.toFixed(3)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Slots Remaining</div>
                <div className="text-sm sm:text-base font-bold text-blue-400 mt-0.5">
                  {dailyAdsRemaining} Left
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => navigate('/earn/ads')}
              className="px-8 py-4 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5 text-slate-950" />
              <span>WATCH ADS & EARN</span>
            </button>

            <button
              onClick={() => navigate('/earn')}
              className="px-6 py-3 rounded-2xl font-semibold text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors text-center"
            >
              Browse All Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Grid: Sponsored Ads Spotlight + General Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Today's Video Ads Preview */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Active Sponsored Videos</h3>
            </div>
            <button
              onClick={() => navigate('/earn/ads')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-0.5"
            >
              <span>View All 10</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topAds.map((ad) => (
              <div
                key={ad.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={ad.thumbnailUrl}
                    alt={ad.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400">{ad.advertiserName}</div>
                    <div className="text-xs font-semibold text-slate-100 truncate">{ad.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                      <span>{ad.durationSeconds}s duration</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-bold">+${ad.rewardAmount.toFixed(3)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveAdModal(ad)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0 transition-colors"
                >
                  Watch
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Other Tasks */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Recommended Market Tasks</h3>
            </div>
            <button
              onClick={() => navigate('/earn')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-0.5"
            >
              <span>Explore Marketplace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedTasks.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-blue-400 uppercase">{t.category} · {t.advertiserName}</div>
                  <div className="text-xs font-semibold text-slate-100 truncate">{t.title}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                    <span>{t.estimatedMinutes} mins</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-bold">+${t.rewardAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTaskModal(t)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 shrink-0 transition-colors"
                >
                  Start Task
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Streak and Referral Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => navigate('/bonuses')}
          className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Daily Login Streak Bonus</h4>
              <p className="text-[11px] text-slate-400">Keep your 7-day streak active to claim up to $0.75 reward.</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div
          onClick={() => navigate('/referrals')}
          className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">10% Referral Commission</h4>
              <p className="text-[11px] text-slate-400">Invite peers to EarnTask and earn recurring 10% shares on their rewards.</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Active Modals */}
      {activeAdModal && (
        <WatchAdModal
          adTask={activeAdModal}
          isOpen={true}
          onClose={() => setActiveAdModal(null)}
          onSuccess={() => {
            refreshWallet();
            refreshDailyAds();
          }}
        />
      )}

      {activeTaskModal && (
        <TaskDetailModal
          task={activeTaskModal}
          isOpen={true}
          onClose={() => setActiveTaskModal(null)}
          onSubmitted={() => {
            refreshWallet();
          }}
        />
      )}

    </div>
  );
};
