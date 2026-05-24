import { Home, TrendingUp, Zap, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LIVING_RISK_PROFILE } from '../../data/mockData';

const tabs = [
  { icon: Home, label: 'Home', route: '/' },
  { icon: TrendingUp, label: 'Invest', route: '/portfolio' },
  { icon: Zap, label: 'Moments', route: '/history' },
  { icon: User, label: 'Profile', route: '/risk-profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { momentConfirmed } = useApp();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-scotia-grey-200 flex items-center justify-around z-40"
         style={{ maxWidth: '390px', margin: '0 auto' }}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.route;
        const Icon = tab.icon;
        const showRedDot = tab.label === 'Moments' && !momentConfirmed;
        const showOrangeDot = tab.label === 'Profile' && LIVING_RISK_PROFILE.triggered;

        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.route)}
            className="flex flex-col items-center gap-0.5 relative cursor-pointer bg-transparent border-none"
          >
            <div className="relative">
              <Icon
                size={22}
                className={isActive ? 'text-scotia-red' : 'text-scotia-grey-400'}
                fill={isActive ? 'currentColor' : 'none'}
              />
              {showRedDot && (
                <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-scotia-red rounded-full" />
              )}
              {showOrangeDot && (
                <div className="absolute -top-0.5 -right-1 w-2 h-2 bg-scotia-amber rounded-full" />
              )}
            </div>
            <span className={`text-[10px] font-medium ${isActive ? 'text-scotia-red' : 'text-scotia-grey-400'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
