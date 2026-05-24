import { ChevronLeft, ChevronRight, Info, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { USER } from '../data/mockData';

const GOAL_CARDS = [
  { emoji: '🏖️', label: 'Retirement' },
  { emoji: '🛡️', label: 'Emergency Fund' },
  { emoji: '🏠', label: 'Home Ownership' },
];

export default function SmartInvestorScreen() {
  const navigate = useNavigate();
  const { balances, hasTfsa } = useApp();

  return (
    <div className="h-full bg-scotia-grey-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-scotia-red text-white px-5 pt-2 pb-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={() => navigate('/advice')}
            className="p-1 -ml-1 bg-transparent border-none cursor-pointer text-white"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="text-[17px] font-semibold">Scotia Smart Investor</span>
        </div>
      </div>

      {/* Logo bar */}
      <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-scotia-grey-100 flex-shrink-0 shadow-sm">
        <div>
          <div className="text-[13px] text-scotia-grey-700 font-medium">Scotia</div>
          <div className="text-[20px] font-bold text-scotia-purple">Smart Investor</div>
        </div>
        <button className="flex flex-col gap-1 p-2 bg-transparent border-none cursor-pointer">
          <div className="w-1.5 h-1.5 bg-scotia-red rounded-full" />
          <div className="w-1.5 h-1.5 bg-scotia-red rounded-full" />
          <div className="w-1.5 h-1.5 bg-scotia-red rounded-full" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        {/* User name */}
        <h2 className="text-[26px] font-bold text-scotia-grey-900 uppercase">
          {USER.name}
        </h2>

        {/* CTA */}
        <button className="w-full bg-scotia-red hover:bg-scotia-red-dark text-white py-3.5 rounded-xl font-semibold text-[15px] border-none cursor-pointer transition-colors">
          Talk To An Advisor
        </button>

        {/* Info alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-scotia-grey-700 leading-relaxed">
            Global events can cause ripple effects in financial markets, often seen as periods of volatility. Book an appointment to discuss a plan for you.
          </p>
        </div>

        {/* My Financial Milestones */}
        <div>
          <h3 className="text-[22px] font-bold text-scotia-grey-900 mb-4">My Financial Milestones</h3>
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer">
              <span className="text-[15px] font-medium text-scotia-grey-900">My Goals</span>
              <ChevronRight size={16} className="text-scotia-grey-900" />
            </button>
            <button className="flex items-center gap-1.5 text-scotia-red font-semibold text-[14px] bg-transparent border-none cursor-pointer">
              <Plus size={16} />
              Add Goal
            </button>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-scotia-grey-100">
            <p className="text-[14px] text-scotia-grey-500">You have no goals in progress.</p>
          </div>
        </div>

        {/* Recommended Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[22px] font-bold text-scotia-grey-900">Recommended Goals</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory">
            {GOAL_CARDS.map((goal) => (
              <div
                key={goal.label}
                className="flex-shrink-0 w-44 border-2 border-dashed border-scotia-grey-200 rounded-2xl p-5 snap-center bg-white"
              >
                <div className="w-14 h-14 bg-scotia-grey-100 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-[28px]">{goal.emoji}</span>
                </div>
                <h4 className="text-[15px] font-semibold text-scotia-grey-900 mb-4">{goal.label}</h4>
                <button className="text-[13px] text-scotia-grey-700 font-medium bg-transparent border-none cursor-pointer p-0">
                  Add goal
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Accounts */}
        <div>
          <h3 className="text-[22px] font-bold text-scotia-grey-900 mb-4">Accounts</h3>
          {hasTfsa && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-scotia-grey-100 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[14px] font-medium text-scotia-grey-900">Tax-Free Savings - SSI</span>
                <span className="text-[12px] text-scotia-grey-500">(2183)</span>
              </div>
              <p className="text-[18px] font-bold text-scotia-grey-900">${balances.tfsa.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD</p>
              <p className="text-[12px] text-scotia-grey-500 mt-0.5">${balances.tfsaRoomRemaining.toLocaleString()} contribution room remaining</p>
            </div>
          )}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-scotia-grey-100 mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[14px] font-medium text-scotia-grey-900">Preferred Package</span>
              <span className="text-[12px] text-scotia-grey-500">(7286)</span>
            </div>
            <p className="text-[18px] font-bold text-scotia-grey-900">${balances.chequing.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD</p>
          </div>
          <button
            onClick={() => navigate(hasTfsa ? '/' : '/open-tfsa')}
            className="w-full bg-scotia-red hover:bg-scotia-red-dark text-white py-3.5 rounded-xl font-semibold text-[15px] border-none cursor-pointer transition-colors">
            {hasTfsa ? 'Manage Accounts' : 'Open A New Account'}
          </button>
        </div>

        {/* Get started prompt */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-scotia-grey-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-[14px] text-scotia-grey-700 leading-relaxed">
            Answer a few questions about yourself and your investment priorities to get started
          </p>
        </div>

        {/* Ways to Get Ahead */}
        <div>
          <h3 className="text-[22px] font-bold text-scotia-grey-900 mb-4">Ways to Get Ahead</h3>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-scotia-grey-100">
            <div className="flex gap-4 mb-4">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-scotia-grey-900 mb-1">Staying on Track</h4>
                <p className="text-[13px] text-scotia-grey-600 leading-relaxed">
                  Key steps to consider when setting your financial goals.
                </p>
              </div>
            </div>
            <button className="w-full border-2 border-scotia-red text-scotia-red py-3 rounded-xl font-semibold text-[14px] bg-transparent cursor-pointer hover:bg-red-50 transition-colors">
              Protect Your Plan
            </button>
          </div>
          <div className="flex items-center justify-between mt-4 text-scotia-grey-500">
            <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-[13px] font-medium">
              <ChevronLeft size={16} /> Back
            </button>
            <span className="text-[13px] font-medium">1 / 1</span>
            <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-[13px] font-medium">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-scotia-grey-200 pt-5 space-y-3 pb-4">
          {['Canadian Investment Regulatory Organization', 'Security', 'Legal', 'Privacy', 'Accessibility', 'Cookie Settings'].map((link) => (
            <button key={link} className="text-[12px] text-scotia-grey-600 underline block bg-transparent border-none cursor-pointer text-left">
              {link}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
