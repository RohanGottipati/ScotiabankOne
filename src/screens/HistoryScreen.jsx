import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HistoryItem from '../components/cards/HistoryItem';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function HistoryScreen() {
  const { history, totalFoundThisYear, momentConfirmed } = useApp();

  const momentCount = momentConfirmed ? 4 : 3;

  return (
    <motion.div
      className="px-4 py-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-[22px] font-bold text-scotia-grey-900">Money Moments</h1>
        <p className="text-[13px] text-scotia-grey-400 mt-0.5">Your AI-powered investing history</p>
      </motion.div>

      {/* Year Summary Banner */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-5 mt-4"
        style={{ background: 'linear-gradient(135deg, #EC111A, #B50D13)' }}
      >
        <p className="text-[11px] text-white/70 uppercase tracking-[1px]">Found for you in 2026</p>
        <p className="display-number text-[36px] text-white mt-1">
          ${totalFoundThisYear.toFixed(2)}
        </p>
        <p className="text-[13px] text-white/80 mt-1">
          {momentCount} Money Moments · All invested in your TFSA
        </p>
        <p className="text-[12px] text-white/80 italic font-medium mt-3">
          "This engine doesn't exist anywhere else."
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={itemVariants} className="mt-5">
        {history.map((item, index) => (
          <HistoryItem
            key={item.id}
            item={item}
            isFirst={index === 0}
            isLast={index === history.length - 1}
          />
        ))}
      </motion.div>

      {/* Switching Cost Statement */}
      <motion.div
        variants={itemVariants}
        className="bg-scotia-grey-50 border border-scotia-grey-200 rounded-2xl p-4 mt-4"
      >
        <div className="flex flex-col items-center text-center">
          <Lock size={24} className="text-scotia-red mb-2" />
          <p className="text-[14px] font-medium text-scotia-grey-700">
            If you left Scotiabank, this engine leaves too.
          </p>
          <p className="text-[12px] text-scotia-grey-400 mt-1">
            Wealthsimple starts at zero. This history doesn't transfer.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
