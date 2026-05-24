import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { BANKING_ACCOUNTS } from '../../data/mockData';
import { useApp } from '../../context/useApp';

export default function BankingSection() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { balances } = useApp();
  const accounts = BANKING_ACCOUNTS.map((account, index) => {
    if (index === 0) return { ...account, balance: balances.chequing };
    if (index === 1 && typeof balances.savings === 'number') return { ...account, balance: balances.savings };
    return account;
  });
  const visibleAccounts = accounts.slice(0, 2);
  const hiddenCount = accounts.length - 2;
  const total = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-scotia-grey-50 transition-colors cursor-pointer border-none bg-transparent"
      >
        <span className="text-scotia-red text-[17px] font-bold">
          Banking ({accounts.length})
        </span>
        {isExpanded ? (
          <ChevronUp size={20} className="text-scotia-red" />
        ) : (
          <ChevronDown size={20} className="text-scotia-red" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-scotia-grey-200">
          {visibleAccounts.map((acct, i) => (
            <div
              key={acct.last4}
              className={`p-4 hover:bg-scotia-grey-50 transition-colors cursor-pointer ${
                i < visibleAccounts.length - 1 ? 'border-b border-scotia-grey-200' : ''
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-scotia-grey-900 font-medium text-[15px]">{acct.name}</span>
                <span className="text-scotia-grey-500 text-[13px]">({acct.last4})</span>
              </div>
              <div className="text-scotia-grey-900 text-[17px] font-bold">
                ${acct.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}

          {hiddenCount > 0 && (
            <div className="p-4 border-b border-scotia-grey-200">
              <button className="text-scotia-teal text-[13px] font-medium hover:text-scotia-teal-dark transition-colors cursor-pointer bg-transparent border-none p-0">
                View more ({hiddenCount})
              </button>
            </div>
          )}

          <div className="p-4 flex items-center justify-between border-b border-scotia-grey-200">
            <span className="text-scotia-grey-900 font-semibold text-[15px]">Total:</span>
            <span className="text-scotia-grey-900 text-[17px] font-bold">
              ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-4">
            <button className="flex items-center gap-2 text-scotia-teal font-medium text-[14px] hover:text-scotia-teal-dark transition-colors cursor-pointer bg-transparent border-none p-0">
              <span>Open account</span>
              <Plus size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
