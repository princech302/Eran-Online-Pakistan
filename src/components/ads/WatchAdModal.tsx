import React, { useState, useEffect, useRef } from 'react';
import { SponsoredAdTask } from '../../types';
import { ApiService } from '../../services/apiService';
import { useApp } from '../../context/AppContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

interface WatchAdModalProps {
  adTask: SponsoredAdTask;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (reward: number) => void;
}

export const WatchAdModal: React.FC<WatchAdModalProps> = ({
  adTask,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { currentUser, refreshWallet, refreshDailyAds, addToast } = useApp();

  // Playback & timer state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const duration = adTask.durationSeconds;
  const progressPercent = Math.min(100, Math.floor((elapsedSeconds / duration) * 100));
  const remainingSeconds = Math.max(0, duration - elapsedSeconds);

  // Timer loop
  useEffect(() => {
    if (!isOpen || isFinished || !isPlaying) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev + 1 >= duration) {
          clearInterval(interval);
          setIsFinished(true);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, isFinished, duration]);

  // Reset when opening modal with new task
  useEffect(() => {
    if (isOpen) {
      setElapsedSeconds(0);
      setIsFinished(false);
      setIsPlaying(true);
      setSelectedAnswer(null);
      setVerificationError(null);
      setIsSubmitting(false);
    }
  }, [isOpen, adTask.id]);

  if (!isOpen) return null;

  const handleVerify = async () => {
    if (selectedAnswer === null) {
      setVerificationError('Please select an answer to verify attention.');
      return;
    }

    if (!currentUser) {
      setVerificationError('Please sign in to earn rewards.');
      return;
    }

    setIsSubmitting(true);
    setVerificationError(null);

    const res = await ApiService.verifyAndCreditSponsoredAd(
      currentUser.id,
      adTask.id,
      selectedAnswer
    );

    setIsSubmitting(false);

    if (res.success && res.data) {
      await refreshWallet();
      await refreshDailyAds();
      addToast({
        type: 'success',
        title: 'Promotion Completed!',
        message: `+${res.data.rewardCredited.toFixed(3)} credited to your wallet.`
      });
      onSuccess(res.data.rewardCredited);
      onClose();
    } else {
      setVerificationError(res.error || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Direct Advertiser Promotion
              </div>
              <h3 className="text-sm font-bold text-white">
                {adTask.advertiserName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Reward: +${adTask.rewardAmount.toFixed(3)}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video / Creative Simulation Canvas */}
        <div className="relative bg-slate-950 aspect-video flex flex-col justify-between overflow-hidden group select-none">
          {/* Background image & aesthetic video visualizer */}
          <div className="absolute inset-0">
            <img
              src={adTask.thumbnailUrl}
              alt={adTask.title}
              className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          {/* Simulated Brand Broadcast Overlay */}
          <div className="relative z-10 p-6 flex items-start justify-between">
            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-medium text-slate-200 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Brand Showcase</span>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{remainingSeconds}s remaining</span>
            </div>
          </div>

          {/* Central Message Highlight */}
          <div className="relative z-10 p-6 max-w-lg">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2 drop-shadow-md">
              {adTask.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 drop-shadow">
              {adTask.description}
            </p>
          </div>

          {/* Video Player Controls & Progress Bar */}
          <div className="relative z-10 bg-gradient-to-t from-slate-950 to-transparent p-4 pt-8">
            
            {/* Real Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 hover:text-white transition-colors"
                  disabled={isFinished}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px] text-slate-400">
                  00:{elapsedSeconds.toString().padStart(2, '0')} / 00:{duration.toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Anti-skip active: Must watch until completion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Video Verification Section */}
        <div className="p-6 bg-slate-900 overflow-y-auto">
          {!isFinished ? (
            <div className="flex flex-col items-center justify-center text-center py-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <h4 className="text-sm font-semibold text-slate-200">
                Watching Promotion ({remainingSeconds}s remaining)
              </h4>
              <p className="text-xs text-slate-400 max-w-sm">
                To guarantee genuine advertiser value and prevent bot clicks, the verification quiz unlocks when the video ends.
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    Attention Verification
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Select correct answer to claim reward
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-100 mb-3">
                  {adTask.verificationQuestion.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {adTask.verificationQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedAnswer(idx);
                        setVerificationError(null);
                      }}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                        selectedAnswer === idx
                          ? 'bg-blue-600/10 border-blue-500 text-white font-medium shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border text-[10px] flex items-center justify-center shrink-0 mt-0.5 ${
                        selectedAnswer === idx
                          ? 'border-blue-400 bg-blue-500 text-slate-950 font-bold'
                          : 'border-slate-600 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {verificationError && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 p-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{verificationError}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-400">
                  Fair play rules apply. One reward per campaign daily.
                </div>

                <button
                  onClick={handleVerify}
                  disabled={isSubmitting || selectedAnswer === null}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    selectedAnswer !== null && !isSubmitting
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Verifying on server...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Claim ${adTask.rewardAmount.toFixed(3)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
