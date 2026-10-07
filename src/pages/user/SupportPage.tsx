import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { SupportTicket } from '../../types';
import {
  LifeBuoy,
  Plus,
  MessageSquare,
  Clock,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { currentUser, addToast } = useApp();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTicketId, setActiveTicketId] = useState<string | null>('tkt_01');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New ticket state
  const [newCategory, setNewCategory] = useState<SupportTicket['category']>('tasks');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('medium');
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reply message
  const [replyInput, setReplyInput] = useState('');

  const loadTickets = async () => {
    if (!currentUser) return;
    const res = await ApiService.getSupportTickets(currentUser.id);
    if (res.success && res.data) {
      setTickets(res.data);
      if (res.data.length > 0 && !activeTicketId) {
        setActiveTicketId(res.data[0].id);
      }
    }
  };

  useEffect(() => {
    loadTickets();
  }, [currentUser]);

  const activeTicket = tickets.find(t => t.id === activeTicketId) || tickets[0];

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    const res = await ApiService.createSupportTicket({
      userId: currentUser.id,
      userName: currentUser.fullName,
      category: newCategory,
      subject: newSubject,
      priority: newPriority,
      message: newMessage
    });
    setIsSubmitting(false);

    if (res.success && res.data) {
      addToast({
        type: 'success',
        title: 'Support Ticket Opened',
        message: 'Your inquiry has been placed in the compliance support queue.'
      });
      setIsCreateModalOpen(false);
      setNewSubject('');
      setNewMessage('');
      await loadTickets();
      setActiveTicketId(res.data.id);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeTicket || !currentUser) return;

    await ApiService.replyToTicket(activeTicket.id, replyInput.trim(), 'user', currentUser.fullName);
    setReplyInput('');
    await loadTickets();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Support Desk & Resolution Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Need help with a task approval, payout status, or account setting? Open a ticket below.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </button>
      </div>

      {/* 2-Column Interface: Ticket List + Message Thread */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket List */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Your Active Tickets ({tickets.length})
          </div>

          <div className="space-y-2">
            {tickets.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No tickets open. Click New Support Ticket to create one.
              </div>
            ) : (
              tickets.map((t) => {
                const isSelected = activeTicket?.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTicketId(t.id)}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-blue-400 uppercase font-semibold">{t.category}</span>
                      <span className={`px-2 py-0.5 rounded uppercase font-bold ${
                        t.status === 'resolved'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950/60 text-amber-400 border border-amber-800'
                      }`}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-100 truncate mb-1">
                      {t.subject}
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(t.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between min-h-[460px]">
          {activeTicket ? (
            <div className="flex flex-col h-full justify-between space-y-4">
              
              {/* Ticket Top bar */}
              <div className="pb-4 border-b border-slate-800 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <span>Ticket #{activeTicket.id}</span>
                    <span>·</span>
                    <span className="text-blue-400 uppercase">{activeTicket.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {activeTicket.subject}
                  </h3>
                </div>

                <span className={`text-[11px] font-mono px-2.5 py-1 rounded font-bold uppercase ${
                  activeTicket.status === 'resolved'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {activeTicket.status.replace('_', ' ')}
                </span>
              </div>

              {/* Messages list */}
              <div className="flex-1 overflow-y-auto space-y-4 py-3 max-h-[360px] pr-2">
                {activeTicket.messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1">
                        <span>{msg.senderName}</span>
                        <span>·</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-xs max-w-md leading-relaxed ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Form */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Type your response to support..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!replyInput.trim()}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400">
              <LifeBuoy className="w-8 h-8 text-slate-600 mb-2" />
              <span>Select a ticket to view messages</span>
            </div>
          )}
        </div>

      </div>

      {/* New Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Open Support Ticket</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="tasks">Task Approval / Rejection</option>
                    <option value="rewards">Pending Rewards</option>
                    <option value="withdrawals">Withdrawals & Payouts</option>
                    <option value="referrals">Referral Commission</option>
                    <option value="account">Account Access / KYC</option>
                    <option value="technical">Technical Issues</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="low">Standard (Low)</option>
                    <option value="medium">Medium</option>
                    <option value="high">Urgent (High)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Summary of issue..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Details & Evidence</label>
                <textarea
                  required
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Provide task IDs, sponsor names, or error messages..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                >
                  {isSubmitting ? 'Opening Ticket...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
