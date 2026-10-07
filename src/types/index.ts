export type UserRole = 'user' | 'advertiser' | 'admin';

export type TaskCategory = 
  | 'video' 
  | 'survey' 
  | 'website' 
  | 'app' 
  | 'product' 
  | 'quiz' 
  | 'bonus';

export type TaskStatus = 'available' | 'in_progress' | 'pending_verification' | 'completed' | 'rejected';

export type WithdrawalStatus = 'pending' | 'under_review' | 'approved' | 'processing' | 'paid' | 'rejected';

export type CampaignStatus = 'pending_review' | 'active' | 'paused' | 'completed' | 'rejected' | 'terminated';

export type TransactionType = 'task_reward' | 'bonus' | 'referral_reward' | 'withdrawal' | 'adjustment' | 'advertiser_deposit' | 'campaign_spend';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  country: string;
  role: UserRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKycVerified: boolean;
  isBanned: boolean;
  isSuspended: boolean;
  avatarUrl?: string;
  referralCode: string;
  referredBy?: string;
  showOnLeaderboard: boolean;
  createdAt: string;
  twoFactorEnabled: boolean;
}

export interface Wallet {
  userId: string;
  availableBalance: number;
  pendingBalance: number;
  lifetimeEarnings: number;
  lifetimeWithdrawals: number;
  currency: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  referenceId?: string;
}

export interface SponsoredAdTask {
  id: string;
  campaignId: string;
  advertiserName: string;
  advertiserLogo?: string;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl: string;
  durationSeconds: number;
  rewardAmount: number;
  category: 'video';
  verificationQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  totalSlots: number;
  remainingSlots: number;
  targetAudience: string;
  createdAt: string;
}

export interface GeneralTask {
  id: string;
  campaignId: string;
  advertiserName: string;
  title: string;
  description: string;
  instructions: string[];
  category: TaskCategory;
  rewardAmount: number;
  estimatedMinutes: number;
  availableSlots: number;
  requirements: string[];
  targetCountry?: string;
  status: TaskStatus;
  externalUrl?: string;
  requiresProof: boolean;
  proofType?: 'text_code' | 'screenshot' | 'survey_submission';
}

export interface TaskCompletion {
  id: string;
  userId: string;
  taskId: string;
  taskTitle: string;
  advertiserName: string;
  category: TaskCategory;
  rewardAmount: number;
  completedAt: string;
  status: 'pending_verification' | 'approved' | 'rejected';
  rejectionReason?: string;
  proofSubmitted?: string;
}

export interface DailyAdProgress {
  userId: string;
  date: string; // YYYY-MM-DD
  completedCount: number; // Max 10
  earningsToday: number;
  completedTaskIds: string[];
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  fee: number;
  netAmount: number;
  paymentMethod: string;
  accountDetails: {
    accountNumber?: string;
    email?: string;
    bankName?: string;
    accountHolder?: string;
    routingNumber?: string;
  };
  status: WithdrawalStatus;
  requestedAt: string;
  updatedAt: string;
  riskScore: 'low' | 'medium' | 'high';
  riskReason?: string;
  adminNotes?: string;
  transactionHash?: string;
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  type: 'bank' | 'paypal' | 'mobile_wallet' | 'crypto';
  minWithdrawal: number;
  maxWithdrawal: number;
  feePercentage: number;
  feeFixed: number;
  estimatedHours: string;
  isEnabled: boolean;
  countriesSupported: string[];
  icon: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referredName: string;
  joinedDate: string;
  status: 'active' | 'pending_first_task';
  totalCommissionEarned: number;
  lastActive: string;
}

export interface DailyBonusState {
  currentStreak: number;
  lastClaimDate?: string;
  claimedDaysThisCycle: number[];
  streakBonusEligible: boolean;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  category: 'account' | 'tasks' | 'rewards' | 'withdrawals' | 'referrals' | 'advertiser' | 'technical';
  subject: string;
  status: 'open' | 'in_progress' | 'waiting_for_user' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: 'user' | 'support';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task_approved' | 'task_rejected' | 'reward_added' | 'withdrawal_requested' | 'withdrawal_approved' | 'withdrawal_paid' | 'campaign_update' | 'security_alert' | 'support_reply';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface AdvertiserCampaign {
  id: string;
  advertiserId: string;
  advertiserName: string;
  name: string;
  description: string;
  type: TaskCategory;
  landingUrl?: string;
  mediaUrl?: string;
  targetCountry: string;
  targetAudience: string;
  durationSeconds?: number;
  rewardPerCompletion: number;
  maxCompletions: number;
  userBudget: number;
  platformFee: number;
  totalBudget: number;
  spentBudget: number;
  completedCount: number;
  verifiedCount: number;
  rejectedCount: number;
  viewsCount: number;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  targetType: 'user' | 'campaign' | 'withdrawal' | 'settings' | 'wallet';
  targetId: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface FraudFlag {
  id: string;
  userId: string;
  userName: string;
  type: 'speed_completion' | 'ip_cluster' | 'device_reused' | 'duplicate_referral' | 'suspicious_withdrawal';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  detectedAt: string;
  status: 'pending_review' | 'resolved' | 'dismissed';
}

export interface PlatformSettings {
  dailyAdLimit: number;
  minWithdrawalDefault: number;
  platformFeePercent: number;
  referralCommissionPercent: number;
  demoModeNotice: boolean;
  requireEmailVerificationForPayout: boolean;
  maxDailyEarningsUsd: number;
}
