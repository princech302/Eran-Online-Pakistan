import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { PaymentMethodOption, WithdrawalRequest } from '../../types';
import {
  Wallet,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Building2,
  Smartphone,
  Coins,
  ShieldCheck,
  Clock,
  ArrowLeft
} from 'lucide-react';

export const WithdrawPage: React.FC = () => {
  const { wallet, currentUser, navigate, refreshWallet, addToast } = useApp();

  const [methods, setMethods] = useState<PaymentMethodOption[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string>('method_paypal');
  const [amount, setAmount] = useState<number>(10.00);
  const [accountDestination, setAccountDestination] = useState<string>('alex.rivera@example.com');
  const [pastWithdrawals, setPastWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const mRes = await ApiService.getWithdrawalMethods();
      if (mRes.success && mRes.data) {
        setMethods(mRes.data);
      }
      if (currentUser) {
        const wRes = await ApiService.getWithdrawals(currentUser.id);
        if (wRes.success && wRes.data) {
          setPastWithdrawals(wRes.data);
        }
      }
    };
    load();
  }, [currentUser]);

  const selectedMethod = methods.find(m => m.id === selectedMethodId) || methods[0];

  // Fee calculation
  const percentageFee = selectedMethod ? (amount * (selectedMethod.feePercentage / 100)) : 0;
  const fixedFee = selectedMethod ? selectedMethod.feeFixed : 0;
  const totalFee = Number((percentageFee + fixedFee).toFixed(2));
  const netDisbursement = Number(Math.max(0, amount - totalFee).toFixed(2));

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedMethod) return;

    if (amount < selectedMethod.minWithdrawal) {
      setErrorMsg(`Minimum withdrawal for ${selectedMethod.name} is $${selectedMethod.minWithdrawal.toFixed(2)}.`);
      return;
    }

    if ((wallet?.availableBalance || 0) < amount) {
      setErrorMsg('Insufficient available balance.');
      return;
    }

    if (!accountDestination.trim()) {
      setErrorMsg('Please specify account payout details.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const res = await ApiService.requestWithdrawal({
      userId: currentUser.id,
      amount,
      paymentMethodId: selectedMethod.id,
      accountDetails: { email: accountDestination, accountNumber: accountDestination }
    });

    setLoading(false);

    if (res.success && res.data) {
      await refreshWallet();
      addToast({
        type: 'success',
        title: 'Withdrawal Queued',
        message: 'Your payout request was submitted. View status below or in Compliance Admin.'
      });
      // Refresh list
      const updatedList = await ApiService.getWithdrawals(currentUser.id);
      if (updatedList.success && updatedList.data) {
        setPastWithdrawals(updatedList.data);
      }
    } else {
      setErrorMsg(res.error || 'Failed to submit withdrawal request.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Back button and title */}
      <div>
        <button
          onClick={() => navigate('/wallet')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Wallet</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Request Withdrawal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Select a verified payout method to disburse your available reward balance.
        </p>
      </div>

      {/* Mandatory Demo Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-amber-200 block">Demo Payout Notice:</strong>
          Demo payout — real payment processing is not connected. In this demo environment, your withdrawal request moves to the Admin compliance review queue for simulated approval or rejection.
        </div>
      </div>

      {/* Main Request Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        
        <form onSubmit={handleWithdraw} className="space-y-6">
          
          {/* Method Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              1. Select Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {methods.map((m) => {
                const isSelected = selectedMethodId === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMethodId(m.id);
                      setErrorMsg(null);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white mb-1">
                        {m.name}
                      </div>
                      <div className="text-[11px] text-slate-400 space-y-0.5 font-mono">
                        <div>Min: ${m.minWithdrawal.toFixed(2)}</div>
                        <div>Fee: {m.feePercentage}% + ${m.feeFixed.toFixed(2)}</div>
                        <div className="text-blue-400">{m.estimatedHours}</div>
                      </div>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-600'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount input & presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Enter Withdrawal Amount ($ USD)
              </label>
              <span className="text-xs font-mono text-slate-400">
                Available: <strong className="text-emerald-400">${wallet?.availableBalance.toFixed(2) || '0.00'}</strong>
              </span>
            </div>

            <div className="relative">
              <span className="text-lg font-mono font-bold text-slate-500 absolute left-4 top-1/2 -translate-y-1/2">$</span>
              <input
                type="number"
                step="0.01"
                min={selectedMethod?.minWithdrawal || 5}
                max={wallet?.availableBalance || 0}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-base font-mono font-bold text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Quick preset buttons */}
            <div className="flex items-center gap-2 mt-2.5">
              {[5, 10, 20, 50].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  ${val}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount(Number(wallet?.availableBalance.toFixed(2) || 0))}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition-colors"
              >
                Max (${wallet?.availableBalance.toFixed(2) || '0.00'})
              </button>
            </div>
          </div>

          {/* Payout Details */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              3. Payout Destination Details
            </label>
            <input
              type="text"
              value={accountDestination}
              onChange={(e) => setAccountDestination(e.target.value)}
              placeholder="e.g. PayPal email address or Bank account IBAN/routing"
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Ensure details match your verified account name to prevent compliance holds.
            </span>
          </div>

          {/* Fee & Calculation Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Gross Withdrawal:</span>
              <span className="text-white">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Processing Fee:</span>
              <span className="text-rose-400">-${totalFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Est. Processing Duration:</span>
              <span className="text-blue-400">{selectedMethod?.estimatedHours}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
              <span>Net Disbursement:</span>
              <span className="text-emerald-400">${netDisbursement.toFixed(2)} USD</span>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (wallet?.availableBalance || 0) < (selectedMethod?.minWithdrawal || 5)}
            className="w-full py-4 rounded-2xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Submitting for Review...</span>
            ) : (
              <>
                <span>REQUEST WITHDRAWAL (${netDisbursement.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>

      {/* Payout Status History Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">
          Your Withdrawal Requests ({pastWithdrawals.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
              <tr>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Method</th>
                <th className="pb-3 font-semibold">Gross</th>
                <th className="pb-3 font-semibold">Net Payout</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {pastWithdrawals.map((w) => (
                <tr key={w.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 font-mono text-[11px] text-slate-400">
                    {new Date(w.requestedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 font-medium text-slate-100">
                    {w.paymentMethod}
                  </td>
                  <td className="py-3 font-mono text-slate-300">
                    ${w.amount.toFixed(2)}
                  </td>
                  <td className="py-3 font-mono font-bold text-emerald-400">
                    ${w.netAmount.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                      w.status === 'paid'
                        ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-800'
                        : w.status === 'under_review' || w.status === 'pending'
                        ? 'text-amber-300 bg-amber-950/60 border border-amber-800'
                        : 'text-rose-300 bg-rose-950/60 border border-rose-800'
                    }`}>
                      {w.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-400">
                    {w.transactionHash || w.adminNotes || 'Under Verification'}
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
