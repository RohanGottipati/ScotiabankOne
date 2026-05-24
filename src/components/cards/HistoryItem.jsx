export default function HistoryItem({ item, isFirst, isLast }) {
  const monthStr = item.shortDate.split(' ')[0].toUpperCase();
  const yearStr = item.shortDate.split(' ')[1];

  return (
    <div className="flex gap-3">
      {/* Left column — date */}
      <div className="w-[56px] flex-shrink-0 text-right pt-1">
        <p className="text-[11px] font-semibold text-scotia-grey-400 uppercase">{monthStr}</p>
        <p className="text-[10px] text-scotia-grey-400">{yearStr}</p>
      </div>

      {/* Center — timeline line */}
      <div className="flex flex-col items-center relative">
        <div className={`w-2.5 h-2.5 rounded-full z-10 ${
          item.status === 'completed' ? 'bg-scotia-green' : 'bg-scotia-red animate-pulse'
        }`} />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-scotia-grey-200 mt-0.5" />
        )}
      </div>

      {/* Right column — card */}
      <div className="flex-1 pb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-scotia-grey-200">
          <div className="flex items-center justify-between">
            <span className="text-[16px]">{item.icon}</span>
            <span className="text-[16px] font-bold text-scotia-green">
              ${item.amount.toFixed(2)}
            </span>
          </div>
          <p className="text-[13px] text-scotia-grey-700 mt-1.5">
            {item.description}
          </p>
          <div className="mt-2">
            {item.status === 'completed' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-scotia-green bg-scotia-green-light px-2 py-0.5 rounded-full">
                ✓ Invested
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-scotia-red px-2 py-0.5 rounded-full">
                ● Active
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
