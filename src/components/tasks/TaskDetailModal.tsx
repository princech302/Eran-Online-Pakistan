import React, { useState } from 'react';
import { GeneralTask } from '../../types';
import { ApiService } from '../../services/apiService';
import { useApp } from '../../context/AppContext';
import {
  X,
  Clock,
  Coins,
  CheckCircle2,
  ExternalLink,
  Flag,
  AlertCircle,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface TaskDetailModalProps {
  task: GeneralTask;
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onSubmitted
}) => {
  const { currentUser, refreshWallet, addToast } = useApp();

  const [proofInput, setProofInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isReported, setIsReported] = useState(false);

  if (!isOpen) return null;

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (task.requiresProof && proofInput.trim().length < 3) {
      setErrorMsg('Please enter valid completion proof (confirmation token, code, or summary).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await ApiService.submitTaskProof(
      currentUser.id,
      task.id,
      task.requiresProof ? proofInput : 'Self-verified checklist complete'
    );

    setIsSubmitting(false);

    if (res.success) {
      await refreshWallet();
      addToast({
        type: 'success',
        title: 'Task Submitted!',
        message: 'Reward added to your Pending Balance. Verification usually completes within 24 hours.'
      });
      onSubmitted();
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to submit proof. Please try again.');
    }
  };

  const handleReport = () => {
    setIsReported(true);
    addToast({
      type: 'info',
      title: 'Task Reported',
      message: 'Thank you for flagging. Our compliance team will audit this campaign.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {task.category} Task · Sponsored by {task.advertiserName}
            </div>
            <h3 className="text-base font-bold text-white">
              {task.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Reward</div>
              <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                ${task.rewardAmount.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Est. Time</div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{task.estimatedMinutes} mins</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Remaining Slots</div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5 font-mono">
                {task.availableSlots} available
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Overview
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Step-by-Step Instructions
            </h4>
            <ol className="space-y-2">
              {task.instructions.map((inst, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80"
                >
                  <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Requirements & Eligibility */}
          {task.requirements.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Eligibility Requirements
              </h4>
              <ul className="space-y-1">
                {task.requirements.map((req, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submission Form */}
          <form onSubmit={handleSubmitProof} className="pt-2 border-t border-slate-800 space-y-3">
            {task.requiresProof && (
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Proof of Completion / Confirmation Code
                </label>
                <input
                  type="text"
                  value={proofInput}
                  onChange={(e) => setProofInput(e.target.value)}
                  placeholder="e.g. TOKEN-9812-OK or confirmation summary"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Enter the confirmation token or response given upon finishing the sponsor activity.
                </span>
              </div>
            )}

            {errorMsg && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReport}
                disabled={isReported}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isReported ? 'Reported' : 'Report Task'}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit for Verification</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
