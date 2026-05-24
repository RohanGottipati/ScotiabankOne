import { Wifi, BatteryFull, Signal, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BankNotification({ onClick }) {
  return (
    <div
      className="w-full cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      <div className="relative backdrop-blur-2xl bg-white/20 rounded-[2rem] p-4 shadow-2xl border border-white/30">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-[52px] h-[52px] bg-[#EC1C24] rounded-[12px] flex items-center justify-center shadow-lg">
                <img src="/icon.webp" alt="Scotiabank" className="w-8 h-8 object-contain" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-gray-700 rounded-md flex items-center justify-center border-2 border-white/40 shadow-md">
                <Wallet size={11} className="text-white" strokeWidth={2.5} />
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-white text-[13px] font-semibold tracking-tight">
                Scotiabank · Scotia One
              </h3>
              <p className="text-white text-[13px] font-medium tracking-tight leading-tight">
                Money Moment detected
              </p>
              <p className="text-white/90 text-[13px] leading-snug mt-0.5">
                You spent $80 less on dining. $25 ready to invest.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 self-start">
            <p className="text-white/80 text-[12px] font-medium tracking-tight">now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotificationScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden" style={{ marginTop: '-35px', height: 'calc(100% + 35px)' }}>
      {/* Black background covering notch + content */}
      <div className="absolute inset-0 bg-black" />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-12 pb-1">
          <span className="text-white text-[13px] font-semibold">Public Mobile</span>
          <div className="flex items-center gap-1.5">
            <Signal size={14} className="text-white" fill="white" />
            <Wifi size={14} className="text-white" fill="white" />
            <BatteryFull size={20} className="text-white" fill="white" />
          </div>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <p className="text-white text-[16px] font-medium tracking-wide mb-1">Sat May 24</p>
          <div className="text-white text-[96px] font-light leading-none tracking-tight">1:12</div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Notification + shortcuts pinned to bottom */}
        <div className="px-4 pb-3">
          <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest text-center mb-3">
            Notifications
          </p>
          <BankNotification onClick={() => navigate('/splash')} />
        </div>

        <div className="flex items-center justify-between px-12 pb-6">
          <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border-none cursor-pointer">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 2h6v7l5 3v10H4V12l5-3V2zm2 2v6.5l-5 3V20h12v-8.5l-5-3V4h-2z" />
            </svg>
          </button>
          <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border-none cursor-pointer">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center pb-4">
          <div className="w-28 h-1 bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
}
