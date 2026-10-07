import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Users,
  Briefcase,
  AlertTriangle
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const HelpFaqPage: React.FC = () => {
  const { navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq_01');

  const faqs: FaqItem[] = [
    {
      id: 'faq_01',
      category: 'Rewards',
      question: 'How do I earn rewards on EarnTask?',
      answer: 'You can earn rewards by watching up to 10 verified direct advertiser videos per day, answering post-video comprehension verification questions, completing market research surveys, testing websites, previewing apps, maintaining daily login streaks, and inviting friends via your 10% referral link.'
    },
    {
      id: 'faq_02',
      category: 'Rewards',
      question: 'Why is my reward pending?',
      answer: 'Sponsored video rewards credit to your available balance immediately upon verification. However, detailed surveys, app reviews, and multi-step tasks enter "Pending Verification" (usually 12-24 hours). This allows the campaign sponsor to verify that responses are genuine and free of spam before disbursing funds.'
    },
    {
      id: 'faq_03',
      category: 'Tasks',
      question: 'Why was my task rejected?',
      answer: 'Tasks are rejected if the sponsor’s verification system detects automated script submissions, invalid confirmation codes, rushed responses (violating human reading velocity), VPN/proxy spoofing, or failure to follow step-by-step instructions. Always provide honest and attentive engagement.'
    },
    {
      id: 'faq_04',
      category: 'Tasks',
      question: 'How many sponsored ads can I watch daily?',
      answer: 'You can watch up to 10 eligible sponsored promotional videos per calendar day. The limit resets at 00:00 UTC daily. This strict limit prevents engagement fatigue and maintains high advertising value for our sponsor brands.'
    },
    {
      id: 'faq_05',
      category: 'Withdrawals',
      question: 'What is the minimum withdrawal amount?',
      answer: 'The minimum withdrawal is $5.00 for PayPal, $10.00 for Mobile Wallets / USDC, and $15.00 for Direct Bank Transfers (ACH/SEPA). Each method has nominal gateway fees clearly displayed prior to confirmation.'
    },
    {
      id: 'faq_06',
      category: 'Withdrawals',
      question: 'Why is my withdrawal under review?',
      answer: 'Every payout request passes through automated compliance filters that check account velocity, device authenticity, and referral patterns. High-value requests or accounts with unusual activity undergo manual compliance review within 24 to 48 hours to protect the platform against fraud.'
    },
    {
      id: 'faq_07',
      category: 'Referrals',
      question: 'How do referrals work?',
      answer: 'Share your unique referral code or link. When your referred friends join and complete approved tasks, you receive a recurring 10% bonus calculated on their task earnings. Fraudulent self-referrals or device multi-accounting are strictly prohibited and result in permanent disqualification.'
    },
    {
      id: 'faq_08',
      category: 'Account',
      question: 'Why was my account restricted or banned?',
      answer: 'Accounts are restricted if our security algorithms detect bot networks, fake clicks, emulator farms, multiple accounts from one user, automated headless browsers, or repeated submission of fake proof. EarnTask maintains zero tolerance for fraudulent traffic.'
    },
    {
      id: 'faq_09',
      category: 'Advertiser Campaigns',
      question: 'How do advertisers launch campaigns?',
      answer: 'Advertisers can create campaigns via the Advertiser Portal. You define your goal, select the campaign type (Video, Survey, Website, App), set the user reward ($0.02 - $0.10+), and fund your campaign balance. All campaigns undergo compliance review before going live.'
    },
    {
      id: 'faq_10',
      category: 'Technical Problems',
      question: 'What should I do if a task or video freezes?',
      answer: 'Ensure you have an active internet connection and that aggressive third-party ad blockers are disabled for our domain, as ad blockers can mistakenly block legitimate video streams and script listeners. If the issue persists, click "Report Task" inside the task details.'
    }
  ];

  const categories = ['all', 'Rewards', 'Tasks', 'Withdrawals', 'Referrals', 'Account', 'Advertiser Campaigns', 'Technical Problems'];

  const filteredFaqs = faqs.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            Help Center & Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Everything you need to know about completing tasks, earning rewards, and requesting withdrawals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. daily limit, withdrawal, pending, bonus)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No answers found for "{searchQuery}". Try a different keyword or create a support ticket.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-sm font-semibold text-slate-100">
                        {faq.question}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still need help CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center space-y-3">
          <MessageSquare className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Can’t find what you’re looking for?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our support desk is available to assist with account compliance, transaction queries, and advertiser campaign reviews.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/support')}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
            >
              CREATE SUPPORT TICKET
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
