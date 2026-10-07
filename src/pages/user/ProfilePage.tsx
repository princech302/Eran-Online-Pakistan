import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StorageService } from '../../services/storageService';
import {
  User,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Lock,
  LogOut,
  Trash2,
  Bell,
  CreditCard,
  KeyRound
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, navigate, addToast } = useApp();

  const [fullName, setFullName] = useState(currentUser?.fullName || 'Alex Rivera');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 349-2810');
  const [country, setCountry] = useState(currentUser?.country || 'United States');
  const [twoFactor, setTwoFactor] = useState(currentUser?.twoFactorEnabled ?? false);
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [savedPayPal, setSavedPayPal] = useState('alex.rivera@example.com');
  const [savedBankIban, setSavedBankIban] = useState('US89****4920');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      fullName,
      phone,
      country,
      twoFactorEnabled: twoFactor
    };
    StorageService.saveUser(updated);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your personal preferences have been saved.'
    });
  };

  const handleToggle2FA = () => {
    setTwoFactor(!twoFactor);
    addToast({
      type: 'info',
      title: 'Security Setting',
      message: !twoFactor ? 'Two-Factor Authentication (2FA) enabled.' : '2FA disabled.'
    });
  };

  const handleChangePassword = () => {
    addToast({
      type: 'success',
      title: 'Password Reset Dispatched',
      message: `A secure reset token has been dispatched to ${currentUser?.email}.`
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Account Profile & Security
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your contact credentials, payout configurations, and account security.
        </p>
      </div>

      {/* Verification Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Email Address</div>
            <div className="text-[11px] text-emerald-400 font-mono">Verified (Active)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Mobile Device</div>
            <div className="text-[11px] text-emerald-400 font-mono">Verified</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">KYC / Compliance</div>
            <div className="text-[11px] text-blue-400 font-mono">Tier 1 Certified</div>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
          Personal Details
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Username (Read-Only)</label>
              <input
                type="text"
                disabled
                value={`@${currentUser?.username || 'alex_r'}`}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/60 text-xs text-slate-500 font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email</label>
              <input
                type="email"
                disabled
                value={currentUser?.email || 'demo.user@example.com'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/60 text-xs text-slate-500 font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Payment Presets */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>Saved Payout Destinations</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1.5">Default PayPal Email</label>
            <input
              type="email"
              value={savedPayPal}
              onChange={(e) => setSavedPayPal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1.5">Bank Wire Account Mask</label>
            <input
              type="text"
              value={savedBankIban}
              onChange={(e) => setSavedBankIban(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Security & Danger Zone */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-purple-400" />
          <span>Security & Authentication</span>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-white">Two-Factor Authentication (2FA)</h4>
            <p className="text-[11px] text-slate-400">Require an authenticator code when requesting withdrawals.</p>
          </div>
          <button
            onClick={handleToggle2FA}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              twoFactor ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {twoFactor ? '2FA Enabled' : 'Enable 2FA'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-white">Account Password</h4>
            <p className="text-[11px] text-slate-400">Regularly update your credentials to safeguard pending rewards.</p>
          </div>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Change Password
          </button>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out Session</span>
          </button>

          <button
            onClick={() => addToast({ type: 'info', message: 'Demo mode: Account deletion disabled for persistent sample persona.' })}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

    </div>
  );
};
