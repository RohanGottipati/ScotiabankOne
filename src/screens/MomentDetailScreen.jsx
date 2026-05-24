import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ACTIVE_MOMENT, BALANCES } from '../data/mockData';
import Button from '../components/ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function MomentDetailScreen() {
  const navigate = useNavigate();
  const { confirmMoment } = useApp();
  const [amount, setAmount] = useState(ACTIVE_MOMENT.suggestedAmount);
  const [loading, setLoading] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      confirmMoment(amount);
      navigate('/confirm');
    }, 800);
  };

  const usedRoom = 800;
  const totalRoom = BALANCES.tfsaRoomRemaining + usedRoom;
  const usedPercent = (usedRoom / totalRoom) * 100;
  const addPercent = (amount / totalRoom) * 100;

  return (
    <motion.div
      className="px-4 py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate('/')} className="cursor-pointer bg-transparent border-none">
          <ChevronLeft size={24} className="text-scotia-grey-900" />
        </button>
        <h1 className="text-[18px] font-bold text-scotia-grey-900">Money Moment</h1>
      </motion.div>

      {/* Block 1 — Insight Explanation */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5">
        <div className="text-center">
          <span className="text-[40px]">{ACTIVE_MOMENT.icon}</span>
          <h2 className="text-[20px] font-bold text-scotia-grey-900 mt-2">Dining Surplus Detected</h2>
          <p className="text-[13px] text-scotia-grey-400 mt-1">{ACTIVE_MOMENT.detectedDate}</p>
        </div>

        <div className="border-t border-scotia-grey-100 my-4" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[13px] text-scotia-grey-400">Your 90-day dining average</span>
            <span className="text-[13px] font-semibold text-scotia-grey-900">$180/month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[13px] text-scotia-grey-400">This month's dining spend</span>
            <span className="text-[13px] font-semibold text-scotia-green">$100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[13px] text-scotia-grey-400">Surplus detected</span>
            <span className="text-[13px] font-bold text-scotia-red">${ACTIVE_MOMENT.surplusAmount}</span>
          </div>
        </div>

        <div className="bg-scotia-red-light rounded-xl p-3 mt-4">
          <p className="text-[12px] font-semibold text-scotia-red uppercase">Suggested investment</p>
          <p className="display-number text-[28px] text-scotia-red">${amount}</p>
          <p className="text-[11px] text-scotia-grey-400">(30% of surplus — conservative default)</p>
        </div>
      </motion.div>

      {/* Block 2 — TFSA Room Check */}
      <motion.div variants={itemVariants} className="bg-scotia-green-light rounded-2xl p-4 mt-3">
        <div className="flex items-center gap-2">
          <CheckCircle size={18} className="text-scotia-green" />
          <span className="text-[14px] font-semibold text-scotia-green">TFSA Contribution Room Check</span>
        </div>
        <p className="text-[15px] font-medium text-scotia-grey-900 mt-2">
          ${BALANCES.tfsaRoomRemaining.toLocaleString()} remaining in your {BALANCES.tfsaRoomYear} TFSA room
        </p>
        <p className="text-[13px] text-scotia-grey-700 mt-1">
          Investing ${amount} keeps you well within your limit
        </p>

        <div className="mt-3">
          <div className="w-full h-2 bg-scotia-grey-200 rounded-full overflow-hidden">
            <div className="h-full rounded-full flex">
              <div className="bg-scotia-red" style={{ width: `${usedPercent}%` }} />
              <div className="bg-scotia-red opacity-50" style={{ width: `${addPercent}%` }} />
            </div>
          </div>
          <p className="text-[12px] text-scotia-grey-400 mt-1">
            After this investment: ${(BALANCES.tfsaRoomRemaining - amount).toLocaleString()} remaining
          </p>
        </div>
      </motion.div>

      {/* Block 3 — What Happens */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-4 mt-3">
        <h3 className="text-[14px] font-semibold text-scotia-grey-900 mb-3">What happens when you confirm</h3>
        <div className="space-y-2.5">
          {[
            `$${amount} moves from Chequing to your TFSA`,
            'Invested in Scotia Selected Balanced Portfolio',
            'Your money stays fully accessible',
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <ArrowRight size={14} className="text-scotia-grey-400 flex-shrink-0" />
              <span className="text-[13px] text-scotia-grey-700">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Block 4 — Disclaimer */}
      <motion.div variants={itemVariants} className="px-4 mt-3">
        <p className="text-[11px] text-scotia-grey-400 text-center leading-relaxed">
          {ACTIVE_MOMENT.disclaimer}
        </p>
      </motion.div>

      {/* Block 5 — CTA */}
      <motion.div variants={itemVariants} className="mt-4">
        <Button fullWidth loading={loading} onClick={handleConfirm} className="shadow-lg">
          Sweep ${amount} to My TFSA
        </Button>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-2 text-center text-[14px] text-scotia-grey-400 font-medium bg-transparent border-none cursor-pointer py-2"
        >
          Not right now
        </button>

        <div className="text-center mt-2">
          <button
            onClick={() => setShowSlider(!showSlider)}
            className="text-[13px] text-scotia-grey-400 bg-transparent border-none cursor-pointer"
          >
            Investing a different amount? <span className="text-scotia-red underline">Edit</span>
          </button>
        </div>

        {showSlider && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 px-2"
          >
            <input
              type="range"
              min={10}
              max={ACTIVE_MOMENT.surplusAmount}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-scotia-red"
            />
            <div className="flex justify-between text-[12px] text-scotia-grey-400">
              <span>$10</span>
              <span className="font-semibold text-scotia-red">${amount}</span>
              <span>${ACTIVE_MOMENT.surplusAmount}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
