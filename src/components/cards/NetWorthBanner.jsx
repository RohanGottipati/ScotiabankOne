import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useCountUp } from '../../hooks/useBalances';

export default function NetWorthBanner() {
  const { balances, momentConfirmed, totalFoundThisYear } = useApp();
  const displayValue = useCountUp(balances.netWorth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl p-6"
      style={{ background: 'linear-gradient(135deg, #EC111A 0%, #B50D13 100%)' }}
    >
      <p className="text-[12px] text-white/70 uppercase tracking-[1px] font-normal">
        Total Net Worth
      </p>
      <p className="display-number text-[38px] text-white mt-1">
        ${displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-[13px] text-white/80 font-medium mt-1">
        {momentConfirmed
          ? `↑ $${totalFoundThisYear.toFixed(2)} found for you this year`
          : '↑ $25.00 this month'
        }
      </p>
    </motion.div>
  );
}
