import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { GeneralTask, TaskCategory } from '../../types';
import { TaskDetailModal } from '../../components/tasks/TaskDetailModal';
import {
  FileCheck,
  Globe,
  Smartphone,
  ShoppingBag,
  HelpCircle,
  Gift,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  ShieldCheck,
  PlayCircle
} from 'lucide-react';

export const EarnTasksPage: React.FC = () => {
  const { navigate, refreshWallet } = useApp();

  const [tasks, setTasks] = useState<GeneralTask[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTask, setActiveTask] = useState<GeneralTask | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await ApiService.getGeneralTasks();
      if (res.success && res.data) {
        setTasks(res.data);
      }
    };
    load();
  }, []);

  const categories = [
    { id: 'all', label: 'All Tasks', icon: Filter },
    { id: 'survey', label: 'Surveys', icon: FileCheck },
    { id: 'website', label: 'Website Visits', icon: Globe },
    { id: 'app', label: 'App Promotion', icon: Smartphone },
    { id: 'product', label: 'Product Discovery', icon: ShoppingBag },
    { id: 'quiz', label: 'Learn & Answer', icon: HelpCircle },
    { id: 'bonus', label: 'Bonus Tasks', icon: Gift },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verified Earning Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete partner surveys, test web apps, and discover new products.
          </p>
        </div>

        {/* Quick link to Watch Ads */}
        <button
          onClick={() => navigate('/earn/ads')}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Switch to Watch Ads (10/day)</span>
        </button>
      </div>

      {/* Categories Segmented Control */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-md flex flex-col justify-between transition-all"
          >
            <div>
              {/* Category & Reward Header */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono text-[10px] text-blue-400 uppercase font-semibold">
                  {task.category} · {task.advertiserName}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-900/60">
                  +${task.rewardAmount.toFixed(2)}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                {task.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {task.description}
              </p>

              {/* Details & Requirements */}
              <div className="space-y-1.5 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Est. Time:</span>
                  </span>
                  <span className="font-semibold text-slate-200">{task.estimatedMinutes} mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Available Quota:</span>
                  <span className="font-mono text-slate-200">{task.availableSlots} slots</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <button
                onClick={() => setActiveTask(task)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Start Task</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Box */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          Completed tasks enter <strong>Pending Verification</strong> for up to 24 hours so sponsor brand managers can verify non-bot compliance. Once approved, the reward is transferred to your Available Balance.
        </div>
      </div>

      {/* Task Modal */}
      {activeTask && (
        <TaskDetailModal
          task={activeTask}
          isOpen={true}
          onClose={() => setActiveTask(null)}
          onSubmitted={() => {
            refreshWallet();
          }}
        />
      )}

    </div>
  );
};
