export const USER = {
  name: 'John',
  firstName: 'John',
  initials: 'J',
  hasTfsa: false,
};

export const BANKING_ACCOUNTS = [
  { name: 'Preferred Package', last4: '7286', balance: 1431.61 },
  { name: 'Momentum PLUS Savings', last4: '4518', balance: 8375.73 },
  { name: 'US Dollar Account', last4: '3192', balance: 425.00 },
  { name: 'Money Master Savings', last4: '6604', balance: 2575.10 },
];

export const CREDIT_CARDS = [
  { name: 'Scotia Momentum No-Fee VISA', last4: '5012', balance: 717.45 },
];

export const TOTAL_HAVE = 12807.44;
export const TOTAL_OWE = 717.45;

// Money Moments feature data (kept from original)
export const ACTIVE_MOMENT = {
  id: 'moment-001',
  type: 'dining_surplus',
  title: 'You spent less on dining this month',
  shortTitle: 'Dining surplus detected',
  description: 'You spent $80 less on dining this month compared to your 90-day average.',
  suggestedAmount: 25.00,
  surplusAmount: 80.00,
  category: 'Dining & Restaurants',
  icon: '🍽️',
  detectedDate: 'May 23, 2026',
  destination: 'TFSA',
  destinationLabel: 'Scotia Smart Investor TFSA',
  disclaimer: 'Based on your spending patterns — not financial advice. Your money stays fully accessible in your TFSA.',
  contributionRoomCheck: true,
};

export const MOMENTS_HISTORY = [
  {
    id: 'hist-001',
    date: 'May 23, 2026',
    shortDate: 'May 2026',
    description: 'Dining surplus — spent less eating out',
    amount: 25.00,
    category: 'Dining',
    icon: '🍽️',
    status: 'pending',
  },
  {
    id: 'hist-002',
    date: 'April 14, 2026',
    shortDate: 'Apr 2026',
    description: 'Cancelled subscription detected',
    amount: 55.00,
    category: 'Subscriptions',
    icon: '📱',
    status: 'completed',
  },
  {
    id: 'hist-003',
    date: 'March 28, 2026',
    shortDate: 'Mar 2026',
    description: 'Tax refund surplus',
    amount: 80.00,
    category: 'Income',
    icon: '💰',
    status: 'completed',
  },
];

export const BALANCES = {
  chequing: 1431.61,
  savings: 8375.73,
  tfsa: 0,
  netWorth: 12807.44,
  tfsaRoomRemaining: 6200.00,
  tfsaRoomYear: 2026,
};

export const PORTFOLIO_CHART_DATA = [
  { month: 'Nov', value: 2800 },
  { month: 'Dec', value: 2850 },
  { month: 'Jan', value: 2890 },
  { month: 'Feb', value: 2920 },
  { month: 'Mar', value: 3000 },
  { month: 'Apr', value: 3055 },
  { month: 'May', value: 3080 },
];

export const PORTFOLIO_HOLDINGS = [
  { name: 'Scotia Selected Balanced Portfolio', type: 'Managed Portfolio', value: 3000.00, allocation: '100%', change: '+2.7%', changePositive: true },
];

export const LIVING_RISK_PROFILE = {
  currentRisk: 'Moderate',
  previousRisk: 'Conservative',
  triggered: true,
  triggerReason: 'Your income increased and your spending has stabilized.',
  triggerDate: 'May 20, 2026',
  signals: [
    { label: 'Income trend', value: '+12% vs. 90-day avg', positive: true },
    { label: 'Spending stability', value: 'High — low variance', positive: true },
    { label: 'Cash buffer', value: '3.2x monthly expenses', positive: true },
  ],
  recommendation: 'Your portfolio may be ready to take on slightly more growth.',
  ctaLabel: 'Review my profile',
};

export const TOTAL_FOUND_THIS_YEAR = 160.00;

export const INITIAL_TRADING_HOLDINGS = [];
