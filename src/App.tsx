/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { UserSidebar } from './components/layout/UserSidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { EarnMoneyPage } from './pages/public/EarnMoneyPage';
import { AdvertisePage } from './pages/public/AdvertisePage';
import { PricingPage } from './pages/public/PricingPage';
import { HelpFaqPage } from './pages/public/HelpFaqPage';
import { ContactPage } from './pages/public/ContactPage';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// User pages
import { UserDashboardPage } from './pages/user/UserDashboardPage';
import { WatchAdsPage } from './pages/user/WatchAdsPage';
import { EarnTasksPage } from './pages/user/EarnTasksPage';
import { WalletPage } from './pages/user/WalletPage';
import { WithdrawPage } from './pages/user/WithdrawPage';
import { ReferralsPage } from './pages/user/ReferralsPage';
import { BonusesPage } from './pages/user/BonusesPage';
import { LeaderboardPage } from './pages/user/LeaderboardPage';
import { ProfilePage } from './pages/user/ProfilePage';
import { SupportPage } from './pages/user/SupportPage';

// Portals
import { AdvertiserPortalPage } from './pages/advertiser/AdvertiserPortalPage';
import { AdminPortalPage } from './pages/admin/AdminPortalPage';

// Legal
import { LegalPages } from './pages/legal/LegalPages';

const MainRouter: React.FC = () => {
  const { currentPath } = useApp();

  const isUserArea = [
    '/dashboard',
    '/earn/ads',
    '/earn',
    '/wallet',
    '/wallet/withdraw',
    '/referrals',
    '/bonuses',
    '/leaderboard',
    '/profile',
    '/support',
    '/notifications'
  ].includes(currentPath);

  const renderCurrentView = () => {
    switch (currentPath) {
      // Public
      case '/home':
      case '/':
        return <HomePage />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/earn-money':
        return <EarnMoneyPage />;
      case '/advertise':
        return <AdvertisePage />;
      case '/pricing':
        return <PricingPage />;
      case '/help':
      case '/faq':
        return <HelpFaqPage />;
      case '/contact':
        return <ContactPage />;

      // Auth
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;

      // User Area
      case '/dashboard':
        return <UserDashboardPage />;
      case '/earn/ads':
        return <WatchAdsPage />;
      case '/earn':
        return <EarnTasksPage />;
      case '/wallet':
        return <WalletPage />;
      case '/wallet/withdraw':
        return <WithdrawPage />;
      case '/referrals':
        return <ReferralsPage />;
      case '/bonuses':
        return <BonusesPage />;
      case '/leaderboard':
        return <LeaderboardPage />;
      case '/profile':
        return <ProfilePage />;
      case '/support':
        return <SupportPage />;

      // Advertiser Portal
      case '/advertiser':
        return <AdvertiserPortalPage initialTab="dashboard" />;
      case '/advertiser/campaigns/create':
        return <AdvertiserPortalPage initialTab="create" />;

      // Admin Portal
      case '/admin':
      case '/admin/withdrawals':
      case '/admin/campaigns':
        return <AdminPortalPage />;

      // Legal Pages
      case '/terms':
        return <LegalPages initialTab="terms" />;
      case '/privacy':
        return <LegalPages initialTab="privacy" />;
      case '/reward-policy':
        return <LegalPages initialTab="reward-policy" />;
      case '/advertiser-policy':
        return <LegalPages initialTab="advertiser-policy" />;
      case '/acceptable-use':
        return <LegalPages initialTab="acceptable-use" />;
      case '/cookie-policy':
        return <LegalPages initialTab="cookie-policy" />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <DemoBanner />
      <Navbar />

      {isUserArea ? (
        <div className="flex-1 flex max-w-7xl w-full mx-auto pb-20 lg:pb-8">
          <UserSidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            {renderCurrentView()}
          </main>
          <MobileNav />
        </div>
      ) : (
        <main className="flex-1">
          {renderCurrentView()}
        </main>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
