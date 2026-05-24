import { Bookmark, Sprout, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../../context/useApp';

export default function QuickAccessCards() {
  const { hasTfsa } = useApp();

  return (
    <div className="space-y-3">
      {/* Borrowing */}
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between hover:bg-scotia-grey-50 transition-colors cursor-pointer shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bookmark size={30} className="text-scotia-gold" fill="#FFB84D" />
            <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-scotia-purple rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">$</span>
            </div>
          </div>
          <div>
            <div className="text-scotia-grey-900 font-medium text-[15px]">Borrowing</div>
            <div className="text-scotia-grey-500 text-[13px]">(0)</div>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-scotia-teal font-medium text-[13px] hover:text-scotia-teal-dark transition-colors cursor-pointer bg-transparent border-none p-0">
          <span>Start borrowing</span>
          <Plus size={16} />
        </button>
      </div>

      {/* Investments */}
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between hover:bg-scotia-grey-50 transition-colors cursor-pointer shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-[30px] h-[30px] bg-scotia-green rounded-full flex items-center justify-center">
              <Sprout size={18} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-scotia-gold rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">$</span>
            </div>
          </div>
          <div>
            <div className="text-scotia-grey-900 font-medium text-[15px]">
              {hasTfsa ? 'TFSA' : 'Investments'}
            </div>
            <div className="text-scotia-grey-500 text-[13px]">
              {hasTfsa ? 'Scotia Smart Investor' : '(0)'}
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-scotia-teal font-medium text-[13px] hover:text-scotia-teal-dark transition-colors cursor-pointer bg-transparent border-none p-0">
          <span>{hasTfsa ? 'Open more' : 'Start investing'}</span>
          <Plus size={16} />
        </button>
      </div>

      {/* Scene+ */}
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between hover:bg-scotia-grey-50 transition-colors cursor-pointer shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-scotia-red rounded-full" />
            <div className="w-2 h-2 bg-scotia-teal rounded-full" />
            <div className="w-2 h-2 bg-scotia-purple rounded-full" />
            <div className="w-2 h-2 bg-scotia-pink rounded-full" />
          </div>
          <span className="text-scotia-grey-900 font-medium text-[15px]">Scene+ rewards</span>
        </div>
        <ChevronRight size={18} className="text-scotia-teal" />
      </div>
    </div>
  );
}
