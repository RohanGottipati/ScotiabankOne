export const USER = {
  name: 'Sarah',
  firstName: 'Sarah',
  initials: 'SK',
};

export const BALANCES = {
  chequing: 1240.00,
  tfsa: 3000.00,
  netWorth: 4240.00,
  tfsaRoomRemaining: 6200.00,
  tfsaRoomYear: 2026,
};

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
  {
    name: 'Scotia Selected Balanced Portfolio',
    type: 'Managed Portfolio',
    value: 3000.00,
    allocation: '100%',
    change: '+2.7%',
    changePositive: true,
  },
];

export const LIVING_RISK_PROFILE = {
  currentRisk: 'Moderate',
  previousRisk: 'Conservative',
  triggered: true,
  triggerReason: 'Your income increased and your spending has stabilized over the past 3 months.',
  triggerDate: 'May 20, 2026',
  signals: [
    { label: 'Income trend', value: '+12% vs. 90-day avg', positive: true },
    { label: 'Spending stability', value: 'High — low variance', positive: true },
    { label: 'Cash buffer', value: '3.2x monthly expenses', positive: true },
  ],
  recommendation: 'Based on how you\'ve been living with money lately, your portfolio may be ready to take on slightly more growth. Want to update your risk profile?',
  ctaLabel: 'Review my profile',
};

export const TOTAL_FOUND_THIS_YEAR = 160.00;
