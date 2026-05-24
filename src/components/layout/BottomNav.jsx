import { Home, Zap, TrendingUp, History, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', route: '/' },
  { id: 'moment', icon: Zap, label: 'Moment', route: '/moment' },
  { id: 'advice', icon: TrendingUp, label: 'Advice+', route: '/advice' },
  { id: 'history', icon: History, label: 'History', route: '/history' },
  { id: 'risk', icon: ShieldCheck, label: 'Risk', route: '/risk-profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-white border-t border-scotia-grey-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.route;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border-none bg-transparent ${
                isActive ? 'bg-scotia-grey-100 text-scotia-red' : 'text-scotia-grey-500 hover:text-scotia-grey-900'
              }`}
            >
              <Icon size={22} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
