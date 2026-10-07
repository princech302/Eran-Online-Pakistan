import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { DailyBonusState } from '../../types';
import { Gift, CheckCircle2, Flame, Award, Clock, ArrowRight } from 'lucide-react';

export const BonusesPage: React.FC = () => {
  const { currentUser, refreshWallet, addToast } = useApp();
  const [bonusState, setBonusState] = useState<DailyBonusState | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);

  const loadData = async () => {
    const res = await ApiService.getDailyBonus();
    if (res.success && res.data) {
      setBonusState(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const streakDays = [
    { day: 1, amount: 0.05, label: 'Day 1' },
    { day: 2, amount: 0.08, label: 'Day 2' },
    { day: 3, amount: 0.12, label: 'Day 3' },
    { day: 4, amount: 0.15, label: 'Day 4' },
    { day: 5, amount: 0.20, label: 'Day 5' },
    { day: 6, amount: 0.30, label: 'Day 6' },
    { day: 7, amount: 0.75, label: 'Day 7 Jackpot' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const isAlreadyClaimedToday = bonusState?.lastClaimDate === today;

  const handleClaim = async () => {
    if (!currentUser) return;
    setIsClaiming(true);

    const res = await ApiService.claimDailyBonus(currentUser.id);
    setIsClaiming(false);

    if (res.success && res.data) {
      await refreshWallet();
      await loadData();
      addToast({
        type: 'success',
        title: 'Daily Streak Bonus Claimed!',
        message: `+$${res.data.amount.toFixed(2)} added to your wallet. Current Streak: ${res.data.streak} days!`
      });
    } else {
      addToast({
        type: 'info',
        title: 'Already Claimed',
        message: res.error || 'Today’s bonus has already been collected.'
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Daily Streaks & Milestone Bonuses
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Log in every 24 hours to progress your 7-day reward streak and unlock higher bonuses.
        </p>
      </div>

      {/* Streak Dashboard Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Streak
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">
                {bonusState?.currentStreak || 5} Days In a Row
              </div>
            </div>
          </div>

          <button
            onClick={handleClaim}
            disabled={isAlreadyClaimedToday || isClaiming}
            className={`px-6 py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              isAlreadyClaimedToday
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700/60'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isAlreadyClaimedToday ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Claimed for Today</span>
              </>
            ) : (
              <>
                <Gift className="w-4 h-4 text-slate-950" />
                <span>{isClaiming ? 'Claiming...' : 'Claim Today’s Bonus'}</span>
              </>
            )}
          </button>
        </div>

        {/* 7-Day Visual Progress Track */}
        <div>
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
            7-Day Streak Ladder
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {streakDays.map((st) => {
              const currentActiveDay = ((bonusState?.currentStreak || 0) % 7) || 7;
              const isPassed = st.day <= currentActiveDay;
              const isCurrent = st.day === currentActiveDay;

              return (
                <div
                  key={st.day}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isPassed
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-400 mb-1">
                    {st.label}
                  </div>
                  <div className={`text-base font-extrabold font-mono mb-2 ${
                    isPassed ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    ${st.amount.toFixed(2)}
                  </div>
                  <div className="text-[10px] font-mono">
                    {isPassed ? (
                      <span className="text-emerald-400 flex items-center justify-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span>Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Campaign Milestones */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">
          Platform Achievement Bonuses
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Century Club: 100 Video Ads</h4>
                <p className="text-[11px] text-slate-400">Complete 100 sponsored video views with 100% quiz comprehension.</p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-900/60">
              +$1.00 Bonus
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-purple-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Network Pioneer: 5 Active Referrals</h4>
                <p className="text-[11px] text-slate-400">Invite 5 active users who each complete at least 10 marketplace tasks.</p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-900/60">
              +$2.50 Bonus
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
