import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Wallet, UserRole, NotificationItem } from '../types';
import { ApiService } from '../services/apiService';
import { StorageService } from '../services/storageService';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  wallet: Wallet | null;
  currentPath: string;
  navigate: (path: string) => void;
  switchRole: (role: UserRole) => Promise<void>;
  refreshWallet: () => Promise<void>;
  dailyAdsCount: number;
  dailyAdsRemaining: number;
  dailyAdsEarnings: number;
  refreshDailyAds: () => Promise<void>;
  toasts: ToastMessage[];
  addToast: (msg: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsRead: () => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('/home');
  const [dailyAdsCount, setDailyAdsCount] = useState<number>(3);
  const [dailyAdsRemaining, setDailyAdsRemaining] = useState<number>(7);
  const [dailyAdsEarnings, setDailyAdsEarnings] = useState<number>(0.075);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Toast handler
  const addToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { ...msg, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Navigation with browser URL sync (hash or pushState fallback)
  const navigate = useCallback((path: string) => {
    setCurrentPath(path);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to browser hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/home';
      setCurrentPath(hash);
    };

    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const refreshWallet = useCallback(async () => {
    if (!currentUser) return;
    const res = await ApiService.getWallet(currentUser.id);
    if (res.success && res.data) {
      setWallet(res.data);
    }
  }, [currentUser]);

  const refreshDailyAds = useCallback(async () => {
    if (!currentUser) return;
    const res = await ApiService.getDailyAdProgress(currentUser.id);
    if (res.success && res.data) {
      setDailyAdsCount(res.data.completedCount);
      setDailyAdsRemaining(res.data.remainingCount);
      setDailyAdsEarnings(res.data.earningsToday);
    }
  }, [currentUser]);

  // Load user on startup
  useEffect(() => {
    const loadInit = async () => {
      StorageService.initData();
      const userRes = await ApiService.getCurrentUser();
      if (userRes.success && userRes.data) {
        setCurrentUser(userRes.data);
        const wRes = await ApiService.getWallet(userRes.data.id);
        if (wRes.success && wRes.data) setWallet(wRes.data);
        
        const progRes = await ApiService.getDailyAdProgress(userRes.data.id);
        if (progRes.success && progRes.data) {
          setDailyAdsCount(progRes.data.completedCount);
          setDailyAdsRemaining(progRes.data.remainingCount);
          setDailyAdsEarnings(progRes.data.earningsToday);
        }
      }
    };
    loadInit();
  }, []);

  const switchRole = useCallback(async (role: UserRole) => {
    const res = await ApiService.switchDemoRole(role);
    if (res.success && res.data) {
      setCurrentUser(res.data);
      const wRes = await ApiService.getWallet(res.data.id);
      if (wRes.success && wRes.data) setWallet(wRes.data);

      const progRes = await ApiService.getDailyAdProgress(res.data.id);
      if (progRes.success && progRes.data) {
        setDailyAdsCount(progRes.data.completedCount);
        setDailyAdsRemaining(progRes.data.remainingCount);
        setDailyAdsEarnings(progRes.data.earningsToday);
      }

      addToast({
        type: 'info',
        title: 'Switched Role',
        message: `Now viewing as ${role === 'user' ? 'Member (Alex Rivera)' : role === 'advertiser' ? 'Advertiser (Nexus Brands)' : 'Platform Compliance Admin'}`
      });

      // Auto redirect to appropriate area
      if (role === 'admin') navigate('/admin');
      else if (role === 'advertiser') navigate('/advertiser');
      else navigate('/dashboard');
    }
  }, [addToast, navigate]);

  const markNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const resetDemoData = useCallback(() => {
    StorageService.resetToDefaults();
    window.location.reload();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        wallet,
        currentPath,
        navigate,
        switchRole,
        refreshWallet,
        dailyAdsCount,
        dailyAdsRemaining,
        dailyAdsEarnings,
        refreshDailyAds,
        toasts,
        addToast,
        removeToast,
        notifications,
        unreadNotificationCount,
        markNotificationsRead,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
