import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppShell from './components/layout/AppShell';
import HomeScreen from './screens/HomeScreen';
import MomentDetailScreen from './screens/MomentDetailScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import OpenTfsaScreen from './screens/OpenTfsaScreen';
import AdviceScreen from './screens/AdviceScreen';
import ForecastScreen from './screens/ForecastScreen';
import SmartInvestorScreen from './screens/SmartInvestorScreen';
import SmartTradingScreen from './screens/SmartTradingScreen';
import NotificationScreen from './screens/NotificationScreen';
import SplashScreen from './screens/SplashScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import HistoryScreen from './screens/HistoryScreen';
import RiskProfileScreen from './screens/RiskProfileScreen';

function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-8">
      <div className="relative w-[430px] h-[920px] bg-white rounded-[55px] shadow-2xl border-[8px] border-[#2D2D2D] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-[#1A1A1A] rounded-b-2xl z-50" />
        <div className="pt-[35px] h-full overflow-y-auto bg-[#E31837]">
          {children}
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isConfirmation = location.pathname === '/confirm';
  const isMoment = location.pathname === '/moment';
  const isOpenTfsa = location.pathname === '/open-tfsa';
  const isForecast = location.pathname === '/forecast';

  if (isConfirmation) return <ConfirmationScreen />;
  if (isMoment) return <MomentDetailScreen />;
  if (isOpenTfsa) return <OpenTfsaScreen />;
  if (isForecast) return <ForecastScreen />;
  if (location.pathname === '/smart-investor') return <SmartInvestorScreen />;
  if (location.pathname === '/smart-trading') return <SmartTradingScreen />;
  if (location.pathname === '/notification') return <NotificationScreen />;
  if (location.pathname === '/splash') return <SplashScreen />;

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/moment" element={<MomentDetailScreen />} />
        <Route path="/confirm" element={<ConfirmationScreen />} />
        <Route path="/advice" element={<AdviceScreen />} />
        <Route path="/portfolio" element={<PortfolioScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/risk-profile" element={<RiskProfileScreen />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <PhoneFrame>
          <AppContent />
        </PhoneFrame>
      </BrowserRouter>
    </AppProvider>
  );
}
