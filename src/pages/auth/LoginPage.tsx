import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApiService } from '../../services/apiService';
import { Coins, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate, addToast } = useApp();

  const [identifier, setIdentifier] = useState('demo.user@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await ApiService.loginUser(identifier);
    setLoading(false);

    if (res.success && res.data) {
      addToast({
        type: 'success',
        title: 'Welcome Back',
        message: `Signed in as ${res.data.fullName}`
      });

      if (res.data.role === 'admin') navigate('/admin');
      else if (res.data.role === 'advertiser') navigate('/advertiser');
      else navigate('/dashboard');
    } else {
      setError(res.error || 'Invalid credentials.');
    }
  };

  const handleQuickDemoFill = (email: string) => {
    setIdentifier(email);
    setPassword('demopassword123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        
        {/* Brand Icon */}
        <button
          onClick={() => navigate('/home')}
          className="inline-flex items-center gap-2 mb-4 group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-blue-900/30">
            <span className="font-extrabold text-xl tracking-tighter flex items-center">
              E<Coins className="w-4 h-4 -ml-0.5 text-emerald-300" />
            </span>
          </div>
          <span className="font-bold text-xl text-white tracking-tight">EarnTask</span>
        </button>

        <h2 className="text-2xl font-bold text-white tracking-tight">
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Enter your registered email or username to access your dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-8 space-y-6">
          
          {/* Quick Demo Switchers */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
              <span>Quick Demo Sign-In:</span>
              <span className="font-mono text-emerald-400">Pre-Configured</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('demo.user@example.com')}
                className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  identifier === 'demo.user@example.com'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('demo.advertiser@example.com')}
                className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  identifier === 'demo.advertiser@example.com'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Advertiser
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('demo.admin@example.com')}
                className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  identifier === 'demo.admin@example.com'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="demo.user@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => addToast({ type: 'info', message: 'Demo mode: Any password accepted for pre-seeded test accounts.' })}
                  className="text-[11px] text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-500 accent-emerald-500"
                />
                <span className="text-xs text-slate-400">Remember session</span>
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-400">Don't have an account yet? </span>
            <button
              onClick={() => navigate('/register')}
              className="text-xs text-emerald-400 font-semibold hover:underline"
            >
              Create Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
