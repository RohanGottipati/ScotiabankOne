import { useEffect, useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { ACTIVE_MOMENT } from '../data/mockData';

export default function MomentDetailScreen() {
  const navigate = useNavigate();
  const { confirmMoment, balances, hasTfsa } = useApp();

  const [amount, setAmount] = useState(ACTIVE_MOMENT.suggestedAmount);
  const [loading, setLoading] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    if (!hasTfsa) navigate('/open-tfsa', { replace: true });
  }, [hasTfsa, navigate]);

  if (!hasTfsa) return null;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      confirmMoment(amount);
      navigate('/confirm');
    }, 800);
  };

  const totalRoom = balances.tfsa + balances.tfsaRoomRemaining;
  const usedPercent = totalRoom > 0 ? (balances.tfsa / totalRoom) * 100 : 0;
  const addPercent = totalRoom > 0 ? (amount / totalRoom) * 100 : 0;
  const roomAfter = balances.tfsaRoomRemaining - amount;
  const tfsaAfter = balances.tfsa + amount;
  const chequingAfter = balances.chequing - amount;

  return (
    <div className="min-h-full bg-scotia-grey-50 flex flex-col">
      {/* Header */}
      <div className="bg-scotia-red text-white px-5 pt-2 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => navigate('/')}
            className="p-1 -ml-1 bg-transparent border-none cursor-pointer text-white"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="text-[17px] font-semibold">Scotia One</span>
        </div>
        <p className="text-[13px] opacity-75 mt-1">{ACTIVE_MOMENT.detectedDate}</p>
      </div>

      <div className="flex-1 px-4 pt-4 pb-6 space-y-3">
        {/* Spending Summary */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-scotia-grey-100">
            <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">Spending summary</p>
          </div>
          <div className="divide-y divide-scotia-grey-100">
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-[14px] text-scotia-grey-600">90-day dining average</span>
              <span className="text-[14px] font-semibold text-scotia-grey-900">$180 / mo</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-[14px] text-scotia-grey-600">This month</span>
              <span className="text-[14px] font-semibold text-scotia-grey-900">$100</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-[14px] text-scotia-grey-600">Surplus identified</span>
              <span className="text-[14px] font-semibold text-scotia-red">${ACTIVE_MOMENT.surplusAmount}</span>
            </div>
          </div>
        </div>

        {/* Suggested Investment */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-scotia-grey-100">
            <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">Suggested investment</p>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[32px] font-bold text-scotia-grey-900">${amount}</span>
              <button
                onClick={() => setShowSlider(!showSlider)}
                className="text-[13px] text-scotia-red font-medium bg-transparent border-none cursor-pointer"
              >
                {showSlider ? 'Done' : 'Edit amount'}
              </button>
            </div>
            <p className="text-[13px] text-scotia-grey-500 mt-1">30% of surplus — conservative default</p>

            {showSlider && (
              <div className="mt-4">
                <input
                  type="range"
                  min={10}
                  max={ACTIVE_MOMENT.surplusAmount}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-scotia-red"
                />
                <div className="flex justify-between text-[12px] text-scotia-grey-400 mt-1">
                  <span>$10</span>
                  <span>${ACTIVE_MOMENT.surplusAmount}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-scotia-grey-100">
            <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">Destination</p>
          </div>
          <div className="px-4 py-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[14px] text-scotia-grey-600">{ACTIVE_MOMENT.destinationLabel}</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-scotia-green" />
                <span className="text-[13px] text-scotia-green font-medium">Room available</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-scotia-grey-200 rounded-full overflow-hidden flex">
              <div className="bg-scotia-grey-400 rounded-full" style={{ width: `${usedPercent}%` }} />
              <div className="bg-scotia-red rounded-full" style={{ width: `${addPercent}%` }} />
            </div>
            <div className="flex justify-between text-[12px] text-scotia-grey-400 mt-1.5">
              <span>${balances.tfsaRoomRemaining.toLocaleString()} remaining ({balances.tfsaRoomYear})</span>
              <span>After: ${roomAfter.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[12px] text-scotia-grey-400 mt-1">
              <span>TFSA balance: ${balances.tfsa.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <span>After: ${tfsaAfter.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[12px] text-scotia-grey-400 mt-1">
              <span>Chequing: ${balances.chequing.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <span>After: ${chequingAfter.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* What happens */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-scotia-grey-100">
            <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">What happens</p>
          </div>
          <div className="divide-y divide-scotia-grey-100">
            {[
              `$${amount} moves from Chequing (7286) to TFSA`,
              'Invested in Scotia Balanced Portfolio',
              'Your money stays fully accessible',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <span className="w-5 h-5 rounded-full bg-scotia-grey-100 text-[11px] font-bold text-scotia-grey-500 flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-[14px] text-scotia-grey-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-scotia-grey-400 text-center px-2 leading-relaxed">
          {ACTIVE_MOMENT.disclaimer}
        </p>
      </div>

      {/* CTA */}
      <div className="sticky bottom-0 px-4 pb-4 pt-2 bg-white border-t border-scotia-grey-100 space-y-2">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-scotia-red hover:bg-scotia-red-dark text-white font-semibold text-[15px] py-3.5 rounded-full transition-all cursor-pointer border-none disabled:opacity-70 flex items-center justify-center"
        >
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            `Move $${amount} to my TFSA`
          )}
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full text-[14px] text-scotia-grey-500 font-medium bg-transparent border-none cursor-pointer py-2"
        >
          Not right now
        </button>
      </div>
    </div>
  );
}
