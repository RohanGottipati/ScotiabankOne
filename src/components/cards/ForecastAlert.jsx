import { motion } from 'framer-motion';
import { BarChart2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ForecastAlert({ onDismiss }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-4 mt-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 cursor-pointer"
      onClick={() => navigate('/forecast')}
    >
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <BarChart2 size={14} className="text-white" />
        </div>
        <p className="text-[13px] text-scotia-grey-700 leading-relaxed flex-1">
          Your 30-day forecast is ready. Expected money out exceeds money in by $19.90 — tap to review.
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
