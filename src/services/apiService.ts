import {
  User,
  Wallet,
  Transaction,
  SponsoredAdTask,
  GeneralTask,
  WithdrawalRequest,
  PaymentMethodOption,
  Referral,
  DailyBonusState,
  SupportTicket,
  AdvertiserCampaign,
  PlatformSettings,
  FraudFlag,
  AdminAuditLog
} from '../types';
import { StorageService } from './storageService';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
}

/**
 * ApiService simulates REST/API communication with backend architecture.
 * Ready to be swapped with axios/fetch calls to Node/Express/Firestore backend.
 */
export class ApiService {
  private static async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Auth & Session
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    await this.delay(100);
    const user = StorageService.getCurrentUser();
    return { success: true, data: user };
  }

  static async switchDemoRole(role: 'user' | 'advertiser' | 'admin'): Promise<ApiResponse<User>> {
    await this.delay(150);
    const user = StorageService.switchDemoRole(role);
    return { success: true, data: user, message: `Switched active profile to ${role.toUpperCase()}` };
  }

  static async registerUser(formData: {
    fullName: string;
    username: string;
    email: string;
    phone?: string;
    country: string;
    referralCode?: string;
  }): Promise<ApiResponse<User>> {
    await this.delay(400);

    // Validation
    if (!formData.fullName || !formData.email || !formData.username) {
      return { success: false, error: 'Full name, email, and username are required.' };
    }

    const users = StorageService.getUsers();
    if (users.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    if (users.some(u => u.username.toLowerCase() === formData.username.toLowerCase())) {
      return { success: false, error: 'This username is already taken.' };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || '',
      country: formData.country || 'United States',
      role: 'user',
      isEmailVerified: true,
      isPhoneVerified: false,
      isKycVerified: false,
      isBanned: false,
      isSuspended: false,
      referralCode: `EARN-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      referredBy: formData.referralCode?.trim() || undefined,
      showOnLeaderboard: true,
      createdAt: new Date().toISOString(),
      twoFactorEnabled: false
    };

    StorageService.saveUser(newUser);
    StorageService.setCurrentUser(newUser);

    // Initialize initial wallet
    StorageService.getWallet(newUser.id);

    return { success: true, data: newUser, message: 'Account registered successfully!' };
  }

  static async loginUser(emailOrUsername: string): Promise<ApiResponse<User>> {
    await this.delay(350);
    const users = StorageService.getUsers();
    const query = emailOrUsername.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === query || u.username.toLowerCase() === query);

    if (!found) {
      return { success: false, error: 'No account found with provided credentials.' };
    }

    if (found.isBanned) {
      return { success: false, error: 'This account has been terminated due to policy violations.' };
    }

    StorageService.setCurrentUser(found);
    return { success: true, data: found, message: 'Signed in successfully.' };
  }

  // Wallet
  static async getWallet(userId: string): Promise<ApiResponse<Wallet>> {
    await this.delay(100);
    const wallet = StorageService.getWallet(userId);
    return { success: true, data: wallet };
  }

  static async getTransactions(userId?: string): Promise<ApiResponse<Transaction[]>> {
    await this.delay(150);
    const txs = StorageService.getTransactions(userId);
    return { success: true, data: txs };
  }

  // Sponsored Ads Watch & Earn
  static async getSponsoredAds(): Promise<ApiResponse<SponsoredAdTask[]>> {
    await this.delay(150);
    const ads = StorageService.getSponsoredAds();
    return { success: true, data: ads };
  }

  static async getDailyAdProgress(userId: string): Promise<ApiResponse<{
    date: string;
    completedCount: number;
    maxDaily: number;
    earningsToday: number;
    completedTaskIds: string[];
    remainingCount: number;
  }>> {
    await this.delay(100);
    const progress = StorageService.getDailyAdProgress(userId);
    const settings = StorageService.getSettings();
    const remainingCount = Math.max(0, settings.dailyAdLimit - progress.completedCount);

    return {
      success: true,
      data: {
        ...progress,
        maxDaily: settings.dailyAdLimit,
        remainingCount
      }
    };
  }

  static async verifyAndCreditSponsoredAd(
    userId: string,
    adId: string,
    verificationAnswerIndex: number
  ): Promise<ApiResponse<{ rewardCredited: number; newBalance: number; countToday: number }>> {
    await this.delay(500); // Simulate server-side fraud check & latency

    const ads = StorageService.getSponsoredAds();
    const targetAd = ads.find(a => a.id === adId);

    if (!targetAd) {
      return { success: false, error: 'Campaign not found or has expired.' };
    }

    // Verify campaign question
    if (verificationAnswerIndex !== targetAd.verificationQuestion.correctIndex) {
      return {
        success: false,
        error: 'Incorrect campaign verification response. Please pay attention to the sponsored message.'
      };
    }

    const result = StorageService.recordAdCompletion(userId, targetAd);
    if (!result.success) {
      return { success: false, error: result.message };
    }

    const updatedWallet = StorageService.getWallet(userId);
    return {
      success: true,
      message: result.message,
      data: {
        rewardCredited: result.reward,
        newBalance: updatedWallet.availableBalance,
        countToday: result.progress.completedCount
      }
    };
  }

  // General Tasks
  static async getGeneralTasks(): Promise<ApiResponse<GeneralTask[]>> {
    await this.delay(150);
    const tasks = StorageService.getGeneralTasks();
    return { success: true, data: tasks };
  }

  static async submitTaskProof(
    userId: string,
    taskId: string,
    proofContent: string
  ): Promise<ApiResponse<{ status: 'pending_verification'; reward: number }>> {
    await this.delay(400);

    const tasks = StorageService.getGeneralTasks();
    const target = tasks.find(t => t.id === taskId);
    if (!target) {
      return { success: false, error: 'Task not found.' };
    }

    if (proofContent.trim().length < 3) {
      return { success: false, error: 'Please enter a valid proof confirmation code.' };
    }

    // Move to Pending Rewards (not instantly credited until verified)
    StorageService.updateWallet(userId, w => ({
      ...w,
      pendingBalance: Number((w.pendingBalance + target.rewardAmount).toFixed(2))
    }));

    StorageService.recordTaskCompletion({
      id: `tc_${Date.now()}`,
      userId,
      taskId: target.id,
      taskTitle: target.title,
      advertiserName: target.advertiserName,
      category: target.category,
      rewardAmount: target.rewardAmount,
      completedAt: new Date().toISOString(),
      status: 'pending_verification',
      proofSubmitted: proofContent.trim()
    });

    return {
      success: true,
      data: {
        status: 'pending_verification',
        reward: target.rewardAmount
      },
      message: 'Task proof submitted. Status is now Pending Verification.'
    };
  }

  // Withdrawals
  static async getWithdrawalMethods(): Promise<ApiResponse<PaymentMethodOption[]>> {
    await this.delay(100);
    const methods = StorageService.getPaymentMethods();
    return { success: true, data: methods.filter(m => m.isEnabled) };
  }

  static async getWithdrawals(userId?: string): Promise<ApiResponse<WithdrawalRequest[]>> {
    await this.delay(150);
    const withdrawals = StorageService.getWithdrawals(userId);
    return { success: true, data: withdrawals };
  }

  static async requestWithdrawal(params: {
    userId: string;
    amount: number;
    paymentMethodId: string;
    accountDetails: Record<string, string>;
  }): Promise<ApiResponse<WithdrawalRequest>> {
    await this.delay(500);

    const user = StorageService.getCurrentUser();
    const methods = StorageService.getPaymentMethods();
    const method = methods.find(m => m.id === params.paymentMethodId);

    if (!method) {
      return { success: false, error: 'Selected payment method is currently unavailable.' };
    }

    if (params.amount < method.minWithdrawal) {
      return { success: false, error: `Minimum withdrawal for ${method.name} is $${method.minWithdrawal.toFixed(2)}.` };
    }

    if (params.amount > method.maxWithdrawal) {
      return { success: false, error: `Maximum withdrawal limit is $${method.maxWithdrawal.toFixed(2)}.` };
    }

    const wallet = StorageService.getWallet(params.userId);
    if (wallet.availableBalance < params.amount) {
      return { success: false, error: 'Insufficient available balance.' };
    }

    // Fee calculation
    const calculatedFee = Number(((params.amount * (method.feePercentage / 100)) + method.feeFixed).toFixed(2));
    const netAmount = Number((params.amount - calculatedFee).toFixed(2));

    const result = StorageService.createWithdrawalRequest({
      userId: params.userId,
      userName: user.fullName,
      userEmail: user.email,
      amount: params.amount,
      fee: calculatedFee,
      netAmount,
      paymentMethod: method.name,
      accountDetails: params.accountDetails
    });

    if (!result.success || !result.withdrawal) {
      return { success: false, error: result.message };
    }

    return {
      success: true,
      data: result.withdrawal,
      message: 'Withdrawal request submitted! It will undergo standard compliance verification.'
    };
  }

  // Referrals
  static async getReferrals(userId: string): Promise<ApiResponse<Referral[]>> {
    await this.delay(150);
    const list = StorageService.getReferrals(userId);
    return { success: true, data: list };
  }

  // Daily Bonus
  static async getDailyBonus(): Promise<ApiResponse<DailyBonusState>> {
    await this.delay(100);
    const state = StorageService.getDailyBonus();
    return { success: true, data: state };
  }

  static async claimDailyBonus(userId: string): Promise<ApiResponse<{ amount: number; streak: number }>> {
    await this.delay(300);
    const res = StorageService.claimDailyBonus(userId);
    if (!res.success) {
      return { success: false, error: res.message };
    }
    return {
      success: true,
      message: res.message,
      data: { amount: res.amount, streak: res.streak }
    };
  }

  // Support
  static async getSupportTickets(userId?: string): Promise<ApiResponse<SupportTicket[]>> {
    await this.delay(150);
    const list = StorageService.getSupportTickets(userId);
    return { success: true, data: list };
  }

  static async createSupportTicket(data: {
    userId: string;
    userName: string;
    category: SupportTicket['category'];
    subject: string;
    priority: SupportTicket['priority'];
    message: string;
  }): Promise<ApiResponse<SupportTicket>> {
    await this.delay(300);
    const ticket = StorageService.createSupportTicket({
      userId: data.userId,
      userName: data.userName,
      category: data.category,
      subject: data.subject,
      priority: data.priority,
      initialMessage: data.message
    });
    return { success: true, data: ticket, message: 'Ticket opened. Support team will respond shortly.' };
  }

  static async replyToTicket(ticketId: string, message: string, sender: 'user' | 'support', name: string): Promise<ApiResponse<void>> {
    await this.delay(200);
    StorageService.addTicketMessage(ticketId, sender, name, message);
    return { success: true, message: 'Message sent.' };
  }

  // Advertiser Campaigns
  static async getCampaigns(advertiserId?: string): Promise<ApiResponse<AdvertiserCampaign[]>> {
    await this.delay(150);
    const campaigns = StorageService.getCampaigns(advertiserId);
    return { success: true, data: campaigns };
  }

  static async createCampaign(campData: Omit<AdvertiserCampaign, 'id' | 'status' | 'spentBudget' | 'completedCount' | 'verifiedCount' | 'rejectedCount' | 'viewsCount' | 'createdAt'>): Promise<ApiResponse<AdvertiserCampaign>> {
    await this.delay(400);

    const wallet = StorageService.getWallet(campData.advertiserId);
    if (wallet.availableBalance < campData.totalBudget) {
      return {
        success: false,
        error: `Insufficient advertiser account balance. You need $${campData.totalBudget.toFixed(2)} but currently have $${wallet.availableBalance.toFixed(2)}.`
      };
    }

    // Deduct advertiser balance for the campaign budget
    StorageService.updateWallet(campData.advertiserId, w => ({
      ...w,
      availableBalance: Number((w.availableBalance - campData.totalBudget).toFixed(2))
    }));

    const campaign = StorageService.createCampaign(campData);
    return {
      success: true,
      data: campaign,
      message: 'Campaign submitted for compliance verification. It will go live upon approval.'
    };
  }

  // Admin Actions
  static async getAuditLogs(): Promise<ApiResponse<AdminAuditLog[]>> {
    await this.delay(100);
    return { success: true, data: StorageService.getAuditLogs() };
  }

  static async getFraudFlags(): Promise<ApiResponse<FraudFlag[]>> {
    await this.delay(100);
    return { success: true, data: StorageService.getFraudFlags() };
  }

  static async getSettings(): Promise<ApiResponse<PlatformSettings>> {
    await this.delay(50);
    return { success: true, data: StorageService.getSettings() };
  }

  static async updateSettings(settings: Partial<PlatformSettings>): Promise<ApiResponse<PlatformSettings>> {
    await this.delay(200);
    const updated = StorageService.updateSettings(settings);
    return { success: true, data: updated, message: 'Settings saved.' };
  }

  static async approveWithdrawal(withdrawalId: string, adminEmail: string, notes?: string): Promise<ApiResponse<void>> {
    await this.delay(300);
    StorageService.updateWithdrawalStatus(withdrawalId, 'paid', notes || 'Approved & Disbursed via Payment Rail', adminEmail);
    return { success: true, message: 'Withdrawal marked approved and payout processed.' };
  }

  static async rejectWithdrawal(withdrawalId: string, adminEmail: string, reason: string): Promise<ApiResponse<void>> {
    await this.delay(300);
    const withdrawals = StorageService.getWithdrawals();
    const target = withdrawals.find(w => w.id === withdrawalId);
    if (target) {
      // Refund balance to user
      StorageService.updateWallet(target.userId, w => ({
        ...w,
        availableBalance: Number((w.availableBalance + target.amount).toFixed(2)),
        lifetimeWithdrawals: Number((w.lifetimeWithdrawals - target.amount).toFixed(2))
      }));
    }
    StorageService.updateWithdrawalStatus(withdrawalId, 'rejected', reason, adminEmail);
    return { success: true, message: 'Withdrawal rejected and balance restored to user.' };
  }

  static async approveCampaign(campaignId: string, adminEmail: string): Promise<ApiResponse<void>> {
    await this.delay(300);
    StorageService.updateCampaignStatus(campaignId, 'active', undefined, adminEmail);
    return { success: true, message: 'Campaign approved and published to task marketplace.' };
  }

  static async rejectCampaign(campaignId: string, adminEmail: string, reason: string): Promise<ApiResponse<void>> {
    await this.delay(300);
    StorageService.updateCampaignStatus(campaignId, 'rejected', reason, adminEmail);
    return { success: true, message: 'Campaign rejected.' };
  }
}
