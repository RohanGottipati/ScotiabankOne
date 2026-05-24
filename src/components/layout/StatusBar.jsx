import { Bell } from 'lucide-react';
import { USER } from '../../data/mockData';

export default function StatusBar() {
  return (
    <div className="h-[44px] bg-white border-b border-scotia-grey-200 flex items-center justify-between px-4 z-40">
      <span className="display-number text-scotia-red text-lg font-bold tracking-tight">
        Scotiabank
      </span>
      <div className="flex items-center gap-3">
        <Bell size={20} className="text-scotia-grey-700" />
        <div className="w-8 h-8 rounded-full bg-scotia-red flex items-center justify-center">
          <span className="text-white text-xs font-semibold">{USER.initials}</span>
        </div>
      </div>
    </div>
  );
}
