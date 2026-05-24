import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useBalances';
import { useNavigate } from 'react-router-dom';

export default function BalanceCard({ label, value, subline, accentColor, delay = 0, navigateTo }) {
  const displayValue = useCountUp(value);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-scotia-grey-200 cursor-pointer"
      style={{ borderLeft: `3px solid ${accentColor}` }}
      onClick={() => navigateTo && navigate(navigateTo)}
    >
      <p className="text-[11px] text-scotia-grey-400 uppercase font-medium tracking-wide">
        {label}
      </p>
      <p className="display-number text-[24px] mt-1" style={{ color: accentColor }}>
        ${displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-[12px] text-scotia-grey-400 mt-0.5">{subline}</p>
    </motion.div>
  );
}
