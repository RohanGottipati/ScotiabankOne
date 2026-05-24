import StatusBar from './StatusBar';
import BottomNav from './BottomNav';

export default function AppShell({ children }) {
  return (
    <div className="max-w-[390px] mx-auto h-full bg-scotia-grey-50 relative flex flex-col">
      <div className="flex-shrink-0">
        <StatusBar />
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <div className="flex-shrink-0">
        <BottomNav />
      </div>
    </div>
  );
}
