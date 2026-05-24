import { motion } from 'framer-motion';
import { CreditCard, ArrowUpRight, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { USER } from '../data/mockData';
import NetWorthBanner from '../components/cards/NetWorthBanner';
import BalanceCard from '../components/cards/BalanceCard';
import MoneyMomentCard from '../components/cards/MoneyMomentCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function HomeScreen() {
  const navigate = useNavigate();
  const { balances, momentConfirmed } = useApp();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div
      className="px-4 py-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Greeting */}
      <motion.div variants={itemVariants}>
        <p className="text-[18px] font-medium text-scotia-grey-700">
          {greeting}, {USER.firstName}
        </p>
        <p className="text-[13px] text-scotia-grey-400 mt-0.5">{dateStr}</p>
      </motion.div>

      {/* Net Worth Banner */}
      <motion.div variants={itemVariants} className="mt-5">
        <NetWorthBanner />
      </motion.div>

      {/* Balance Cards */}
      <motion.div variants={itemVariants} className="flex gap-3 mt-4">
        <BalanceCard
          label="Chequing"
          value={balances.chequing}
          subline="Everyday account"
          accentColor="#EC111A"
          delay={0.2}
        />
        <BalanceCard
          label="TFSA"
          value={balances.tfsa}
          subline="Smart Investor"
          accentColor="#2E7D32"
          delay={0.3}
          navigateTo="/portfolio"
        />
      </motion.div>

      {/* AI Insights Section Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mt-6 mb-3">
        <h2 className="text-[16px] font-semibold text-scotia-grey-900">AI Insights</h2>
        {!momentConfirmed && (
          <span className="bg-scotia-red text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            1 new
          </span>
        )}
      </motion.div>

      {/* Money Moment Card */}
      <motion.div variants={itemVariants}>
        <MoneyMomentCard />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="flex gap-2 mt-4">
        <button className="flex items-center gap-1.5 bg-white border border-scotia-grey-200 rounded-full px-4 py-2 text-[13px] font-medium text-scotia-grey-700 cursor-pointer">
          <CreditCard size={16} /> Pay Bills
        </button>
        <button className="flex items-center gap-1.5 bg-white border border-scotia-grey-200 rounded-full px-4 py-2 text-[13px] font-medium text-scotia-grey-700 cursor-pointer">
          <ArrowUpRight size={16} /> Transfer
        </button>
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-1.5 bg-white border border-scotia-grey-200 rounded-full px-4 py-2 text-[13px] font-medium text-scotia-grey-700 cursor-pointer"
        >
          <BarChart3 size={16} /> Portfolio
        </button>
      </motion.div>
    </motion.div>
  );
}
