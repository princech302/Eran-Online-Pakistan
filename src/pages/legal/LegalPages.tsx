import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, FileText, Lock, AlertTriangle, CheckCircle, Scale } from 'lucide-react';

export const LegalPages: React.FC<{ initialTab?: string }> = ({ initialTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    { id: 'terms', label: 'Terms of Service' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'reward-policy', label: 'Reward & Payout Policy' },
    { id: 'advertiser-policy', label: 'Advertiser Policy' },
    { id: 'acceptable-use', label: 'Acceptable Use' },
    { id: 'cookie-policy', label: 'Cookie Policy' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Compliance & Regulatory Framework</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Policies & Legal Standards
          </h1>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            These documents govern participation, task verification, brand advertising, and user payout rules on EarnTask.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center gap-2 flex-wrap border-b border-slate-800 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Important Legal Disclaimer:</strong> The policies presented below represent standard operating conditions for the EarnTask marketplace. Rewards depend entirely on active advertiser campaigns and task eligibility. Rewards are not guaranteed income. Fraudulent manipulation or multi-accounting results in immediate forfeiture.
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-8 text-xs text-slate-300 leading-relaxed">
          
          {/* TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Terms of Service
              </h2>
              <p><strong>Effective Date:</strong> January 1, 2026 · Last Revised: October 2026</p>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">1. Agreement to Terms</h3>
                <p>
                  By registering an account, accessing, or using the EarnTask platform, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not access or use the platform.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">2. Eligibility & Single Account Rule</h3>
                <p>
                  You must be at least 18 years of age (or the age of majority in your jurisdiction) to participate. Each user is strictly permitted only one (1) account. Registering duplicate accounts, using false identities, or attempting to refer oneself is a material breach resulting in immediate termination and balance forfeiture.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">3. Nature of Rewards</h3>
                <p>
                  EarnTask is a promotional rewards platform, not an employer, banking entity, or financial investment vehicle. Rewards represent discretionary micro-incentives provided by third-party brand sponsors for genuine consumer attention and completed actions. There is no guaranteed income, minimum earnings volume, or perpetual availability of tasks.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">4. Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by applicable law, EarnTask shall not be liable for any indirect, incidental, punitive, or consequential damages arising out of the use or inability to use the platform.
                </p>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Privacy Policy
              </h2>
              <p><strong>Effective Date:</strong> January 1, 2026</p>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">1. Information We Collect</h3>
                <p>
                  We collect account registration data (name, email address, country, optional phone number for 2FA), telemetry signals necessary to detect fraud (hashed device fingerprint, browser client, IP subnet), and task completion timestamps.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">2. Use of Information</h3>
                <p>
                  Your information is utilized solely to: (a) operate and maintain your wallet balance, (b) disburse requested payouts, (c) verify genuine attention against automated bot networks, and (d) comply with legal anti-money laundering regulations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">3. Third-Party Sharing</h3>
                <p>
                  We do not sell personal contact lists. Advertisers receive anonymized aggregated reporting (such as total verified completions and retention rates) and do not receive your personal payment or contact information without explicit opt-in consent.
                </p>
              </div>
            </div>
          )}

          {/* REWARD & PAYOUT POLICY */}
          {activeTab === 'reward-policy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Reward & Payout Policy
              </h2>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">1. Available vs. Pending Balances</h3>
                <p>
                  Immediate tasks (such as direct video watch tasks) are credited directly to your Available Balance. Extended research questionnaires, app tests, and high-value brand campaigns are credited as "Pending Rewards" and cleared within 24–48 hours following sponsor audit.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">2. Daily Video Task Quota</h3>
                <p>
                  Members are allocated a strict maximum of 10 sponsored video completions per calendar day. This cap resets at 00:00 UTC. Any attempt to bypass this quota via automated tools or proxies will be rejected.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">3. Minimum Withdrawal Thresholds</h3>
                <p>
                  Withdrawals may be requested upon reaching $5.00 for PayPal, $10.00 for Mobile Wallets / USDC, and $15.00 for Direct Bank Transfers. Standard processing times range between 12 to 48 hours. Demo mode displays simulated payouts.
                </p>
              </div>
            </div>
          )}

          {/* ADVERTISER POLICY */}
          {activeTab === 'advertiser-policy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Advertiser Policy & Standards
              </h2>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">1. Prohibited Campaign Content</h3>
                <p>
                  Campaigns must NOT contain or promote: (a) malicious software, spyware, or phishing links, (b) illegal goods, (c) predatory financial scams or unregistered investments, (d) deceptive adult content, or (e) hate speech. All campaigns are pre-screened by our compliance team.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">2. Real Human Verification</h3>
                <p>
                  We guarantee that impressions delivered through EarnTask reflect active, genuine human observation. We do not operate synthetic traffic or artificial view simulators.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">3. Platform Fees & Refunds</h3>
                <p>
                  A standard 20% platform management fee applies to user reward budgets. Unspent campaign budget balances can be paused or refunded to your advertiser wallet balance at any time.
                </p>
              </div>
            </div>
          )}

          {/* ACCEPTABLE USE */}
          {activeTab === 'acceptable-use' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Acceptable Use Policy
              </h2>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">1. Zero Tolerance for Automation</h3>
                <p>
                  Users may not use headless browsers, automated scripts, bots, click macros, emulators, or multi-tab simulators. Doing so results in permanent termination of all linked accounts.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-100">2. No AdSense / Third-Party Ad Manipulation</h3>
                <p>
                  EarnTask exclusively hosts direct brand promotional campaigns. Users are never rewarded for clicking external third-party ad networks or Google AdSense. Any attempt to connect third-party ad networks as rewarded tasks is strictly prohibited.
                </p>
              </div>
            </div>
          )}

          {/* COOKIE POLICY */}
          {activeTab === 'cookie-policy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Cookie Policy
              </h2>
              <p>
                We use strictly essential local storage and session tokens to preserve authentication state, track active daily ad completion limits, and calculate accurate rewards. We do not deploy intrusive third-party cross-site behavioral tracking cookies.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
