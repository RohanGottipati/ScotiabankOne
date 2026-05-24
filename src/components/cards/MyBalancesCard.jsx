import { ChevronRight } from 'lucide-react';
import { TOTAL_OWE } from '../../data/mockData';
import { useApp } from '../../context/useApp';

export default function MyBalancesCard() {
  const { balances } = useApp();

  return (
    <div className="bg-white rounded-2xl p-5 hover:bg-scotia-grey-50 transition-colors cursor-pointer shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-scotia-grey-900 text-[19px] font-bold">My balances</h3>
        <ChevronRight size={20} className="text-scotia-teal" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-scotia-grey-600 text-[14px]">I have</span>
            <div className="w-2 h-2 bg-scotia-teal rounded-full" />
          </div>
          <div className="text-scotia-grey-900 text-[26px] font-bold">
            ${balances.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-scotia-grey-600 text-[14px]">I owe</span>
            <div className="w-2 h-2 bg-scotia-grey-400 rounded-full" />
          </div>
          <div className="text-scotia-grey-900 text-[26px] font-bold">
            ${TOTAL_OWE.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}
