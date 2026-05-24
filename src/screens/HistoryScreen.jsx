import { motion } from 'framer-motion';
import { ArrowLeft, Zap, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';

export default function HistoryScreen() {
  const navigate = useNavigate();
  const { history, totalFoundThisYear, momentConfirmed } = useApp();
  const momentCount = momentConfirmed ? 4 : 3;

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
        <h1 className="text-[20px] font-bold text-scotia-grey-900">Scene+</h1>
      </div>

      {/* Summary Banner */}
      <div className="rounded-2xl p-5 text-white mb-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E31837, #C41230)' }}>
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-white/70" fill="white" />
          <p className="text-[10px] text-white/60 uppercase tracking-[1px] font-semibold">Found this year</p>
        </div>
        <p className="text-[32px] font-bold text-white leading-tight">${totalFoundThisYear.toFixed(2)}</p>
        <p className="text-[12px] text-white/70 font-medium mt-1">{momentCount} Money Moments &middot; All invested in TFSA</p>
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
      </div>

      {/* History List */}
      <div className="mb-5">
        <h2 className="text-[13px] font-semibold text-scotia-grey-600 uppercase tracking-[0.5px] mb-3">History</h2>
        <div className="bg-white rounded-2xl border border-scotia-grey-100 overflow-hidden shadow-sm">
          {history.map((item, index) => {
            const isCompleted = item.status === 'completed';
            const isLast = index === history.length - 1;

            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 ${!isLast ? 'border-b border-scotia-grey-100' : ''} hover:bg-scotia-grey-50 transition-colors cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-scotia-green-light' : 'bg-scotia-grey-100'
                }`}>
                  {isCompleted ? <CheckCircle size={18} className="text-scotia-green" /> : <Clock size={18} className="text-scotia-grey-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-scotia-grey-900 truncate">{item.description}</p>
                  <p className="text-[11px] text-scotia-grey-500 mt-0.5">{item.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[14px] font-semibold text-scotia-grey-900">${item.amount.toFixed(2)}</p>
                  <p className={`text-[10px] font-medium uppercase tracking-[0.5px] ${isCompleted ? 'text-scotia-green' : 'text-scotia-amber'}`}>
                    {isCompleted ? 'Invested' : 'Pending'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lock-in */}
      <div className="rounded-2xl p-4 bg-scotia-grey-100 border border-scotia-grey-200 text-center">
        <p className="text-[13px] font-medium text-scotia-grey-700">
          Money Moments are exclusive to Scotia One.
        </p>
        <p className="text-[11px] text-scotia-grey-500 mt-1">
          Your history stays with you, wherever you bank.
        </p>
      </div>
    </motion.div>
  );
}
