import StatusBar from './StatusBar';
import BottomNav from './BottomNav';

export default function AppShell({ children }) {
  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-scotia-grey-50 relative">
      <StatusBar />
      <div className="pt-[44px] pb-[64px] overflow-y-auto min-h-screen">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
