import { motion } from 'framer-motion';
import { Zap, ChevronRight, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/useApp';
import { ACTIVE_MOMENT } from '../../data/mockData';

export default function MoneyMomentCard({ moment = ACTIVE_MOMENT, onConfirm }) {
  const navigate = useNavigate();
  const { momentConfirmed, lastConfirmedAmount } = useApp();
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    else navigate('/moment');
  };

  if (momentConfirmed) {
    const confirmedAmount = lastConfirmedAmount || moment.suggestedAmount;

    return (
      <div
        className="bg-scotia-green-light rounded-2xl p-4 border border-scotia-green/20 cursor-pointer"
        onClick={() => navigate('/history')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-scotia-green/15 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={20} className="text-scotia-green" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-scotia-grey-900">${confirmedAmount} invested in your TFSA</p>
            <p className="text-[12px] text-scotia-grey-500 mt-0.5">Done! More moments in history.</p>
          </div>
          <ChevronRight size={16} className="text-scotia-green flex-shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-4 border border-scotia-red/20 hover:shadow-md transition-all cursor-pointer shadow-sm"
      onClick={handleConfirm}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-scotia-red-light flex items-center justify-center">
          <Zap size={15} className="text-scotia-red" fill="#E31837" />
        </div>
        <span className="text-[11px] font-bold text-scotia-red uppercase tracking-[0.5px]">Scotia One AI</span>
        <span className="ml-auto bg-scotia-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
      </div>

      <p className="text-[14px] font-semibold text-scotia-grey-900 leading-[1.4]">
        You spent ${moment.surplusAmount} less on dining this month
      </p>
      <p className="text-[12px] text-scotia-grey-500 mt-1 leading-relaxed">
        We found a surplus you could sweep into your TFSA.
      </p>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-scotia-grey-100">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={14} className="text-scotia-green" />
          <span className="text-[18px] font-bold text-scotia-red">${moment.suggestedAmount}</span>
          <span className="text-[11px] text-scotia-grey-400">available</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleConfirm(); }}
          className="bg-scotia-red hover:bg-scotia-red-dark text-white font-semibold text-[13px] px-4 py-2 rounded-full transition-all cursor-pointer border-none"
        >
          Invest now
        </button>
      </div>
    </motion.div>
  );
}
