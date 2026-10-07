import {
  User,
  Wallet,
  Transaction,
  SponsoredAdTask,
  GeneralTask,
  TaskCompletion,
  DailyAdProgress,
  WithdrawalRequest,
  PaymentMethodOption,
  Referral,
  DailyBonusState,
  SupportTicket,
  NotificationItem,
  AdvertiserCampaign,
  AdminAuditLog,
  FraudFlag,
  PlatformSettings
} from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'earntask_current_user',
  USERS: 'earntask_users',
  WALLETS: 'earntask_wallets',
  TRANSACTIONS: 'earntask_transactions',
  SPONSORED_ADS: 'earntask_sponsored_ads',
  GENERAL_TASKS: 'earntask_general_tasks',
  TASK_COMPLETIONS: 'earntask_task_completions',
  DAILY_AD_PROGRESS: 'earntask_daily_ad_progress',
  WITHDRAWALS: 'earntask_withdrawals',
  PAYMENT_METHODS: 'earntask_payment_methods',
  REFERRALS: 'earntask_referrals',
  DAILY_BONUS: 'earntask_daily_bonus',
  SUPPORT_TICKETS: 'earntask_support_tickets',
  NOTIFICATIONS: 'earntask_notifications',
  CAMPAIGNS: 'earntask_campaigns',
  AUDIT_LOGS: 'earntask_audit_logs',
  FRAUD_FLAGS: 'earntask_fraud_flags',
  PLATFORM_SETTINGS: 'earntask_platform_settings',
};

// Seed Users
const SEED_USERS: User[] = [
  {
    id: 'user_alex',
    fullName: 'Alex Rivera',
    username: 'alex_r',
    email: 'demo.user@example.com',
    phone: '+1 (555) 349-2810',
    country: 'United States',
    role: 'user',
    isEmailVerified: true,
    isPhoneVerified: true,
    isKycVerified: true,
    isBanned: false,
    isSuspended: false,
    referralCode: 'EARN-ALEX99',
    showOnLeaderboard: true,
    createdAt: '2026-08-15T10:00:00Z',
    twoFactorEnabled: false,
  },
  {
    id: 'user_nexus_adv',
    fullName: 'Sarah Vance (Nexus Brands)',
    username: 'nexus_agency',
    email: 'demo.advertiser@example.com',
    phone: '+1 (555) 789-0123',
    country: 'United Kingdom',
    role: 'advertiser',
    isEmailVerified: true,
    isPhoneVerified: true,
    isKycVerified: true,
    isBanned: false,
    isSuspended: false,
    referralCode: 'ADV-NEXUS',
    showOnLeaderboard: false,
    createdAt: '2026-07-01T12:00:00Z',
    twoFactorEnabled: true,
  },
  {
    id: 'user_admin_sec',
    fullName: 'Platform Operations & Compliance',
    username: 'compliance_officer',
    email: 'demo.admin@example.com',
    phone: '+1 (555) 999-0000',
    country: 'United States',
    role: 'admin',
    isEmailVerified: true,
    isPhoneVerified: true,
    isKycVerified: true,
    isBanned: false,
    isSuspended: false,
    referralCode: 'ADMIN-OPS',
    showOnLeaderboard: false,
    createdAt: '2026-01-01T00:00:00Z',
    twoFactorEnabled: true,
  }
];

// Seed Wallets
const SEED_WALLETS: Record<string, Wallet> = {
  user_alex: {
    userId: 'user_alex',
    availableBalance: 12.85,
    pendingBalance: 1.45,
    lifetimeEarnings: 68.30,
    lifetimeWithdrawals: 54.00,
    currency: 'USD',
  },
  user_nexus_adv: {
    userId: 'user_nexus_adv',
    availableBalance: 420.00,
    pendingBalance: 0.00,
    lifetimeEarnings: 0.00,
    lifetimeWithdrawals: 0.00,
    currency: 'USD',
  },
  user_admin_sec: {
    userId: 'user_admin_sec',
    availableBalance: 8450.00,
    pendingBalance: 0.00,
    lifetimeEarnings: 0.00,
    lifetimeWithdrawals: 0.00,
    currency: 'USD',
  }
};

// Seed 10 Sponsored Ad Campaigns (Direct platform promotional campaigns, NO AdSense)
const SEED_SPONSORED_ADS: SponsoredAdTask[] = [
  {
    id: 'ad_nordic_01',
    campaignId: 'camp_01',
    advertiserName: 'Nordic Trail Gear',
    title: 'Discover Lightweight All-Weather Eco Shell Jackets',
    description: 'Explore the recycled waterproof outdoor apparel line built for extreme trail conditions.',
    durationSeconds: 15,
    rewardAmount: 0.025,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'What is the primary feature of Nordic Trail Gear jackets?',
      options: ['Recycled waterproof eco-membrane', 'Battery-powered thermal wire', 'Single-use plastic lining', 'Heavy down insulation'],
      correctIndex: 0
    },
    totalSlots: 10000,
    remainingSlots: 8412,
    targetAudience: 'Outdoor & Sustainability',
    createdAt: '2026-10-01T09:00:00Z'
  },
  {
    id: 'ad_apex_cloud',
    campaignId: 'camp_02',
    advertiserName: 'Apex Cloud Workspaces',
    title: 'Collaborative Cloud IDE with Zero Setup Lag',
    description: 'Instant dev containers running in your browser with sub-second cold starts.',
    durationSeconds: 20,
    rewardAmount: 0.030,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'Which platform capability was highlighted in Apex Cloud?',
      options: ['Physical server shipment', 'Browser dev containers with instant start', 'Manual tape backups', 'Local floppy drives'],
      correctIndex: 1
    },
    totalSlots: 15000,
    remainingSlots: 11200,
    targetAudience: 'Software Developers & Tech Enthusiasts',
    createdAt: '2026-10-02T11:30:00Z'
  },
  {
    id: 'ad_ecobreeze',
    campaignId: 'camp_03',
    advertiserName: 'EcoBreeze Living',
    title: 'Smart Energy Optimization For Modern Homes',
    description: 'Cut household HVAC electric consumption by up to 34% with intelligent room zoning.',
    durationSeconds: 20,
    rewardAmount: 0.020,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'How much energy reduction can EcoBreeze zoning achieve?',
      options: ['Up to 5%', 'Up to 34%', '99.9%', 'None'],
      correctIndex: 1
    },
    totalSlots: 8000,
    remainingSlots: 6490,
    targetAudience: 'Homeowners & Energy Savers',
    createdAt: '2026-10-03T14:15:00Z'
  },
  {
    id: 'ad_luminary_audio',
    campaignId: 'camp_04',
    advertiserName: 'Luminary Audiobooks',
    title: 'Unlimited Original Non-Fiction Summaries',
    description: '15-minute key insights from bestselling business, psychology, and science titles.',
    durationSeconds: 15,
    rewardAmount: 0.025,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'What is the typical length of Luminary key insight summaries?',
      options: ['15 minutes', '4 hours', '2 days', '60 seconds'],
      correctIndex: 0
    },
    totalSlots: 12000,
    remainingSlots: 9780,
    targetAudience: 'Lifelong Learners',
    createdAt: '2026-10-04T08:00:00Z'
  },
  {
    id: 'ad_zenith_health',
    campaignId: 'camp_05',
    advertiserName: 'Zenith Health Matrix',
    title: 'Personalized Micronutrient Tracking & Blood Metrics',
    description: 'Connect your wearable and lab panels for actionable circadian health coaching.',
    durationSeconds: 25,
    rewardAmount: 0.035,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'What does Zenith Health integrate with for circadian coaching?',
      options: ['Wearables and health panels', 'Car odometers', 'Social media followers', 'Credit bureaus'],
      correctIndex: 0
    },
    totalSlots: 6000,
    remainingSlots: 4120,
    targetAudience: 'Health & Wellness',
    createdAt: '2026-10-04T16:00:00Z'
  },
  {
    id: 'ad_velocity_vpn',
    campaignId: 'camp_06',
    advertiserName: 'Velocity WireGuard VPN',
    title: 'High-Throughput Encrypted Tunnels for Remote Workers',
    description: 'Audited zero-logs architecture with dedicated high-speed WireGuard nodes worldwide.',
    durationSeconds: 20,
    rewardAmount: 0.020,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'What protocol does Velocity VPN utilize for speed and security?',
      options: ['WireGuard', 'Telnet', 'HTTP plain text', 'FTP'],
      correctIndex: 0
    },
    totalSlots: 10000,
    remainingSlots: 7850,
    targetAudience: 'Cybersecurity & Privacy',
    createdAt: '2026-10-05T10:00:00Z'
  },
  {
    id: 'ad_pinnacle_tracker',
    campaignId: 'camp_07',
    advertiserName: 'Pinnacle Wealth Management',
    title: 'Automated Net Worth & Cash-Flow Visualizer',
    description: 'Aggregate your bank accounts, pensions, and investments with end-to-end encryption.',
    durationSeconds: 20,
    rewardAmount: 0.030,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'What does Pinnacle Wealth Management track?',
      options: ['Net worth and multi-account cash flows', 'Video game scores', 'Weather forecasts', 'Restaurant menus'],
      correctIndex: 0
    },
    totalSlots: 8000,
    remainingSlots: 5400,
    targetAudience: 'Personal Finance & Budgeting',
    createdAt: '2026-10-05T13:45:00Z'
  },
  {
    id: 'ad_pulsebrew',
    campaignId: 'camp_08',
    advertiserName: 'PulseBrew Artisan Coffee',
    title: 'Direct-Trade Single-Origin Beans Roasted to Order',
    description: 'Ethically sourced microlots with tasting notes delivered within 48 hours of roast.',
    durationSeconds: 15,
    rewardAmount: 0.020,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'How quickly is PulseBrew shipped after roasting?',
      options: ['Within 48 hours', 'After 6 months', 'Never', '3 weeks later'],
      correctIndex: 0
    },
    totalSlots: 9000,
    remainingSlots: 7300,
    targetAudience: 'Coffee Lovers & Foodies',
    createdAt: '2026-10-06T09:15:00Z'
  },
  {
    id: 'ad_cybervault',
    campaignId: 'camp_09',
    advertiserName: 'CyberVault Hardware Keys',
    title: 'FIDO2 Passkey Security Keys with Biometric Touch',
    description: 'Eliminate credential phishing attacks with hardware-bound cryptographic keys.',
    durationSeconds: 25,
    rewardAmount: 0.035,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'What standard does CyberVault implement for passwordless security?',
      options: ['FIDO2 / Passkey', 'ROT13', 'Unencrypted SMS', 'Word doc passwords'],
      correctIndex: 0
    },
    totalSlots: 7500,
    remainingSlots: 6110,
    targetAudience: 'Security Conscious Users',
    createdAt: '2026-10-06T15:20:00Z'
  },
  {
    id: 'ad_stridefit',
    campaignId: 'camp_10',
    advertiserName: 'StrideFit Smart Footwear',
    title: 'Real-Time Running Gait Analysis & Injury Prevention',
    description: 'Insole sensors measuring pronation, cadence, and ground contact time with haptic coaching.',
    durationSeconds: 20,
    rewardAmount: 0.025,
    category: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    verificationQuestion: {
      question: 'What metrics do StrideFit insole sensors measure?',
      options: ['Pronation, cadence, and contact time', 'Radio frequencies', 'Stock market movements', 'Room humidity'],
      correctIndex: 0
    },
    totalSlots: 10000,
    remainingSlots: 8940,
    targetAudience: 'Athletes & Runners',
    createdAt: '2026-10-07T08:00:00Z'
  }
];

// Seed General Tasks across categories
const SEED_GENERAL_TASKS: GeneralTask[] = [
  {
    id: 'task_survey_01',
    campaignId: 'camp_survey_01',
    advertiserName: 'Consumer Insight Labs',
    title: 'Remote Work Tech & Hardware Usage Survey 2026',
    description: 'Answer 12 verified multiple-choice questions on your daily monitor, ergonomic keyboard, and software setup.',
    instructions: [
      'Click Start Task to open the sponsored survey.',
      'Provide genuine answers about your current workspace setup.',
      'Submit the survey and enter the confirmation token provided on the final screen.'
    ],
    category: 'survey',
    rewardAmount: 0.85,
    estimatedMinutes: 6,
    availableSlots: 450,
    requirements: ['Must be working remotely or hybrid', 'Complete all questions honestly'],
    status: 'available',
    requiresProof: true,
    proofType: 'text_code'
  },
  {
    id: 'task_website_01',
    campaignId: 'camp_web_01',
    advertiserName: 'Finova NeoBank Research',
    title: 'Explore Finova Commercial Checking Features & Calculator',
    description: 'Visit the official Finova landing page, test the high-yield business savings yield calculator, and review terms.',
    instructions: [
      'Visit the partner portal using the verified redirect link.',
      'Spend at least 60 seconds reviewing checking tier benefits.',
      'Test the interest rate slider and paste the calculated annual yield into the proof field.'
    ],
    category: 'website',
    rewardAmount: 0.15,
    estimatedMinutes: 2,
    availableSlots: 1200,
    requirements: ['Desktop or mobile browser', 'Spend at least 60 seconds on site'],
    status: 'available',
    requiresProof: true,
    proofType: 'text_code'
  },
  {
    id: 'task_app_01',
    campaignId: 'camp_app_01',
    advertiserName: 'MindfulBreathe App',
    title: 'Discover MindfulBreathe Guided Session Experience',
    description: 'Explore the onboarding preview and evaluate the soundscape ambient mixer UI.',
    instructions: [
      'Open the official web demo app showcase.',
      'Select any 3-minute nature audio preset (Forest or Ocean).',
      'Enter the session completion code shown at the end.'
    ],
    category: 'app',
    rewardAmount: 0.40,
    estimatedMinutes: 4,
    availableSlots: 600,
    requirements: ['Audio output enabled', 'Complete one full sound preview'],
    status: 'available',
    requiresProof: true,
    proofType: 'text_code'
  },
  {
    id: 'task_product_01',
    campaignId: 'camp_prod_01',
    advertiserName: 'TerraOrganics Skincare',
    title: 'Product Discovery: Mineral Sunscreen Formula Review',
    description: 'Review the botanical ingredient breakdown and sustainable glass packaging certifications.',
    instructions: [
      'Browse through the product specification sheet.',
      'Locate the reef-safe SPF certification number.',
      'Submit the certification code to verify review.'
    ],
    category: 'product',
    rewardAmount: 0.25,
    estimatedMinutes: 3,
    availableSlots: 850,
    requirements: ['Careful reading of product specification sheet'],
    status: 'available',
    requiresProof: true,
    proofType: 'text_code'
  },
  {
    id: 'task_quiz_01',
    campaignId: 'camp_quiz_01',
    advertiserName: 'CyberEd Foundation',
    title: 'Learn & Answer: Phishing Identification Assessment',
    description: 'Review 5 real-world email scenario examples and answer questions on recognizing sender spoofing.',
    instructions: [
      'Read through the 5 short email threat case studies.',
      'Answer the 3 comprehension verification questions.',
      'Score 100% on the quiz to receive instant verification.'
    ],
    category: 'quiz',
    rewardAmount: 0.35,
    estimatedMinutes: 4,
    availableSlots: 2000,
    requirements: ['Score 100% on quiz', 'No automated scripting'],
    status: 'available',
    requiresProof: true,
    proofType: 'text_code'
  },
  {
    id: 'task_bonus_01',
    campaignId: 'camp_bonus_01',
    advertiserName: 'EarnTask Platform Sponsor',
    title: 'Complete Profile Verification Checklist',
    description: 'Verify your email address, configure your preferred payout method, and set security questions.',
    instructions: [
      'Go to your Profile page.',
      'Confirm email address status.',
      'Add at least one withdrawal destination (e.g. PayPal or Bank Transfer).'
    ],
    category: 'bonus',
    rewardAmount: 0.50,
    estimatedMinutes: 2,
    availableSlots: 5000,
    requirements: ['Profile details complete and verified'],
    status: 'available',
    requiresProof: false
  }
];

// Seed Payment Methods
const SEED_PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'method_paypal',
    name: 'PayPal',
    type: 'paypal',
    minWithdrawal: 5.00,
    maxWithdrawal: 500.00,
    feePercentage: 2.0,
    feeFixed: 0.30,
    estimatedHours: '24 - 48 Hours',
    isEnabled: true,
    countriesSupported: ['US', 'CA', 'GB', 'DE', 'FR', 'AU', 'JP', 'Worldwide Supported'],
    icon: 'paypal'
  },
  {
    id: 'method_bank',
    name: 'Direct Bank Transfer (ACH / SEPA)',
    type: 'bank',
    minWithdrawal: 15.00,
    maxWithdrawal: 2500.00,
    feePercentage: 1.0,
    feeFixed: 1.00,
    estimatedHours: '2 - 4 Business Days',
    isEnabled: true,
    countriesSupported: ['US', 'CA', 'GB', 'EU Countries'],
    icon: 'building'
  },
  {
    id: 'method_mobile',
    name: 'Mobile Wallet / Wise',
    type: 'mobile_wallet',
    minWithdrawal: 10.00,
    maxWithdrawal: 1000.00,
    feePercentage: 1.5,
    feeFixed: 0.50,
    estimatedHours: '12 - 24 Hours',
    isEnabled: true,
    countriesSupported: ['Global Coverage'],
    icon: 'smartphone'
  },
  {
    id: 'method_crypto',
    name: 'USDC (Solana / Polygon Network)',
    type: 'crypto',
    minWithdrawal: 10.00,
    maxWithdrawal: 1500.00,
    feePercentage: 0.5,
    feeFixed: 0.20,
    estimatedHours: 'Under 2 Hours',
    isEnabled: true,
    countriesSupported: ['Decentralized / Worldwide'],
    icon: 'coins'
  }
];

// Seed Transactions
const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_01',
    userId: 'user_alex',
    amount: 0.025,
    type: 'task_reward',
    description: 'Sponsored Ad: Nordic Trail Gear',
    date: '2026-10-07T07:15:00Z',
    status: 'completed'
  },
  {
    id: 'tx_02',
    userId: 'user_alex',
    amount: 0.030,
    type: 'task_reward',
    description: 'Sponsored Ad: Apex Cloud Workspaces',
    date: '2026-10-07T07:35:00Z',
    status: 'completed'
  },
  {
    id: 'tx_03',
    userId: 'user_alex',
    amount: 0.020,
    type: 'task_reward',
    description: 'Sponsored Ad: EcoBreeze Living',
    date: '2026-10-07T08:05:00Z',
    status: 'completed'
  },
  {
    id: 'tx_04',
    userId: 'user_alex',
    amount: 0.85,
    type: 'task_reward',
    description: 'Approved Task: Remote Work Tech Survey',
    date: '2026-10-06T14:20:00Z',
    status: 'completed'
  },
  {
    id: 'tx_05',
    userId: 'user_alex',
    amount: 0.50,
    type: 'bonus',
    description: 'Daily Streak Bonus (Day 5)',
    date: '2026-10-06T09:00:00Z',
    status: 'completed'
  },
  {
    id: 'tx_06',
    userId: 'user_alex',
    amount: 0.35,
    type: 'referral_reward',
    description: 'Referral Commission from @marcus_dev',
    date: '2026-10-05T18:10:00Z',
    status: 'completed'
  },
  {
    id: 'tx_07',
    userId: 'user_alex',
    amount: -25.00,
    type: 'withdrawal',
    description: 'Withdrawal to PayPal (alex.rivera@example.com)',
    date: '2026-09-28T16:00:00Z',
    status: 'completed'
  }
];

// Seed Withdrawals
const SEED_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'w_req_01',
    userId: 'user_alex',
    userName: 'Alex Rivera',
    userEmail: 'demo.user@example.com',
    amount: 25.00,
    fee: 0.80,
    netAmount: 24.20,
    paymentMethod: 'PayPal',
    accountDetails: { email: 'alex.rivera@example.com' },
    status: 'paid',
    requestedAt: '2026-09-28T16:00:00Z',
    updatedAt: '2026-09-29T11:30:00Z',
    riskScore: 'low',
    transactionHash: 'PP-TX-9982310-DEMO'
  },
  {
    id: 'w_req_02',
    userId: 'user_marcus',
    userName: 'Marcus Vance',
    userEmail: 'marcus.v@example.com',
    amount: 15.00,
    fee: 1.15,
    netAmount: 13.85,
    paymentMethod: 'Direct Bank Transfer',
    accountDetails: { bankName: 'Chase Bank', accountNumber: '****4920' },
    status: 'under_review',
    requestedAt: '2026-10-06T20:15:00Z',
    updatedAt: '2026-10-07T06:00:00Z',
    riskScore: 'low',
    adminNotes: 'Routine threshold check passed'
  },
  {
    id: 'w_req_03',
    userId: 'user_samuel',
    userName: 'Samuel Ortiz',
    userEmail: 'samuel.o@example.com',
    amount: 32.00,
    fee: 0.36,
    netAmount: 31.64,
    paymentMethod: 'USDC (Polygon)',
    accountDetails: { accountNumber: '0x71C...88B9' },
    status: 'pending',
    requestedAt: '2026-10-07T05:45:00Z',
    updatedAt: '2026-10-07T05:45:00Z',
    riskScore: 'medium',
    riskReason: 'Rapid task completion velocity within 24 hours'
  }
];

// Seed Referrals for Alex
const SEED_REFERRALS: Referral[] = [
  {
    id: 'ref_01',
    referrerId: 'user_alex',
    referredUserId: 'user_marcus',
    referredName: 'Marcus Vance',
    joinedDate: '2026-09-12',
    status: 'active',
    totalCommissionEarned: 3.40,
    lastActive: '2026-10-06'
  },
  {
    id: 'ref_02',
    referrerId: 'user_alex',
    referredUserId: 'user_clara',
    referredName: 'Clara Chen',
    joinedDate: '2026-09-22',
    status: 'active',
    totalCommissionEarned: 2.15,
    lastActive: '2026-10-07'
  },
  {
    id: 'ref_03',
    referrerId: 'user_alex',
    referredUserId: 'user_tariq',
    referredName: 'Tariq Al-Mansoor',
    joinedDate: '2026-10-02',
    status: 'pending_first_task',
    totalCommissionEarned: 0.00,
    lastActive: '2026-10-02'
  }
];

// Seed Advertiser Campaigns
const SEED_CAMPAIGNS: AdvertiserCampaign[] = [
  {
    id: 'camp_01',
    advertiserId: 'user_nexus_adv',
    advertiserName: 'Nexus Brands & Co',
    name: 'Nordic Trail Eco-Apparel Awareness',
    description: 'Promote our sustainable trail gear series to active outdoor enthusiasts.',
    type: 'video',
    landingUrl: 'https://example.com/nordic-trail',
    targetCountry: 'Worldwide',
    targetAudience: 'Active Lifestyle, Outdoor',
    durationSeconds: 15,
    rewardPerCompletion: 0.025,
    maxCompletions: 10000,
    userBudget: 250.00,
    platformFee: 50.00,
    totalBudget: 300.00,
    spentBudget: 42.15,
    completedCount: 1588,
    verifiedCount: 1588,
    rejectedCount: 12,
    viewsCount: 2150,
    status: 'active',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    createdAt: '2026-09-28T10:00:00Z'
  },
  {
    id: 'camp_02',
    advertiserId: 'user_nexus_adv',
    advertiserName: 'Nexus Brands & Co',
    name: 'Apex Cloud Workspaces Developer Launch',
    description: 'Direct developers to experience interactive cloud workspace spin-up.',
    type: 'video',
    landingUrl: 'https://example.com/apex-cloud',
    targetCountry: 'US, UK, CA, EU',
    targetAudience: 'Software Engineers',
    durationSeconds: 20,
    rewardPerCompletion: 0.030,
    maxCompletions: 5000,
    userBudget: 150.00,
    platformFee: 30.00,
    totalBudget: 180.00,
    spentBudget: 114.00,
    completedCount: 3800,
    verifiedCount: 3790,
    rejectedCount: 22,
    viewsCount: 4600,
    status: 'active',
    startDate: '2026-10-02',
    endDate: '2026-10-20',
    createdAt: '2026-09-30T14:00:00Z'
  },
  {
    id: 'camp_pending_01',
    advertiserId: 'user_nexus_adv',
    advertiserName: 'Nexus Brands & Co',
    name: 'KitePulse AI Email Productivity Tour',
    description: 'Showcase clean inbox workflow powered by local privacy-first models.',
    type: 'website',
    landingUrl: 'https://example.com/kite-pulse',
    targetCountry: 'Worldwide',
    targetAudience: 'Knowledge Workers',
    durationSeconds: 30,
    rewardPerCompletion: 0.040,
    maxCompletions: 2500,
    userBudget: 100.00,
    platformFee: 20.00,
    totalBudget: 120.00,
    spentBudget: 0.00,
    completedCount: 0,
    verifiedCount: 0,
    rejectedCount: 0,
    viewsCount: 0,
    status: 'pending_review',
    startDate: '2026-10-10',
    endDate: '2026-11-10',
    createdAt: '2026-10-06T18:00:00Z'
  }
];

// Seed Support Tickets
const SEED_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_01',
    userId: 'user_alex',
    userName: 'Alex Rivera',
    category: 'withdrawals',
    subject: 'Estimated arrival time for PayPal payout',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-09-28T18:00:00Z',
    updatedAt: '2026-09-29T12:00:00Z',
    messages: [
      {
        id: 'msg_01',
        sender: 'user',
        senderName: 'Alex Rivera',
        message: 'Hello, I requested a $25 withdrawal to PayPal. Is there an ETA?',
        timestamp: '2026-09-28T18:00:00Z'
      },
      {
        id: 'msg_02',
        sender: 'support',
        senderName: 'EarnTask Support',
        message: 'Hi Alex! Your withdrawal has been audited, approved, and successfully disbursed to your PayPal address. Please verify your receipt in your PayPal statement.',
        timestamp: '2026-09-29T12:00:00Z'
      }
    ]
  }
];

// Seed Notifications
const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    userId: 'user_alex',
    title: 'Daily Ads Limit Reset',
    message: 'Your 10 sponsored promotional ad slots have refreshed for today. Complete them to earn rewards.',
    type: 'reward_added',
    read: false,
    createdAt: '2026-10-07T00:00:00Z'
  },
  {
    id: 'notif_02',
    userId: 'user_alex',
    title: 'Survey Reward Credited',
    message: 'Your submission for Remote Work Tech Survey was approved. $0.85 added to your balance.',
    type: 'task_approved',
    read: true,
    createdAt: '2026-10-06T14:20:00Z'
  },
  {
    id: 'notif_03',
    userId: 'user_alex',
    title: 'Withdrawal Completed',
    message: 'Your withdrawal request of $25.00 has been marked paid. Reference PP-TX-9982310.',
    type: 'withdrawal_paid',
    read: true,
    createdAt: '2026-09-29T11:30:00Z'
  }
];

// Seed Audit Logs
const SEED_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'audit_01',
    adminId: 'user_admin_sec',
    adminEmail: 'demo.admin@example.com',
    action: 'APPROVE_WITHDRAWAL',
    targetType: 'withdrawal',
    targetId: 'w_req_01',
    details: 'Approved $25.00 payout to user_alex via PayPal after zero fraud score match',
    timestamp: '2026-09-29T11:28:00Z',
    ipAddress: '192.0.2.14'
  },
  {
    id: 'audit_02',
    adminId: 'user_admin_sec',
    adminEmail: 'demo.admin@example.com',
    action: 'APPROVE_CAMPAIGN',
    targetType: 'campaign',
    targetId: 'camp_02',
    details: 'Approved Apex Cloud Workspaces Developer Launch campaign with $180 budget',
    timestamp: '2026-10-01T08:15:00Z',
    ipAddress: '192.0.2.14'
  }
];

// Seed Fraud Flags
const SEED_FRAUD_FLAGS: FraudFlag[] = [
  {
    id: 'flag_01',
    userId: 'user_samuel',
    userName: 'Samuel Ortiz',
    type: 'speed_completion',
    severity: 'medium',
    details: 'Completed 6 survey tasks in under 90 seconds total, violating realistic human reading thresholds.',
    detectedAt: '2026-10-07T05:30:00Z',
    status: 'pending_review'
  },
  {
    id: 'flag_02',
    userId: 'user_bot_suspect',
    userName: 'FastClicker99',
    type: 'device_reused',
    severity: 'high',
    details: 'Fingerprint matched 4 existing registered accounts on same subnet.',
    detectedAt: '2026-10-06T22:10:00Z',
    status: 'pending_review'
  }
];

// Seed Settings
const SEED_SETTINGS: PlatformSettings = {
  dailyAdLimit: 10,
  minWithdrawalDefault: 5.00,
  platformFeePercent: 20.0,
  referralCommissionPercent: 10.0,
  demoModeNotice: true,
  requireEmailVerificationForPayout: true,
  maxDailyEarningsUsd: 15.00
};

// Storage Service with localStorage fallback
export class StorageService {
  private static getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch {
      return defaultValue;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // In private browsing or quota limits
    }
  }

  static initData(): void {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.setItem(STORAGE_KEYS.USERS, SEED_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      this.setItem(STORAGE_KEYS.CURRENT_USER, SEED_USERS[0]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WALLETS)) {
      this.setItem(STORAGE_KEYS.WALLETS, SEED_WALLETS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SPONSORED_ADS)) {
      this.setItem(STORAGE_KEYS.SPONSORED_ADS, SEED_SPONSORED_ADS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.GENERAL_TASKS)) {
      this.setItem(STORAGE_KEYS.GENERAL_TASKS, SEED_GENERAL_TASKS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      this.setItem(STORAGE_KEYS.TRANSACTIONS, SEED_TRANSACTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WITHDRAWALS)) {
      this.setItem(STORAGE_KEYS.WITHDRAWALS, SEED_WITHDRAWALS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS)) {
      this.setItem(STORAGE_KEYS.PAYMENT_METHODS, SEED_PAYMENT_METHODS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.REFERRALS)) {
      this.setItem(STORAGE_KEYS.REFERRALS, SEED_REFERRALS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
      this.setItem(STORAGE_KEYS.CAMPAIGNS, SEED_CAMPAIGNS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUPPORT_TICKETS)) {
      this.setItem(STORAGE_KEYS.SUPPORT_TICKETS, SEED_SUPPORT_TICKETS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      this.setItem(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      this.setItem(STORAGE_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FRAUD_FLAGS)) {
      this.setItem(STORAGE_KEYS.FRAUD_FLAGS, SEED_FRAUD_FLAGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PLATFORM_SETTINGS)) {
      this.setItem(STORAGE_KEYS.PLATFORM_SETTINGS, SEED_SETTINGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.DAILY_BONUS)) {
      const initialBonus: DailyBonusState = {
        currentStreak: 5,
        lastClaimDate: '2026-10-06',
        claimedDaysThisCycle: [1, 2, 3, 4, 5],
        streakBonusEligible: true
      };
      this.setItem(STORAGE_KEYS.DAILY_BONUS, initialBonus);
    }
    if (!localStorage.getItem(STORAGE_KEYS.DAILY_AD_PROGRESS)) {
      const today = new Date().toISOString().split('T')[0];
      const initialProgress: DailyAdProgress = {
        userId: 'user_alex',
        date: today,
        completedCount: 3,
        earningsToday: 0.075,
        completedTaskIds: ['ad_nordic_01', 'ad_apex_cloud', 'ad_ecobreeze']
      };
      this.setItem(STORAGE_KEYS.DAILY_AD_PROGRESS, initialProgress);
    }
  }

  // Current User management
  static getCurrentUser(): User {
    this.initData();
    return this.getItem<User>(STORAGE_KEYS.CURRENT_USER, SEED_USERS[0]);
  }

  static setCurrentUser(user: User): void {
    this.setItem(STORAGE_KEYS.CURRENT_USER, user);
  }

  static switchDemoRole(role: 'user' | 'advertiser' | 'admin'): User {
    const users = this.getUsers();
    const found = users.find(u => u.role === role) || SEED_USERS.find(u => u.role === role)!;
    this.setCurrentUser(found);
    return found;
  }

  static getUsers(): User[] {
    this.initData();
    return this.getItem<User[]>(STORAGE_KEYS.USERS, SEED_USERS);
  }

  static saveUser(user: User): void {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    this.setItem(STORAGE_KEYS.USERS, users);
    const current = this.getCurrentUser();
    if (current.id === user.id) {
      this.setCurrentUser(user);
    }
  }

  // Wallets
  static getWallet(userId: string): Wallet {
    this.initData();
    const wallets = this.getItem<Record<string, Wallet>>(STORAGE_KEYS.WALLETS, SEED_WALLETS);
    if (!wallets[userId]) {
      wallets[userId] = {
        userId,
        availableBalance: 0.00,
        pendingBalance: 0.00,
        lifetimeEarnings: 0.00,
        lifetimeWithdrawals: 0.00,
        currency: 'USD'
      };
      this.setItem(STORAGE_KEYS.WALLETS, wallets);
    }
    return wallets[userId];
  }

  static updateWallet(userId: string, updater: (w: Wallet) => Wallet): Wallet {
    const wallets = this.getItem<Record<string, Wallet>>(STORAGE_KEYS.WALLETS, SEED_WALLETS);
    const current = wallets[userId] || {
      userId,
      availableBalance: 0.00,
      pendingBalance: 0.00,
      lifetimeEarnings: 0.00,
      lifetimeWithdrawals: 0.00,
      currency: 'USD'
    };
    const updated = updater({ ...current });
    wallets[userId] = updated;
    this.setItem(STORAGE_KEYS.WALLETS, wallets);
    return updated;
  }

  // Daily Ad Progress (Strict 10 limit per day)
  static getDailyAdProgress(userId: string): DailyAdProgress {
    this.initData();
    const today = new Date().toISOString().split('T')[0];
    const progress = this.getItem<DailyAdProgress>(STORAGE_KEYS.DAILY_AD_PROGRESS, {
      userId,
      date: today,
      completedCount: 0,
      earningsToday: 0,
      completedTaskIds: []
    });

    // Reset if new day
    if (progress.date !== today) {
      const resetProgress: DailyAdProgress = {
        userId,
        date: today,
        completedCount: 0,
        earningsToday: 0,
        completedTaskIds: []
      };
      this.setItem(STORAGE_KEYS.DAILY_AD_PROGRESS, resetProgress);
      return resetProgress;
    }

    return progress;
  }

  static recordAdCompletion(userId: string, adTask: SponsoredAdTask): { success: boolean; message: string; reward: number; progress: DailyAdProgress } {
    const progress = this.getDailyAdProgress(userId);
    const settings = this.getSettings();

    if (progress.completedCount >= settings.dailyAdLimit) {
      return {
        success: false,
        message: `You have reached the daily limit of ${settings.dailyAdLimit} sponsored ads. Please come back tomorrow.`,
        reward: 0,
        progress
      };
    }

    if (progress.completedTaskIds.includes(adTask.id)) {
      return {
        success: false,
        message: 'You have already completed this sponsored promotion today.',
        reward: 0,
        progress
      };
    }

    // Update progress
    progress.completedCount += 1;
    progress.earningsToday = Number((progress.earningsToday + adTask.rewardAmount).toFixed(3));
    progress.completedTaskIds.push(adTask.id);
    this.setItem(STORAGE_KEYS.DAILY_AD_PROGRESS, progress);

    // Credit reward to wallet: initially pending or available per business rule
    // Here we credit to available balance directly for instant feedback and update lifetime earnings
    this.updateWallet(userId, (w) => ({
      ...w,
      availableBalance: Number((w.availableBalance + adTask.rewardAmount).toFixed(3)),
      lifetimeEarnings: Number((w.lifetimeEarnings + adTask.rewardAmount).toFixed(3))
    }));

    // Record transaction
    this.addTransaction({
      id: `tx_${Date.now()}`,
      userId,
      amount: adTask.rewardAmount,
      type: 'task_reward',
      description: `Sponsored Ad: ${adTask.advertiserName}`,
      date: new Date().toISOString(),
      status: 'completed',
      referenceId: adTask.id
    });

    // Record completion in history
    this.recordTaskCompletion({
      id: `tc_${Date.now()}`,
      userId,
      taskId: adTask.id,
      taskTitle: adTask.title,
      advertiserName: adTask.advertiserName,
      category: 'video',
      rewardAmount: adTask.rewardAmount,
      completedAt: new Date().toISOString(),
      status: 'approved'
    });

    return {
      success: true,
      message: `Successfully verified! $${adTask.rewardAmount.toFixed(3)} credited to your balance.`,
      reward: adTask.rewardAmount,
      progress
    };
  }

  // Transactions
  static getTransactions(userId?: string): Transaction[] {
    this.initData();
    const all = this.getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, SEED_TRANSACTIONS);
    if (!userId) return all;
    return all.filter(t => t.userId === userId);
  }

  static addTransaction(tx: Transaction): void {
    const list = this.getTransactions();
    list.unshift(tx);
    this.setItem(STORAGE_KEYS.TRANSACTIONS, list);
  }

  // Sponsored Ads
  static getSponsoredAds(): SponsoredAdTask[] {
    this.initData();
    return this.getItem<SponsoredAdTask[]>(STORAGE_KEYS.SPONSORED_ADS, SEED_SPONSORED_ADS);
  }

  // General Tasks
  static getGeneralTasks(): GeneralTask[] {
    this.initData();
    return this.getItem<GeneralTask[]>(STORAGE_KEYS.GENERAL_TASKS, SEED_GENERAL_TASKS);
  }

  // Task completions
  static getTaskCompletions(userId?: string): TaskCompletion[] {
    this.initData();
    const all = this.getItem<TaskCompletion[]>(STORAGE_KEYS.TASK_COMPLETIONS, []);
    if (!userId) return all;
    return all.filter(tc => tc.userId === userId);
  }

  static recordTaskCompletion(comp: TaskCompletion): void {
    const all = this.getItem<TaskCompletion[]>(STORAGE_KEYS.TASK_COMPLETIONS, []);
    all.unshift(comp);
    this.setItem(STORAGE_KEYS.TASK_COMPLETIONS, all);
  }

  // Withdrawals
  static getWithdrawals(userId?: string): WithdrawalRequest[] {
    this.initData();
    const all = this.getItem<WithdrawalRequest[]>(STORAGE_KEYS.WITHDRAWALS, SEED_WITHDRAWALS);
    if (!userId) return all;
    return all.filter(w => w.userId === userId);
  }

  static createWithdrawalRequest(req: Omit<WithdrawalRequest, 'id' | 'status' | 'requestedAt' | 'updatedAt' | 'riskScore'>): { success: boolean; message: string; withdrawal?: WithdrawalRequest } {
    const wallet = this.getWallet(req.userId);
    if (wallet.availableBalance < req.amount) {
      return { success: false, message: 'Insufficient available balance.' };
    }

    const settings = this.getSettings();
    if (req.amount < settings.minWithdrawalDefault) {
      return { success: false, message: `Minimum withdrawal is $${settings.minWithdrawalDefault.toFixed(2)}.` };
    }

    // Deduct from available balance
    this.updateWallet(req.userId, (w) => ({
      ...w,
      availableBalance: Number((w.availableBalance - req.amount).toFixed(2)),
      lifetimeWithdrawals: Number((w.lifetimeWithdrawals + req.amount).toFixed(2))
    }));

    const newReq: WithdrawalRequest = {
      ...req,
      id: `w_req_${Date.now()}`,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      riskScore: req.amount > 50 ? 'medium' : 'low'
    };

    const all = this.getWithdrawals();
    all.unshift(newReq);
    this.setItem(STORAGE_KEYS.WITHDRAWALS, all);

    // Record pending transaction
    this.addTransaction({
      id: `tx_${Date.now()}`,
      userId: req.userId,
      amount: -req.amount,
      type: 'withdrawal',
      description: `Withdrawal to ${req.paymentMethod}`,
      date: new Date().toISOString(),
      status: 'pending',
      referenceId: newReq.id
    });

    return {
      success: true,
      message: 'Withdrawal request submitted for compliance verification.',
      withdrawal: newReq
    };
  }

  static updateWithdrawalStatus(withdrawalId: string, status: WithdrawalRequest['status'], adminNotes?: string, adminEmail?: string): void {
    const all = this.getWithdrawals();
    const idx = all.findIndex(w => w.id === withdrawalId);
    if (idx >= 0) {
      const target = all[idx];
      target.status = status;
      target.updatedAt = new Date().toISOString();
      if (adminNotes) target.adminNotes = adminNotes;
      if (status === 'paid' && !target.transactionHash) {
        target.transactionHash = `PAYOUT-${Math.random().toString(36).substring(2, 9).toUpperCase()}-DEMO`;
      }
      all[idx] = target;
      this.setItem(STORAGE_KEYS.WITHDRAWALS, all);

      // Audit log
      this.addAuditLog({
        id: `audit_${Date.now()}`,
        adminId: 'admin_officer',
        adminEmail: adminEmail || 'admin@earntask.internal',
        action: `WITHDRAWAL_${status.toUpperCase()}`,
        targetType: 'withdrawal',
        targetId: withdrawalId,
        details: `Updated withdrawal status of $${target.amount.toFixed(2)} for ${target.userName} to ${status}. Notes: ${adminNotes || 'None'}`,
        timestamp: new Date().toISOString(),
        ipAddress: '127.0.0.1'
      });
    }
  }

  // Payment Methods
  static getPaymentMethods(): PaymentMethodOption[] {
    this.initData();
    return this.getItem<PaymentMethodOption[]>(STORAGE_KEYS.PAYMENT_METHODS, SEED_PAYMENT_METHODS);
  }

  // Referrals
  static getReferrals(userId: string): Referral[] {
    this.initData();
    const all = this.getItem<Referral[]>(STORAGE_KEYS.REFERRALS, SEED_REFERRALS);
    return all.filter(r => r.referrerId === userId);
  }

  // Daily Bonus
  static getDailyBonus(): DailyBonusState {
    this.initData();
    return this.getItem<DailyBonusState>(STORAGE_KEYS.DAILY_BONUS, {
      currentStreak: 5,
      lastClaimDate: '2026-10-06',
      claimedDaysThisCycle: [1, 2, 3, 4, 5],
      streakBonusEligible: true
    });
  }

  static claimDailyBonus(userId: string): { success: boolean; amount: number; message: string; streak: number } {
    const bonusState = this.getDailyBonus();
    const today = new Date().toISOString().split('T')[0];

    if (bonusState.lastClaimDate === today) {
      return {
        success: false,
        amount: 0,
        message: 'You have already claimed today’s login bonus. Come back tomorrow!',
        streak: bonusState.currentStreak
      };
    }

    const nextDay = (bonusState.currentStreak % 7) + 1;
    const bonusTiers = [0.05, 0.08, 0.12, 0.15, 0.20, 0.30, 0.75]; // 7 days cycle
    const amount = bonusTiers[nextDay - 1] || 0.10;

    bonusState.currentStreak += 1;
    bonusState.lastClaimDate = today;
    if (!bonusState.claimedDaysThisCycle.includes(nextDay)) {
      bonusState.claimedDaysThisCycle.push(nextDay);
    }
    if (bonusState.claimedDaysThisCycle.length >= 7) {
      bonusState.claimedDaysThisCycle = [1];
    }
    this.setItem(STORAGE_KEYS.DAILY_BONUS, bonusState);

    // Credit to wallet
    this.updateWallet(userId, (w) => ({
      ...w,
      availableBalance: Number((w.availableBalance + amount).toFixed(2)),
      lifetimeEarnings: Number((w.lifetimeEarnings + amount).toFixed(2))
    }));

    // Record transaction
    this.addTransaction({
      id: `tx_${Date.now()}`,
      userId,
      amount,
      type: 'bonus',
      description: `Day ${nextDay} Streak Bonus`,
      date: new Date().toISOString(),
      status: 'completed'
    });

    return {
      success: true,
      amount,
      message: `Claimed Day ${nextDay} streak reward of $${amount.toFixed(2)}!`,
      streak: bonusState.currentStreak
    };
  }

  // Support Tickets
  static getSupportTickets(userId?: string): SupportTicket[] {
    this.initData();
    const all = this.getItem<SupportTicket[]>(STORAGE_KEYS.SUPPORT_TICKETS, SEED_SUPPORT_TICKETS);
    if (!userId) return all;
    return all.filter(t => t.userId === userId);
  }

  static createSupportTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'status'> & { initialMessage: string }): SupportTicket {
    const all = this.getSupportTickets();
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      userId: ticket.userId,
      userName: ticket.userName,
      category: ticket.category,
      subject: ticket.subject,
      status: 'open',
      priority: ticket.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: 'user',
          senderName: ticket.userName,
          message: ticket.initialMessage,
          timestamp: new Date().toISOString()
        }
      ]
    };
    all.unshift(newTicket);
    this.setItem(STORAGE_KEYS.SUPPORT_TICKETS, all);
    return newTicket;
  }

  static addTicketMessage(ticketId: string, sender: 'user' | 'support', senderName: string, message: string): void {
    const all = this.getSupportTickets();
    const idx = all.findIndex(t => t.id === ticketId);
    if (idx >= 0) {
      all[idx].messages.push({
        id: `msg_${Date.now()}`,
        sender,
        senderName,
        message,
        timestamp: new Date().toISOString()
      });
      all[idx].updatedAt = new Date().toISOString();
      if (sender === 'support') {
        all[idx].status = 'waiting_for_user';
      }
      this.setItem(STORAGE_KEYS.SUPPORT_TICKETS, all);
    }
  }

  // Campaigns (Advertiser)
  static getCampaigns(advertiserId?: string): AdvertiserCampaign[] {
    this.initData();
    const all = this.getItem<AdvertiserCampaign[]>(STORAGE_KEYS.CAMPAIGNS, SEED_CAMPAIGNS);
    if (!advertiserId) return all;
    return all.filter(c => c.advertiserId === advertiserId);
  }

  static createCampaign(camp: Omit<AdvertiserCampaign, 'id' | 'status' | 'spentBudget' | 'completedCount' | 'verifiedCount' | 'rejectedCount' | 'viewsCount' | 'createdAt'>): AdvertiserCampaign {
    const all = this.getCampaigns();
    const newCamp: AdvertiserCampaign = {
      ...camp,
      id: `camp_${Date.now()}`,
      status: 'pending_review',
      spentBudget: 0,
      completedCount: 0,
      verifiedCount: 0,
      rejectedCount: 0,
      viewsCount: 0,
      createdAt: new Date().toISOString()
    };
    all.unshift(newCamp);
    this.setItem(STORAGE_KEYS.CAMPAIGNS, all);
    return newCamp;
  }

  static updateCampaignStatus(campaignId: string, status: AdvertiserCampaign['status'], rejectionReason?: string, adminEmail?: string): void {
    const all = this.getCampaigns();
    const idx = all.findIndex(c => c.id === campaignId);
    if (idx >= 0) {
      all[idx].status = status;
      if (rejectionReason) all[idx].rejectionReason = rejectionReason;
      this.setItem(STORAGE_KEYS.CAMPAIGNS, all);

      this.addAuditLog({
        id: `audit_${Date.now()}`,
        adminId: 'admin_officer',
        adminEmail: adminEmail || 'admin@earntask.internal',
        action: `CAMPAIGN_${status.toUpperCase()}`,
        targetType: 'campaign',
        targetId: campaignId,
        details: `Updated campaign "${all[idx].name}" status to ${status}`,
        timestamp: new Date().toISOString(),
        ipAddress: '127.0.0.1'
      });
    }
  }

  // Audit Logs
  static getAuditLogs(): AdminAuditLog[] {
    this.initData();
    return this.getItem<AdminAuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
  }

  static addAuditLog(log: AdminAuditLog): void {
    const list = this.getAuditLogs();
    list.unshift(log);
    this.setItem(STORAGE_KEYS.AUDIT_LOGS, list);
  }

  // Fraud Flags
  static getFraudFlags(): FraudFlag[] {
    this.initData();
    return this.getItem<FraudFlag[]>(STORAGE_KEYS.FRAUD_FLAGS, SEED_FRAUD_FLAGS);
  }

  static resolveFraudFlag(flagId: string, status: 'resolved' | 'dismissed'): void {
    const list = this.getFraudFlags();
    const idx = list.findIndex(f => f.id === flagId);
    if (idx >= 0) {
      list[idx].status = status;
      this.setItem(STORAGE_KEYS.FRAUD_FLAGS, list);
    }
  }

  // Settings
  static getSettings(): PlatformSettings {
    this.initData();
    return this.getItem<PlatformSettings>(STORAGE_KEYS.PLATFORM_SETTINGS, SEED_SETTINGS);
  }

  static updateSettings(settings: Partial<PlatformSettings>): PlatformSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.setItem(STORAGE_KEYS.PLATFORM_SETTINGS, updated);
    return updated;
  }

  // Reset demo data
  static resetToDefaults(): void {
    localStorage.clear();
    this.initData();
  }
}
