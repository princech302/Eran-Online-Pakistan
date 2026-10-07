import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { Transaction } from '../../types';
import {
  Wallet,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  Filter,
  Receipt,
  AlertTriangle
} from 'lucide-react';

export const WalletPage: React.FC = () => {
  const { wallet, currentUser, navigate } = useApp();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!currentUser) return;
      setLoading(true);
      const res = await ApiService.getTransactions(currentUser.id);
      if (res.success && res.data) {
        setTransactions(res.data);
      }
      setLoading(false);
    };
    load();
  }, [currentUser]);

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Wallet & Transactions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your verified balances and view detailed audit transaction records.
          </p>
        </div>

        <button
          onClick={() => navigate('/wallet/withdraw')}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20 self-start sm:self-auto cursor-pointer"
        >
          <span>Request Withdrawal</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
        <div>
          <span className="font-bold text-amber-200 block mb-0.5">Demo payout environment</span>
          <span>
            Simulated wallet balances and test payout queues. Actual payment gateway APIs (PayPal Payouts, Stripe Connect, Wise API) connect through the payment abstraction layer.
          </span>
        </div>
      </div>

      {/* 4 Wallet Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">AVAILABLE BALANCE</div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            ${wallet?.availableBalance.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Eligible for immediate payout</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">PENDING BALANCE</div>
          <div className="text-2xl font-extrabold font-mono text-amber-300">
            ${wallet?.pendingBalance.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Awaiting sponsor verification</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">LIFETIME EARNINGS</div>
          <div className="text-2xl font-extrabold font-mono text-white">
            ${wallet?.lifetimeEarnings.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Total approved rewards</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">LIFETIME WITHDRAWN</div>
          <div className="text-2xl font-extrabold font-mono text-white">
            ${wallet?.lifetimeWithdrawals.toFixed(2) || '0.00'}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">Successfully disbursed</div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Transaction History
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['all', 'task_reward', 'bonus', 'referral_reward', 'withdrawal'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterType === f
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {f === 'all'
                  ? 'All Transactions'
                  : f === 'task_reward'
                  ? 'Task Rewards'
                  : f === 'bonus'
                  ? 'Daily Bonuses'
                  : f === 'referral_reward'
                  ? 'Referrals'
                  : 'Withdrawals'}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">Date & Time</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-500">
                    No transactions found in this category.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <tr key={tx.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3 font-mono text-[11px] text-slate-400">
                        {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 font-medium text-slate-100">
                        {tx.description}
                      </td>
                      <td className="py-3">
                        <span className="font-mono text-[10px] text-slate-400 uppercase">
                          {tx.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className={`py-3 font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {isPositive ? `+$${tx.amount.toFixed(3)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                          tx.status === 'completed'
                            ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-800'
                            : 'text-amber-300 bg-amber-950/60 border border-amber-800'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
