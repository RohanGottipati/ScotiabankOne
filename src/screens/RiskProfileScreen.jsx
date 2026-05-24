import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, DollarSign, XCircle, CheckCircle } from 'lucide-react';
import { LIVING_RISK_PROFILE } from '../data/mockData';
import Button from '../components/ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const signalIcons = [TrendingUp, Shield, DollarSign];

export default function RiskProfileScreen() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleReviewAllocation = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <motion.div
      className="px-4 py-5 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Toast */}
      {toastVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[50px] left-1/2 -translate-x-1/2 bg-scotia-grey-900 text-white text-[13px] px-4 py-2 rounded-xl z-50 shadow-lg"
          style={{ maxWidth: '360px' }}
        >
          Feature coming soon in full release
        </motion.div>
      )}

      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-[22px] font-bold text-scotia-grey-900">My Risk Profile</h1>
        <p className="text-[13px] text-scotia-grey-400 mt-0.5">Updated based on how you live with money</p>
      </motion.div>

      {/* Block 1 — Profile Change Alert */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-5 mt-4 border-2"
        style={{ backgroundColor: '#FFF8E1', borderColor: '#E65100' }}
      >
        <span className="inline-block bg-scotia-red text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
          Profile Updated
        </span>
        <h2 className="text-[18px] font-bold text-scotia-grey-900 mt-3">
          Your profile changed from {LIVING_RISK_PROFILE.previousRisk} to {LIVING_RISK_PROFILE.currentRisk}
        </h2>
        <p className="text-[13px] text-scotia-grey-400 mt-1">
          Based on 90 days of your actual financial behaviour
        </p>
        <p className="text-[12px] text-scotia-grey-400 mt-1">
          Detected {LIVING_RISK_PROFILE.triggerDate}
        </p>
      </motion.div>

      {/* Block 2 — Signals */}
      <motion.div variants={itemVariants} className="mt-4">
        <h3 className="text-[15px] font-semibold text-scotia-grey-900 mb-3">Signals we noticed</h3>
        <div className="space-y-2">
          {LIVING_RISK_PROFILE.signals.map((signal, i) => {
            const Icon = signalIcons[i];
            return (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-scotia-grey-200">
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-scotia-green flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-scotia-grey-400">{signal.label}</p>
                    <p className="text-[13px] font-medium text-scotia-green">{signal.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Block 3 — Comparison */}
      <motion.div variants={itemVariants} className="mt-4">
        <h3 className="text-[15px] font-semibold text-scotia-grey-900 mb-3">Why this is different</h3>
        <div className="rounded-2xl overflow-hidden border border-scotia-grey-200 flex">
          <div className="flex-1 bg-scotia-grey-50 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <XCircle size={14} className="text-scotia-grey-400" />
              <span className="text-[11px] font-bold text-scotia-grey-400 uppercase">Other platforms</span>
            </div>
            <p className="text-[13px] text-scotia-grey-700">Ask you 5 questions once. Never update.</p>
          </div>
          <div className="flex-1 bg-scotia-red p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle size={14} className="text-white" />
              <span className="text-[11px] font-bold text-white uppercase">Scotia One</span>
            </div>
            <p className="text-[13px] text-white">Watches how you actually live. Updates with you.</p>
          </div>
        </div>
      </motion.div>

      {/* Block 4 — Recommendation */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl p-5 mt-4 border-l-4"
        style={{ borderLeftColor: '#EC111A' }}
      >
        <p className="text-[14px] text-scotia-grey-700 leading-relaxed">
          Based on how you've been living with money lately, your portfolio may be ready to take on
          slightly more growth. We recommend reviewing your allocation.
        </p>
        <div className="mt-4">
          <Button fullWidth onClick={handleReviewAllocation}>
            Review my allocation
          </Button>
        </div>
        <p className="text-[11px] text-scotia-grey-400 text-center mt-2">
          Any changes require your confirmation. This is not automatic.
        </p>
      </motion.div>

      {/* Block 5 — Quote */}
      <motion.div
        variants={itemVariants}
        className="border-t border-b border-scotia-grey-200 py-6 mt-4 text-center"
      >
        <p className="display-number text-[16px] text-scotia-grey-900 italic leading-relaxed">
          "Wealthsimple knows what you told them three years ago.
          <br />
          Scotia One knows how you live with money today."
        </p>
      </motion.div>
    </motion.div>
  );
}
