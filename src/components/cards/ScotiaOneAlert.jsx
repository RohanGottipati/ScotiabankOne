import { motion } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/useApp';

export default function ScotiaOneAlert({ onDismiss }) {
  const navigate = useNavigate();
  const { hasTfsa } = useApp();

  const destination = hasTfsa ? '/moment' : '/open-tfsa';
  const message = hasTfsa
    ? 'Scotia One has detected a new Money Moment. You spent less on dining this month — tap to review your personalised savings opportunity.'
    : 'You have $25 ready to invest. Open a TFSA in 2 minutes and we\'ll move it there right now.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mx-4 mt-3 bg-blue-50 border border-blue-200 rounded-2xl p-4 cursor-pointer"
      onClick={() => navigate(destination)}
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info size={14} className="text-white" />
        </div>
        <p className="text-[13px] text-scotia-grey-700 leading-relaxed flex-1">
          {message}
        </p>
        {onDismiss && (
          <button
            className="bg-transparent border-none cursor-pointer p-0 flex-shrink-0 text-scotia-grey-400 hover:text-scotia-grey-700 transition-colors"
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
