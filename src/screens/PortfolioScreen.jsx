import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, ChevronRight, ArrowLeft, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import { PORTFOLIO_HOLDINGS, LIVING_RISK_PROFILE, PORTFOLIO_CHART_DATA } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-scotia-grey-100">
        <p className="text-[11px] font-semibold text-scotia-grey-900">{label}</p>
        <p className="text-[14px] font-bold text-scotia-green">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function PortfolioScreen() {
  const navigate = useNavigate();
  const { balances, momentConfirmed } = useApp();
  const holding = PORTFOLIO_HOLDINGS[0];
  const holdingValue = momentConfirmed ? balances.tfsa : holding.value;
  const holdingGain = momentConfirmed ? '+$105' : '+$80';
  const data = PORTFOLIO_CHART_DATA;
  const values = data.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.1;

  return (
    <motion.div
      className="px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/')} className="bg-transparent border-none cursor-pointer p-1 -ml-1 text-scotia-grey-700">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-[20px] font-bold text-scotia-grey-900">Advice+</h1>
      </div>

      {/* TFSA Summary */}
      <div className="rounded-2xl p-5 text-white mb-4" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)' }}>
        <p className="text-[11px] text-white/50 uppercase tracking-[1px] font-semibold mb-1">TFSA Balance</p>
        <p className="text-[32px] font-bold text-white leading-tight">
          ${balances.tfsa.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <TrendingUp size={14} className="text-scotia-green" />
          <span className="text-[13px] font-medium text-scotia-green">{holdingGain} since March</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-4 border border-scotia-grey-100 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[12px] font-semibold text-scotia-grey-600 uppercase tracking-[0.5px]">Performance</p>
          <span className="text-[11px] font-medium text-scotia-green">+2.7%</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="pfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9E9E9E' }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9E9E9E' }} domain={[minVal - padding, maxVal + padding]} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} dx={-4} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} fill="url(#pfGrad)" dot={false} activeDot={{ r: 4, fill: '#4CAF50', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Holdings */}
      <div className="mb-4">
        <h2 className="text-[13px] font-semibold text-scotia-grey-600 uppercase tracking-[0.5px] mb-3">Holdings</h2>
        <div className="bg-white rounded-2xl p-4 border border-scotia-grey-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-scotia-grey-900">{holding.name}</p>
              <p className="text-[12px] text-scotia-grey-500 mt-0.5">{holding.type} &middot; TFSA</p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-semibold text-scotia-grey-900">${holdingValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              <span className="inline-flex items-center gap-0.5 text-[12px] font-medium text-scotia-green mt-0.5">
                <TrendingUp size={12} /> +2.7%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Profile Alert */}
      {LIVING_RISK_PROFILE.triggered && (
        <div className="rounded-2xl p-4 border border-scotia-amber/30 mb-4 shadow-sm" style={{ backgroundColor: '#FFF8E1' }}>
          <div className="flex gap-3">
            <AlertCircle size={18} className="text-scotia-amber flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[13px] font-bold text-scotia-grey-900">Profile update available</p>
              <p className="text-[12px] text-scotia-grey-600 mt-1 leading-relaxed">Your financial behaviour suggests your portfolio may be ready to grow.</p>
              <button onClick={() => navigate('/risk-profile')} className="flex items-center gap-1 text-[12px] font-semibold text-scotia-red mt-2 bg-transparent border-none cursor-pointer p-0">
                Review <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Investing CTA */}
      <div className="bg-white rounded-2xl p-4 border border-scotia-grey-100 shadow-sm text-center">
        <DollarSign size={24} className="text-scotia-teal mx-auto mb-2" />
        <p className="text-[14px] font-semibold text-scotia-grey-900">Ready to grow?</p>
        <p className="text-[12px] text-scotia-grey-500 mt-1 mb-3">Start investing with as little as $50</p>
        <button className="bg-scotia-red hover:bg-scotia-red-dark text-white font-semibold text-[13px] px-5 py-2.5 rounded-full transition-all cursor-pointer border-none">
          Open an investment account
        </button>
      </div>
    </motion.div>
  );
}
