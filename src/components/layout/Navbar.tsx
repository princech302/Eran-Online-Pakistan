import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Coins,
  PlayCircle,
  Wallet as WalletIcon,
  Bell,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Shield,
  Briefcase
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    wallet,
    currentPath,
    navigate,
    dailyAdsRemaining,
    unreadNotificationCount
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isPublicPage = [
    '/home',
    '/how-it-works',
    '/earn-money',
    '/advertise',
    '/pricing',
    '/help',
    '/faq',
    '/contact',
    '/terms',
    '/privacy',
    '/reward-policy',
    '/advertiser-policy'
  ].includes(currentPath);

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Earn Money', path: '/earn-money' },
    { label: 'Advertise', path: '/advertise' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Help & FAQ', path: '/help' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-white text-xl tracking-tighter flex items-center">
                  E<Coins className="w-4 h-4 -ml-0.5 text-emerald-300" />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-100 tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                  EarnTask
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Verified Rewards
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-sm font-medium transition-colors ${
                    currentPath === item.path
                      ? 'text-emerald-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Header Section */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Watch Ads Quick CTA */}
                <button
                  onClick={() => navigate('/earn/ads')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
                  title="Daily Sponsored Video Ads"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-400" />
                  <span>Watch Ads</span>
                  <span className="ml-1 text-[11px] bg-emerald-950 px-1.5 py-0.2 rounded text-emerald-300 border border-emerald-800">
                    {dailyAdsRemaining} left
                  </span>
                </button>

                {/* Balance Card Widget */}
                <button
                  onClick={() => navigate('/wallet')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <WalletIcon className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 leading-none">Available</div>
                    <div className="text-xs font-bold text-slate-100 font-mono">
                      ${wallet?.availableBalance.toFixed(2) || '0.00'}
                    </div>
                  </div>
                </button>

                {/* Notifications */}
                <button
                  onClick={() => navigate('/notifications')}
                  className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
                  )}
                </button>

                {/* Role Portal Buttons */}
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-purple-900/40 text-purple-300 border border-purple-700/50 hover:bg-purple-900/60 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin
                  </button>
                )}

                {currentUser.role === 'advertiser' && (
                  <button
                    onClick={() => navigate('/advertiser')}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-blue-900/40 text-blue-300 border border-blue-700/50 hover:bg-blue-900/60 transition-colors"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Portal
                  </button>
                )}

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg hover:bg-slate-800/80 transition-colors text-left"
                  >
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div className="hidden xl:block">
                      <div className="text-xs font-semibold text-slate-200 leading-tight">
                        {currentUser.fullName}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        {currentUser.role}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1 text-xs z-50 animate-fade-in"
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate(currentUser.role === 'advertiser' ? '/advertiser' : currentUser.role === 'admin' ? '/admin' : '/dashboard');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                        Account Settings
                      </button>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/support');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                      >
                        Support Center
                      </button>
                      <div className="h-px bg-slate-800 my-1" />
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-rose-950/40 text-rose-300 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={() => navigate('/wallet')}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 font-bold"
              >
                ${wallet?.availableBalance.toFixed(2) || '0.00'}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(item.path);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              {item.label}
            </button>
          ))}

          <div className="border-t border-slate-800 pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/earn/ads');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 font-medium"
            >
              <PlayCircle className="w-4 h-4" />
              Watch Ads & Earn ({dailyAdsRemaining} left)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(currentUser?.role === 'advertiser' ? '/advertiser' : currentUser?.role === 'admin' ? '/admin' : '/dashboard');
              }}
              className="w-full text-center py-2 rounded-lg text-xs font-medium bg-slate-800 text-slate-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
