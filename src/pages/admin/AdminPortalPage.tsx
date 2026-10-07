import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { StorageService } from '../../services/storageService';
import {
  WithdrawalRequest,
  AdvertiserCampaign,
  User,
  AdminAuditLog,
  FraudFlag
} from '../../types';
import {
  ShieldCheck,
  Users,
  Briefcase,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  Activity,
  Filter,
  Search,
  Lock,
  UserX
} from 'lucide-react';

export const AdminPortalPage: React.FC = () => {
  const { currentUser, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'withdrawals' | 'campaigns' | 'users' | 'fraud' | 'audits'>('overview');
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [campaigns, setCampaigns] = useState<AdvertiserCampaign[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [fraudFlags, setFraudFlags] = useState<FraudFlag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    const wRes = await ApiService.getWithdrawals();
    if (wRes.success && wRes.data) setWithdrawals(wRes.data);

    const cRes = await ApiService.getCampaigns();
    if (cRes.success && cRes.data) setCampaigns(cRes.data);

    const uList = StorageService.getUsers();
    setUsers(uList);

    const aRes = await ApiService.getAuditLogs();
    if (aRes.success && aRes.data) setAuditLogs(aRes.data);

    const fRes = await ApiService.getFraudFlags();
    if (fRes.success && fRes.data) setFraudFlags(fRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Admin actions: Withdrawals
  const handleApproveWithdrawal = async (wId: string) => {
    await ApiService.approveWithdrawal(wId, currentUser?.email || 'admin@earntask.demo');
    addToast({ type: 'success', title: 'Withdrawal Paid', message: `Withdrawal ${wId} marked as disbursed.` });
    await loadData();
  };

  const handleRejectWithdrawal = async (wId: string) => {
    await ApiService.rejectWithdrawal(wId, currentUser?.email || 'admin@earntask.demo', 'Compliance risk check failed.');
    addToast({ type: 'info', title: 'Withdrawal Rejected', message: `Funds restored to user balance.` });
    await loadData();
  };

  // Admin actions: Campaigns
  const handleApproveCampaign = async (cId: string) => {
    await ApiService.approveCampaign(cId, currentUser?.email || 'admin@earntask.demo');
    addToast({ type: 'success', title: 'Campaign Approved', message: 'Campaign is now active in marketplace.' });
    await loadData();
  };

  const handleRejectCampaign = async (cId: string) => {
    await ApiService.rejectCampaign(cId, currentUser?.email || 'admin@earntask.demo', 'Did not meet compliance guidelines.');
    addToast({ type: 'info', title: 'Campaign Rejected', message: 'Advertiser notified.' });
    await loadData();
  };

  // Admin actions: Users
  const handleToggleUserBan = (user: User) => {
    const updated = { ...user, isBanned: !user.isBanned };
    StorageService.saveUser(updated);
    StorageService.addAuditLog({
      id: `audit_${Date.now()}`,
      adminId: currentUser?.id || 'admin',
      adminEmail: currentUser?.email || 'admin@earntask.demo',
      action: user.isBanned ? 'RESTORE_USER' : 'BAN_USER',
      targetType: 'user',
      targetId: user.id,
      details: `${user.isBanned ? 'Restored' : 'Banned'} account ${user.username}`,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1'
    });
    addToast({
      type: 'info',
      title: 'User Status Updated',
      message: `${user.username} is now ${user.isBanned ? 'Active' : 'Banned'}.`
    });
    loadData();
  };

  const pendingWithdrawalsCount = withdrawals.filter(w => w.status === 'pending' || w.status === 'under_review').length;
  const pendingCampaignsCount = campaigns.filter(c => c.status === 'pending_review').length;

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance & Operations Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Platform Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit campaigns, approve payouts, inspect risk flags, and maintain marketplace integrity.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Platform Overview', icon: Activity },
          { id: 'withdrawals', label: `Withdrawals (${pendingWithdrawalsCount} pending)`, icon: DollarSign },
          { id: 'campaigns', label: `Campaigns (${pendingCampaignsCount} pending)`, icon: Briefcase },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'fraud', label: `Fraud Alerts (${fraudFlags.length})`, icon: AlertTriangle },
          { id: 'audits', label: 'Audit Trail', icon: FileText },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Total Users</div>
              <div className="text-xl font-bold font-mono text-white mt-1">{users.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Pending Payouts</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">{pendingWithdrawalsCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Pending Campaigns</div>
              <div className="text-xl font-bold font-mono text-blue-400 mt-1">{pendingCampaignsCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Fraud Signals</div>
              <div className="text-xl font-bold font-mono text-rose-400 mt-1">{fraudFlags.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Platform Revenue</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">$1,690.00</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Urgent Withdrawals queue */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Payouts Requiring Audit</span>
                </h3>
                <button onClick={() => setActiveTab('withdrawals')} className="text-xs text-blue-400 hover:underline">
                  View All
                </button>
              </div>

              {withdrawals.filter(w => w.status !== 'paid').map((w) => (
                <div key={w.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">{w.userName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{w.paymentMethod} · ${w.amount.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveWithdrawal(w.id)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                    >
                      Disburse
                    </button>
                    <button
                      onClick={() => handleRejectWithdrawal(w.id)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pending Campaigns Queue */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Sponsor Campaigns Awaiting Audit</span>
                </h3>
                <button onClick={() => setActiveTab('campaigns')} className="text-xs text-blue-400 hover:underline">
                  View All
                </button>
              </div>

              {campaigns.filter(c => c.status === 'pending_review').map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">{c.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">By {c.advertiserName} · Budget: ${c.totalBudget.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveCampaign(c.id)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectCampaign(c.id)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WITHDRAWALS TABLE */}
      {activeTab === 'withdrawals' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Withdrawal Compliance Audit Queue</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="pb-3 font-semibold">User</th>
                  <th className="pb-3 font-semibold">Method & Destination</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Risk Score</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Compliance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 font-semibold text-white">
                      <div>{w.userName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{w.userEmail}</div>
                    </td>
                    <td className="py-3">
                      <div>{w.paymentMethod}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{w.accountDetails.email || w.accountDetails.accountNumber}</div>
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-400">
                      ${w.amount.toFixed(2)}
                    </td>
                    <td className="py-3 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        w.riskScore === 'low'
                          ? 'bg-emerald-950 text-emerald-400'
                          : w.riskScore === 'medium'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-rose-950 text-rose-400'
                      }`}>
                        {w.riskScore} risk
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-[10px] uppercase text-slate-300">
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {w.status !== 'paid' && w.status !== 'rejected' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveWithdrawal(w.id)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => handleRejectWithdrawal(w.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CAMPAIGNS TABLE */}
      {activeTab === 'campaigns' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Sponsor Campaign Approvals</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="pb-3 font-semibold">Campaign Title</th>
                  <th className="pb-3 font-semibold">Advertiser</th>
                  <th className="pb-3 font-semibold">Total Budget</th>
                  <th className="pb-3 font-semibold">Reward / User</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 font-semibold text-white">{c.name}</td>
                    <td className="py-3 text-slate-300">{c.advertiserName}</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">${c.totalBudget.toFixed(2)}</td>
                    <td className="py-3 font-mono">${c.rewardPerCompletion.toFixed(3)}</td>
                    <td className="py-3 font-mono uppercase text-[10px] text-slate-400">{c.status}</td>
                    <td className="py-3">
                      {c.status === 'pending_review' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveCampaign(c.id)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectCampaign(c.id)}
                            className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-rose-400 hover:bg-slate-700"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">Live</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">User Directory & Account Controls</h3>

          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{u.fullName}</span>
                    <span className="text-xs font-mono text-slate-400">(@{u.username})</span>
                    {u.isBanned && (
                      <span className="px-1.5 py-0.2 bg-rose-950 border border-rose-800 text-rose-400 text-[10px] rounded font-bold font-mono">
                        BANNED
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {u.email} · Role: {u.role.toUpperCase()} · Country: {u.country}
                  </div>
                </div>

                <button
                  onClick={() => handleToggleUserBan(u)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    u.isBanned
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                  }`}
                >
                  {u.isBanned ? 'Restore Account' : 'Suspend / Ban'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FRAUD ALERTS */}
      {activeTab === 'fraud' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Automated Risk & Fraud Signals</h3>

          <div className="space-y-3">
            {fraudFlags.map((f) => (
              <div key={f.id} className="p-4 rounded-2xl bg-slate-950/80 border border-rose-900/40 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-rose-400 font-bold uppercase">{f.type.replace('_', ' ')}</span>
                    <span>·</span>
                    <span className="text-slate-300 font-semibold">{f.userName}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{f.details}</p>
                  <div className="text-[10px] text-slate-500 font-mono">{new Date(f.detectedAt).toLocaleString()}</div>
                </div>

                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-rose-950 text-rose-300 border border-rose-800 shrink-0">
                  {f.severity} severity
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT TRAIL */}
      {activeTab === 'audits' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Immutable Administrative Audit Log</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="pb-3 font-semibold">Timestamp</th>
                  <th className="pb-3 font-semibold">Admin Account</th>
                  <th className="pb-3 font-semibold">Action</th>
                  <th className="pb-3 font-semibold">Target</th>
                  <th className="pb-3 font-semibold">Operation Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 text-[11px] text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="py-3 text-slate-300">{log.adminEmail}</td>
                    <td className="py-3 font-bold text-blue-400">{log.action}</td>
                    <td className="py-3 text-slate-400">{log.targetType}:{log.targetId}</td>
                    <td className="py-3 text-slate-300 font-sans">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
