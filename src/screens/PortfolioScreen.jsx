import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PORTFOLIO_HOLDINGS, LIVING_RISK_PROFILE } from '../data/mockData';
import PortfolioChart from '../components/charts/PortfolioChart';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function PortfolioScreen() {
  const navigate = useNavigate();
  const { balances, momentConfirmed } = useApp();

  const holding = PORTFOLIO_HOLDINGS[0];
  const holdingValue = momentConfirmed ? balances.tfsa : holding.value;
  const changeLabel = momentConfirmed ? '+$105 since March · +3.5%' : '+$80 since March · +2.7%';
  const changePercent = momentConfirmed ? '+3.5%' : holding.change;

  return (
    <motion.div
      className="px-4 py-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-[22px] font-bold text-scotia-grey-900">My Investments</h1>
        <p className="text-[13px] text-scotia-grey-400 mt-0.5">Scotia Smart Investor TFSA</p>
      </motion.div>

      {/* TFSA Summary */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-6 mt-4"
        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)' }}
      >
        <p className="text-[11px] text-white/60 uppercase tracking-[1px]">TFSA Balance</p>
        <p className="display-number text-[36px] text-white mt-1">
          ${balances.tfsa.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[13px] font-medium mt-1" style={{ color: '#4CAF50' }}>
          {changeLabel}
        </p>
      </motion.div>

      {/* Chart */}
      <motion.div variants={itemVariants} className="mt-3">
        <PortfolioChart />
      </motion.div>

      {/* Holdings */}
      <motion.div variants={itemVariants} className="mt-4">
        <h2 className="text-[16px] font-semibold text-scotia-grey-900 mb-3">Holdings</h2>
        <div className="bg-white rounded-2xl p-4 border border-scotia-grey-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-scotia-grey-900">{holding.name}</p>
              <p className="text-[12px] text-scotia-grey-400 mt-0.5">{holding.type} · TFSA</p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-semibold text-scotia-grey-900">
                ${holdingValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <span className="inline-block text-[12px] font-medium text-scotia-green bg-scotia-green-light px-2 py-0.5 rounded-full mt-0.5">
                {changePercent}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Profile Notification */}
      {LIVING_RISK_PROFILE.triggered && (
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-4 mt-4 border"
          style={{ backgroundColor: '#FFF8E1', borderColor: '#E65100' }}
        >
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-scotia-amber flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-bold text-scotia-grey-900">Your financial profile has changed</p>
              <p className="text-[13px] text-scotia-grey-700 mt-1">
                Your income and spending patterns suggest your portfolio may be ready to grow.
              </p>
              <button
                onClick={() => navigate('/risk-profile')}
                className="text-[13px] font-semibold text-scotia-red mt-2 bg-transparent border-none cursor-pointer p-0"
              >
                Review my profile →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
