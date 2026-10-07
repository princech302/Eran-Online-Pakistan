import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, MessageSquare, Shield, Send, CheckCircle2, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate, addToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [department, setDepartment] = useState<'support' | 'advertiser' | 'compliance'>('support');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    addToast({
      type: 'success',
      title: 'Inquiry Transmitted',
      message: 'Your message has been dispatched to EarnTask platform operations.'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            Platform Inquiries & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Contact EarnTask
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Get in touch with our team regarding campaign sponsorships, user account inquiries, or compliance questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-center">
            <Mail className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">Member Support</h3>
            <p className="text-xs text-slate-400">Account questions, reward inquiries, and payout assistance.</p>
            <div className="text-xs font-mono text-emerald-400 pt-1">support@earntask.demo</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-center">
            <Building2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">Brand Advertisers</h3>
            <p className="text-xs text-slate-400">Custom enterprise sponsorships, survey panels, and volume pricing.</p>
            <div className="text-xs font-mono text-blue-400 pt-1">advertisers@earntask.demo</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-center">
            <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">Legal & Compliance</h3>
            <p className="text-xs text-slate-400">Terms of service, anti-fraud enforcement, and data privacy requests.</p>
            <div className="text-xs font-mono text-purple-400 pt-1">compliance@earntask.demo</div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 max-w-2xl mx-auto">
          {isSent ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for contacting EarnTask. Our desk aims to answer within 24 business hours.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-4 px-6 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="support">General Member Support</option>
                  <option value="advertiser">Advertiser Partnerships & Campaigns</option>
                  <option value="compliance">Compliance, Legal & Fraud Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry regarding..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry with relevant context..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
