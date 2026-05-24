import { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { PORTFOLIO_CHART_DATA } from '../../data/mockData';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-scotia-grey-900 text-white px-3 py-2 rounded-lg text-[13px]">
        <p className="font-medium">{label}</p>
        <p className="display-number">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

const periods = ['1M', '3M', '6M', '1Y'];

export default function PortfolioChart() {
  const { momentConfirmed } = useApp();
  const [activePeriod, setActivePeriod] = useState('6M');

  const data = momentConfirmed
    ? [...PORTFOLIO_CHART_DATA, { month: 'May*', value: 3105 }]
    : PORTFOLIO_CHART_DATA;

  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex gap-2 mb-4">
        {periods.map(p => (
          <button
            key={p}
            onClick={() => setActivePeriod(p)}
            className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
              activePeriod === p
                ? 'bg-scotia-red text-white'
                : 'bg-scotia-grey-100 text-scotia-grey-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="tfsa-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC111A" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#EC111A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#9E9E9E', fontFamily: 'DM Sans' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#EC111A"
            strokeWidth={2.5}
            fill="url(#tfsa-gradient)"
            isAnimationActive={true}
            animationDuration={800}
            dot={(props) => {
              const { cx, cy, index } = props;
              if (index === data.length - 1) {
                return <circle cx={cx} cy={cy} r={5} fill="#EC111A" stroke="white" strokeWidth={2} />;
              }
              return null;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
