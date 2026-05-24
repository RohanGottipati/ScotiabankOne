import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConfirmationAnimation from '../components/ui/ConfirmationAnimation';
import Button from '../components/ui/Button';
import { useCountUp } from '../hooks/useBalances';

function Confetti() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.5}s`,
    color: i % 2 === 0 ? '#EC111A' : '#FFFFFF',
  }));

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.left,
            top: 0,
            animationDelay: p.delay,
            backgroundColor: p.color,
            border: p.color === '#FFFFFF' ? '1px solid #E0E0E0' : 'none',
          }}
        />
      ))}
    </>
  );
}

function BalanceRow({ label, oldValue, newValue, delay }) {
  const display = useCountUp(newValue, 600);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center justify-between py-2"
    >
      <span className="text-[14px] text-scotia-grey-700 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[14px] text-scotia-grey-400 line-through">
          ${oldValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        <span className="text-[14px] text-scotia-grey-400">→</span>
        <span className="text-[14px] text-scotia-green font-semibold">
          ${display.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </motion.div>
  );
}

export default function ConfirmationScreen() {
  const navigate = useNavigate();
  const { balances } = useApp();
  const [phase, setPhase] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowConfetti(true), 800);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Phase 1 — Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center"
      >
        <ConfirmationAnimation />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="display-number text-[32px] text-scotia-grey-900">$25 Invested</p>
          <p className="text-[16px] text-scotia-grey-700 mt-1">in your TFSA</p>
        </motion.div>
      </motion.div>

      {/* Phase 2 — Balance Updates */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mt-8 border-t border-scotia-grey-100 pt-4"
          >
            <BalanceRow label="Chequing" oldValue={1240} newValue={balances.chequing} delay={0} />
            <BalanceRow label="TFSA" oldValue={3000} newValue={balances.tfsa} delay={0.2} />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-4 text-center"
            >
              <p className="text-[14px] font-medium text-scotia-grey-900">
                Total Net Worth: ${balances.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[12px] text-scotia-grey-400 italic mt-1">
                Your total wealth didn't change — it just went to work.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3 — Navigation */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-8"
          >
            <Button fullWidth onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <p
              className="text-center mt-3 text-[14px] text-scotia-red font-medium cursor-pointer"
              onClick={() => navigate('/history')}
            >
              View Moments History →
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
