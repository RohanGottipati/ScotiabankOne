import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { useCountUp } from '../hooks/useBalances';
import { TrendingUp } from 'lucide-react';

const CONFETTI_COLORS = ['#E31837', '#E31837', '#FFFFFF', '#4CAF50'];
const CONFETTI_COUNT = 25;

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.6}s`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    }))
  );

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.left, top: 0, animationDelay: p.delay,
            backgroundColor: p.color,
            border: p.color === '#FFFFFF' ? '1px solid #E0E0E0' : 'none',
          }}
        />
      ))}
    </>
  );
}

function BalanceRow({ label, oldValue, newValue, delay }) {
  const display = useCountUp(newValue, 500);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center justify-between py-2.5 px-4 bg-scotia-grey-50 rounded-xl"
    >
      <span className="text-[13px] text-scotia-grey-600 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-scotia-grey-400 line-through">${oldValue.toFixed(2)}</span>
        <span className="text-[13px] text-scotia-green font-semibold">
          ${display.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </motion.div>
  );
}

function CheckmarkAnimation() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="45" stroke="#4CAF50" strokeWidth="3" fill="#E8F5E9" className="check-circle" />
      <path d="M30 52 L43 65 L70 38" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" className="checkmark-path" />
    </svg>
  );
}

export default function ConfirmationScreen() {
  const navigate = useNavigate();
  const { balances, lastConfirmedAmount } = useApp();
  const oldChequing = balances.chequing + lastConfirmedAmount;
  const oldTfsa = balances.tfsa - lastConfirmedAmount;
  const [phase, setPhase] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowConfetti(true), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-full bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center">
        <CheckmarkAnimation />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-5">
          <p className="text-[28px] font-bold text-scotia-grey-900">${lastConfirmedAmount} Invested</p>
          <p className="text-[14px] text-scotia-grey-500 mt-1">in your TFSA</p>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full mt-6 space-y-2">
            <BalanceRow label="Chequing" oldValue={oldChequing} newValue={balances.chequing} delay={0} />
            <BalanceRow label="TFSA" oldValue={oldTfsa} newValue={balances.tfsa} delay={0.15} />
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.3 }} className="text-center pt-3">
              <div className="flex items-center justify-center gap-1.5 text-scotia-grey-500">
                <TrendingUp size={14} />
                <p className="text-[13px] font-medium">Net Worth: ${balances.netWorth.toFixed(2)}</p>
              </div>
              <p className="text-[11px] text-scotia-grey-400 italic mt-1">Total wealth unchanged — just working smarter.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full mt-6 space-y-3">
            <button onClick={() => navigate('/smart-trading')} className="w-full bg-scotia-red hover:bg-scotia-red-dark text-white font-semibold text-[15px] py-3.5 rounded-full transition-all cursor-pointer border-none shadow-lg shadow-scotia-red/20">
              Invest in a stock →
            </button>
            <button onClick={() => navigate('/')} className="w-full bg-white border-2 border-scotia-grey-200 text-scotia-grey-900 font-semibold text-[15px] py-3.5 rounded-full transition-all cursor-pointer hover:bg-scotia-grey-50">
              Back to Home
            </button>
            <button onClick={() => navigate('/history')} className="w-full text-[13px] text-scotia-red font-medium bg-transparent border-none cursor-pointer py-2">
              View Moments History
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
