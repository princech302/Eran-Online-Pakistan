import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck, Briefcase, RefreshCw, AlertTriangle } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentUser, switchRole, resetDemoData } = useApp();

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            DEMO MODE
          </span>
          <span className="hidden sm:inline text-slate-400">
            Simulated balances & payouts. Real payment processing APIs can be connected via the payment gateway abstraction.
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Switch Persona:</span>
          
          <button
            onClick={() => switchRole('user')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              currentUser?.role === 'user'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title="demo.user@example.com (Alex Rivera)"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>User</span>
          </button>

          <button
            onClick={() => switchRole('advertiser')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              currentUser?.role === 'advertiser'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title="demo.advertiser@example.com (Nexus Brands)"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Advertiser</span>
          </button>

          <button
            onClick={() => switchRole('admin')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              currentUser?.role === 'admin'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title="demo.admin@example.com (Compliance Operations)"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={resetDemoData}
            className="text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800 rounded transition-colors ml-1"
            title="Reset simulated storage"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
