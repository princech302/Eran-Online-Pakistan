import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { SponsoredAdTask } from '../../types';
import { WatchAdModal } from '../../components/ads/WatchAdModal';
import {
  PlayCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  Lock
} from 'lucide-react';

export const WatchAdsPage: React.FC = () => {
  const {
    currentUser,
    dailyAdsCount,
    dailyAdsRemaining,
    dailyAdsEarnings,
    refreshWallet,
    refreshDailyAds,
    addToast
  } = useApp();

  const [ads, setAds] = useState<SponsoredAdTask[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeAd, setActiveAd] = useState<SponsoredAdTask | null>(null);
  const [loading, setLoading] = useState(true);

  const isLimitReached = dailyAdsRemaining <= 0;

  const loadData = async () => {
    setLoading(true);
    const adsRes = await ApiService.getSponsoredAds();
    if (adsRes.success && adsRes.data) {
      setAds(adsRes.data);
    }
    if (currentUser) {
      const progRes = await ApiService.getDailyAdProgress(currentUser.id);
      if (progRes.success && progRes.data) {
        setCompletedIds(progRes.data.completedTaskIds);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleStartAd = (ad: SponsoredAdTask) => {
    if (isLimitReached) {
      addToast({
        type: 'error',
        title: 'Daily Limit Reached',
        message: 'You have completed all 10 sponsored video tasks for today. Limit resets at 00:00 UTC.'
      });
      return;
    }

    if (completedIds.includes(ad.id)) {
      addToast({
        type: 'info',
        title: 'Already Completed',
        message: 'You have already completed this sponsored promotion today.'
      });
      return;
    }

    setActiveAd(ad);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Direct Advertiser Sponsored Campaigns Only · No Third-Party Ad Networks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Watch Sponsored Ads & Earn
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          Complete up to 10 eligible sponsored promotional videos per day. Watch the full duration and answer the verification question to credit your balance.
        </p>
      </div>

      {/* Daily Progress Tracker Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Daily Sponsored Ad Allocation
            </div>
            <div className="text-2xl font-extrabold font-mono text-white mt-1">
              Today: <span className="text-emerald-400">{dailyAdsCount} / 10</span> completed
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Remaining:</span>
              <span className="font-bold text-blue-400 text-sm">{dailyAdsRemaining} Slots</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Today's Ad Earnings:</span>
              <span className="font-bold text-emerald-400 text-sm">${dailyAdsEarnings.toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isLimitReached
                  ? 'bg-amber-400'
                  : 'bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400'
              }`}
              style={{ width: `${Math.min(100, (dailyAdsCount / 10) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>0 Completed</span>
            <span>Daily Cap: 10 Sponsored Tasks</span>
          </div>
        </div>

        {isLimitReached && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>
              You have completed today's 10 eligible sponsored ad tasks! Your slots will reset tomorrow at 00:00 UTC. In the meantime, you can explore surveys and web discovery tasks.
            </span>
          </div>
        )}
      </div>

      {/* Sponsored Ads Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            Available Verified Campaigns ({ads.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Direct Platform Sponsors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ads.map((ad) => {
            const isCompleted = completedIds.includes(ad.id);

            return (
              <div
                key={ad.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-slate-950/60 border-slate-800/60 opacity-70'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
                }`}
              >
                <div>
                  {/* Media Thumbnail & Badges */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={ad.thumbnailUrl}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{ad.advertiserName}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-950/90 text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span>{ad.durationSeconds}s duration</span>
                      </span>

                      <span className="px-2.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-800 text-emerald-300 font-bold">
                        Reward: +${ad.rewardAmount.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {/* Campaign Title & Description */}
                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                    {ad.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {ad.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                    <span>Target: {ad.targetAudience}</span>
                    <span className="font-mono">{ad.remainingSlots.toLocaleString()} slots left</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  {isCompleted ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-950 text-slate-500 border border-slate-800 cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Completed Today</span>
                    </button>
                  ) : isLimitReached ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-950 text-slate-500 border border-slate-800 cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Daily Limit Reached (10/10)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartAd(ad)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4 text-slate-950" />
                      <span>WATCH & EARN (+${ad.rewardAmount.toFixed(3)})</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Watch Ad Modal */}
      {activeAd && (
        <WatchAdModal
          adTask={activeAd}
          isOpen={true}
          onClose={() => setActiveAd(null)}
          onSuccess={() => {
            refreshWallet();
            refreshDailyAds();
            loadData();
          }}
        />
      )}

    </div>
  );
};
