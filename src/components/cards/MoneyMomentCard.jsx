import { motion } from 'framer-motion';
import { Zap, ChevronRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ACTIVE_MOMENT } from '../../data/mockData';

export default function MoneyMomentCard() {
  const navigate = useNavigate();
  const { momentConfirmed } = useApp();

  if (momentConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-scotia-green-light rounded-2xl p-5"
      >
        <div className="flex items-center gap-3">
          <CheckCircle size={24} className="text-scotia-green" />
          <div>
            <p className="text-[15px] font-medium text-scotia-grey-900">
              $25 invested in your TFSA. Well done, Sarah.
            </p>
            <p className="text-[13px] text-scotia-grey-700 mt-1">
              Check your Moments History to see your full year.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="money-moment-card bg-white rounded-2xl p-5 shadow-md border-2 border-scotia-red cursor-pointer hover:scale-[1.01] transition-transform"
      onClick={() => navigate('/moment')}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-scotia-red" fill="#EC111A" />
          <span className="text-[11px] font-bold text-scotia-red uppercase tracking-[1px]">
            Money Moment
          </span>
        </div>
        <ChevronRight size={18} className="text-scotia-grey-400" />
      </div>

      <p className="text-[16px] font-medium text-scotia-grey-900 leading-[1.4] mt-3">
        You spent ${ACTIVE_MOMENT.surplusAmount} less on dining this month.
      </p>
      <p className="text-[14px] text-scotia-grey-700 mt-1">
        You have a ${ACTIVE_MOMENT.suggestedAmount} surplus ready to invest.
      </p>

      <div className="mt-3">
        <span className="inline-block bg-scotia-red-light text-scotia-red text-[14px] font-bold px-3 py-1 rounded-full border border-scotia-red">
          ${ACTIVE_MOMENT.suggestedAmount} → {ACTIVE_MOMENT.destination}
        </span>
      </div>

      <button
        className="w-full mt-4 bg-scotia-red text-white font-semibold text-[15px] py-3 px-6 rounded-xl hover:bg-scotia-red-dark active:scale-[0.96] transition-all cursor-pointer"
        onClick={(e) => { e.stopPropagation(); navigate('/moment'); }}
      >
        Invest ${ACTIVE_MOMENT.suggestedAmount} Now
      </button>

      <p
        className="text-center mt-2 text-[13px] text-scotia-red font-medium underline cursor-pointer"
        onClick={(e) => { e.stopPropagation(); navigate('/moment'); }}
      >
        Review details
      </p>
    </motion.div>
  );
}
