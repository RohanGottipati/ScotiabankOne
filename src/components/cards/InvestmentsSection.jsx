import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/useApp';

export default function InvestmentsSection() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { balances, hasTfsa } = useApp();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-scotia-grey-50 transition-colors cursor-pointer border-none bg-transparent"
      >
        <span className="text-scotia-red text-[17px] font-bold">
          Investments ({hasTfsa ? 1 : 0})
        </span>
        {isExpanded ? (
          <ChevronUp size={20} className="text-scotia-red" />
        ) : (
          <ChevronDown size={20} className="text-scotia-red" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-scotia-grey-200">
          {hasTfsa ? (
            <>
              <div className="p-4 border-b border-scotia-grey-200 hover:bg-scotia-grey-50 transition-colors cursor-pointer">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-scotia-grey-900 font-medium text-[15px]">Tax-Free Savings - SSI</span>
                  <span className="text-scotia-grey-500 text-[13px]">(2183)</span>
                </div>
                <div className="text-scotia-grey-900 text-[17px] font-bold">
                  ${balances.tfsa.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD
                </div>
                <div className="text-scotia-grey-500 text-[13px] mt-0.5">$0.00 USD</div>
              </div>
              <div className="p-4 flex items-center justify-between border-b border-scotia-grey-200">
                <span className="text-scotia-grey-900 font-semibold text-[15px]">Total:</span>
                <span className="text-scotia-grey-900 text-[17px] font-bold">
                  ${balances.tfsa.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD
                </span>
              </div>
            </>
          ) : (
            <div className="p-4">
              <p className="text-[13px] text-scotia-grey-500 mb-3">No investment accounts yet.</p>
              <button
                onClick={() => navigate('/open-tfsa')}
                className="flex items-center gap-2 text-scotia-teal font-medium text-[14px] hover:text-scotia-teal-dark transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                <span>Open a TFSA</span>
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
