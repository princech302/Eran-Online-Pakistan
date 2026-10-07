import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { Referral } from '../../types';
import {
  Users,
  Copy,
  Check,
  ShieldCheck,
  Award,
  TrendingUp,
  Share2,
  AlertTriangle
} from 'lucide-react';

export const ReferralsPage: React.FC = () => {
  const { currentUser, addToast } = useApp();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!currentUser) return;
      const res = await ApiService.getReferrals(currentUser.id);
      if (res.success && res.data) {
        setReferrals(res.data);
      }
    };
    load();
  }, [currentUser]);

  const referralCode = currentUser?.referralCode || 'EARN-ALEX99';
  const referralUrl = `https://earntask.demo/register?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Link Copied',
      message: 'Referral link copied to clipboard.'
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const totalReferrals = referrals.length;
  const activeReferrals = referrals.filter(r => r.status === 'active').length;
  const totalCommission = referrals.reduce((sum, r) => sum + r.totalCommissionEarned, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Referral Program
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Invite friends and colleagues. Earn a recurring 10% commission on every verified task they complete.
        </p>
      </div>

      {/* Referral Link Share Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">
            Your Unique Referral Link & Code
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 select-all truncate">
            {referralUrl}
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
          <span>Referral Code:</span>
          <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            {referralCode}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">TOTAL REFERRALS</div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {totalReferrals}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Registered via your code</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">ACTIVE REFERRALS</div>
          <div className="text-2xl font-extrabold font-mono text-blue-400">
            {activeReferrals}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Completed &gt;1 approved task</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">COMMISSION EARNED</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            ${totalCommission.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">10% recurring share credited</div>
        </div>
      </div>

      {/* Anti-Fraud Notice */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Automated Referral Fraud Detection</span>
        </div>
        <p className="leading-relaxed">
          Self-referrals, multiple accounts created on the same device or IP subnet, and artificial referral rings are flagged by our anti-abuse system. Only legitimate referrals from unique individuals are eligible for lifetime commissions.
        </p>
      </div>

      {/* Referrals List Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">
          Referred Members ({referrals.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">Joined Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Total Commission</th>
                <th className="pb-3 font-semibold">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 font-semibold text-white">
                    {ref.referredName}
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-400">
                    {ref.joinedDate}
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                      ref.status === 'active'
                        ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-800'
                        : 'text-amber-300 bg-amber-950/60 border border-amber-800'
                    }`}>
                      {ref.status === 'active' ? 'Active' : 'Pending First Task'}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-bold text-emerald-400">
                    ${ref.totalCommissionEarned.toFixed(2)}
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-400">
                    {ref.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
