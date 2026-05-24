import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronLeft, Search, TrendingUp, TrendingDown, Star, BarChart3, Activity, Wallet, Settings, Bell, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';

// ─── Stock reference data (prices / fundamentals) ────────────────────────────

const STOCK_DATA = {
  AAPL:  { name: 'Apple Inc.',             price: 178.25, change: 2.35,  changePercent: 1.34,  high: 179.5,  low: 175.8, open: 176.2, volume: '52.3M', marketCap: '2.78T', pe: 29.5, about: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.' },
  MSFT:  { name: 'Microsoft Corp.',        price: 378.90, change: 1.55,  changePercent: 0.41,  high: 380.2,  low: 376.5, open: 377.8, volume: '28.1M', marketCap: '2.82T', pe: 35.2, about: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.' },
  GOOGL: { name: 'Alphabet Inc.',          price: 142.65, change: -1.20, changePercent: -0.83, high: 144.3,  low: 142.1, open: 143.8, volume: '31.5M', marketCap: '1.79T', pe: 26.8, about: 'Alphabet Inc. provides various products and services across the Americas, EMEA, and APAC.' },
  TSLA:  { name: 'Tesla Inc.',             price: 245.80, change: 3.20,  changePercent: 1.32,  high: 248.5,  low: 242.3, open: 243.5, volume: '98.2M', marketCap: '779B',  pe: 68.4, about: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles and energy storage systems.' },
  NVDA:  { name: 'NVIDIA Corp.',           price: 495.30, change: 8.60,  changePercent: 1.77,  high: 498.2,  low: 488.5, open: 490.2, volume: '45.7M', marketCap: '1.22T', pe: 72.3, about: 'NVIDIA Corporation provides graphics, compute and networking solutions globally.' },
  AMD:   { name: 'Advanced Micro Devices', price: 165.40, change: 2.80,  changePercent: 1.72,  high: 167.2,  low: 163.5, open: 164.3, volume: '62.4M', marketCap: '267B',  pe: 45.6, about: 'Advanced Micro Devices, Inc. operates as a semiconductor company worldwide.' },
  AMZN:  { name: 'Amazon.com Inc.',        price: 178.35, change: -1.20, changePercent: -0.67, high: 180.5,  low: 177.8, open: 179.6, volume: '41.8M', marketCap: '1.85T', pe: 58.9, about: 'Amazon.com, Inc. engages in retail, cloud computing, and digital streaming worldwide.' },
  META:  { name: 'Meta Platforms Inc.',    price: 485.20, change: 5.40,  changePercent: 1.13,  high: 488.0,  low: 481.0, open: 482.5, volume: '38.2M', marketCap: '1.24T', pe: 27.1, about: 'Meta Platforms builds technologies that help people connect, find communities, and grow businesses.' },
};

const WATCHLIST_SYMBOLS = ['AMD', 'AMZN'];

// ─── Deterministic chart data ─────────────────────────────────────────────────

function seeded(n) { const x = Math.sin(n + 1) * 10000; return x - Math.floor(x); }

function generateChartData(symbol, basePrice, changePercent, timeframe) {
  const counts = { '1D': 78, '1W': 35, '1M': 30, '3M': 90, '1Y': 52, 'ALL': 60 };
  const n = counts[timeframe] ?? 30;
  const seed = symbol.split('').reduce((a, c) => a + c.charCodeAt(0), 0) + timeframe.length * 13;
  const startPrice = basePrice / (1 + changePercent / 100);
  const data = [];
  let price = startPrice;
  for (let i = 0; i < n; i++) {
    const trend = (basePrice - price) / Math.max(n - i, 1);
    const noise = (seeded(seed + i * 7.3) - 0.48) * basePrice * 0.012;
    price = Math.max(price + trend + noise, basePrice * 0.7);
    data.push({ i, price: parseFloat(price.toFixed(2)) });
  }
  data.push({ i: n, price: basePrice });
  return data;
}

// ─── BuySellModal ─────────────────────────────────────────────────────────────

function BuySellModal({ type, symbol, onClose }) {
  const { balances, hasTfsa, buyStock, sellStock, tradingHoldings } = useApp();
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [account, setAccount] = useState('chequing');
  const s = STOCK_DATA[symbol] ?? STOCK_DATA.AAPL;
  const qty = parseFloat(quantity || '0');
  const estimated = qty * s.price;
  const holding = tradingHoldings.find(h => h.symbol === symbol);

  const ACCOUNTS = [
    { key: 'chequing', label: 'Chequing', last4: '7286', balance: balances.chequing },
    { key: 'savings',  label: 'Savings',  last4: '4518', balance: balances.savings },
    ...(hasTfsa ? [{ key: 'tfsa', label: 'TFSA', last4: '2183', balance: balances.tfsa }] : []),
  ];

  const selectedAccount = ACCOUNTS.find(a => a.key === account) ?? ACCOUNTS[0];

  const handleSubmit = () => {
    if (qty <= 0) return;
    if (type === 'buy') buyStock(symbol, qty, s.price, account);
    else sellStock(symbol, qty, s.price, account);
    onClose();
  };

  const canSubmit = qty > 0 && (orderType === 'market' || limitPrice) &&
    (type === 'sell' ? (holding?.shares ?? 0) >= qty : selectedAccount.balance >= estimated);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl overflow-hidden" style={{ animation: 'slideUp .3s ease-out' }}>
        <div className="px-5 py-4 border-b border-scotia-grey-100 flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-scotia-grey-900">{type === 'buy' ? 'Buy' : 'Sell'} {symbol}</h2>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer"><X size={20} className="text-scotia-grey-600" /></button>
        </div>
        <div className="px-5 py-5 max-h-[72vh] overflow-y-auto bg-scotia-grey-50 space-y-4">
          <div>
            <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase mb-2">Order Type</p>
            <div className="flex gap-2">
              {['market', 'limit'].map(t => (
                <button key={t} onClick={() => setOrderType(t)}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-[13px] border-none cursor-pointer transition-colors ${orderType === t ? 'bg-scotia-red text-white' : 'bg-white border border-scotia-grey-200 text-scotia-grey-700'}`}>
                  {t === 'market' ? 'Market' : 'Limit'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase mb-2">Shares</p>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="0" min="0"
              className="w-full px-4 py-3 bg-white border-2 border-scotia-grey-200 rounded-xl text-[17px] font-semibold focus:border-scotia-red focus:outline-none" />
          </div>

          {orderType === 'limit' && (
            <div>
              <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase mb-2">Limit Price</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[17px] font-semibold text-scotia-grey-400">$</span>
                <input type="number" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder="0.00" step="0.01"
                  className="w-full pl-8 pr-4 py-3 bg-white border-2 border-scotia-grey-200 rounded-xl text-[17px] font-semibold focus:border-scotia-red focus:outline-none" />
              </div>
            </div>
          )}

          <div className="bg-white border border-scotia-grey-100 rounded-xl p-4 space-y-2 divide-y divide-scotia-grey-100">
            <div className="flex justify-between pb-2">
              <span className="text-[13px] text-scotia-grey-500">Market Price</span>
              <span className="text-[13px] font-bold text-scotia-grey-900">${s.price.toFixed(2)}</span>
            </div>
            {qty > 0 && (
              <div className="flex justify-between pt-2">
                <span className="text-[13px] font-semibold text-scotia-grey-700">Est. {type === 'buy' ? 'Cost' : 'Proceeds'}</span>
                <span className="text-[15px] font-bold text-scotia-grey-900">${estimated.toFixed(2)}</span>
              </div>
            )}
          </div>

          {type === 'buy' && (
            <div>
              <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase mb-2">Pay from</p>
              <div className="space-y-2">
                {ACCOUNTS.map(acc => (
                  <button key={acc.key} onClick={() => setAccount(acc.key)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors bg-white ${account === acc.key ? 'border-scotia-red' : 'border-scotia-grey-200'}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border-2 ${account === acc.key ? 'border-scotia-red bg-scotia-red' : 'border-scotia-grey-300'}`} />
                      <span className="text-[14px] font-medium text-scotia-grey-900">{acc.label} ({acc.last4})</span>
                    </div>
                    <span className="text-[13px] font-semibold text-scotia-grey-700">
                      ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {type === 'sell' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between">
              <span className="text-[13px] text-scotia-grey-700">Shares owned</span>
              <span className="text-[13px] font-bold text-scotia-grey-900">{holding?.shares ?? 0} shares</span>
            </div>
          )}

          {type === 'buy' && qty > 0 && estimated > selectedAccount.balance && (
            <p className="text-[12px] text-scotia-red font-medium text-center">Insufficient funds in {selectedAccount.label}</p>
          )}
          {type === 'sell' && qty > 0 && qty > (holding?.shares ?? 0) && (
            <p className="text-[12px] text-scotia-red font-medium text-center">You only own {holding?.shares ?? 0} shares</p>
          )}

          <button onClick={handleSubmit} disabled={!canSubmit}
            className="w-full bg-scotia-red text-white py-3.5 rounded-xl font-semibold text-[15px] border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-scotia-red-dark">
            Confirm {type === 'buy' ? 'Buy' : 'Sell'} Order
          </button>
          <p className="text-[11px] text-scotia-grey-400 text-center leading-relaxed pb-2">
            By placing this order you agree to Scotia Smart Trading's terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PortfolioDashboard ───────────────────────────────────────────────────────

function PortfolioDashboard({ onSelectStock, onBuySell }) {
  const { balances, tradingHoldings } = useApp();

  const totalValue = tradingHoldings.reduce((sum, h) => {
    const s = STOCK_DATA[h.symbol];
    return sum + (s ? s.price * h.shares : 0);
  }, 0);

  const totalCost = tradingHoldings.reduce((sum, h) => sum + h.avgCost * h.shares, 0);
  const totalGain = totalValue - totalCost;
  const dayChange = tradingHoldings.reduce((sum, h) => {
    const s = STOCK_DATA[h.symbol];
    return sum + (s ? s.change * h.shares : 0);
  }, 0);
  const dayChangePct = totalValue > 0 ? (dayChange / (totalValue - dayChange)) * 100 : 0;

  return (
    <div className="pb-6 px-4 pt-4 space-y-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-scotia-grey-100">
        <p className="text-[12px] text-scotia-grey-500 mb-1">Total Portfolio Value</p>
        <p className="text-[28px] font-bold text-scotia-grey-900 mb-2">
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2">
          {dayChange >= 0 ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-scotia-red" />}
          <span className={`text-[14px] font-semibold ${dayChange >= 0 ? 'text-green-600' : 'text-scotia-red'}`}>
            {dayChange >= 0 ? '+' : ''}${Math.abs(dayChange).toFixed(2)} ({dayChange >= 0 ? '+' : ''}{dayChangePct.toFixed(2)}%) Today
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-scotia-grey-100">
          <p className="text-[11px] text-scotia-grey-500 mb-1">Buying Power</p>
          <p className="text-[16px] font-bold text-scotia-grey-900">
            ${balances.chequing.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[10px] text-scotia-grey-400 mt-0.5">From chequing</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-scotia-grey-100">
          <p className="text-[11px] text-scotia-grey-500 mb-1">Total Gain/Loss</p>
          <p className={`text-[16px] font-bold ${totalGain >= 0 ? 'text-green-600' : 'text-scotia-red'}`}>
            {totalGain >= 0 ? '+' : ''}${totalGain.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-bold text-scotia-grey-900">Holdings ({tradingHoldings.length})</h2>
          <button onClick={() => onBuySell('buy', '')} className="flex items-center gap-1 text-scotia-red font-semibold text-[13px] bg-transparent border-none cursor-pointer">
            <Plus size={14} /> Add Position
          </button>
        </div>
        {tradingHoldings.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-scotia-grey-100">
            <p className="text-[14px] text-scotia-grey-500">No holdings yet. Start by adding a position.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tradingHoldings.map(h => {
              const s = STOCK_DATA[h.symbol];
              if (!s) return null;
              const value = s.price * h.shares;
              const gainLoss = (s.price - h.avgCost) * h.shares;
              return (
                <button key={h.symbol} onClick={() => onSelectStock(h.symbol)}
                  className="w-full bg-white border border-scotia-grey-100 rounded-2xl p-4 text-left shadow-sm hover:bg-scotia-grey-50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[15px] font-bold text-scotia-grey-900">{h.symbol}</p>
                      <p className="text-[12px] text-scotia-grey-500">{s.name}</p>
                      <p className="text-[11px] text-scotia-grey-400 mt-0.5">{h.shares} shares</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[15px] font-bold text-scotia-grey-900">${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p className={`text-[13px] font-semibold ${s.change >= 0 ? 'text-green-600' : 'text-scotia-red'}`}>
                        {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} ({s.changePercent >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%)
                      </p>
                      <p className={`text-[11px] ${gainLoss >= 0 ? 'text-green-600' : 'text-scotia-red'}`}>
                        {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} total
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px] text-scotia-grey-400 pt-2 border-t border-scotia-grey-100">
                    <span>Avg ${h.avgCost.toFixed(2)}</span>
                    <span>Current ${s.price.toFixed(2)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-[16px] font-bold text-scotia-grey-900 mb-3">Watchlist</h2>
        <div className="space-y-2">
          {WATCHLIST_SYMBOLS.map(sym => {
            const s = STOCK_DATA[sym];
            return (
              <button key={sym} onClick={() => onSelectStock(sym)}
                className="w-full bg-white border border-scotia-grey-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-scotia-grey-50 transition-colors cursor-pointer">
                <div className="text-left">
                  <p className="text-[15px] font-bold text-scotia-grey-900">{sym}</p>
                  <p className="text-[12px] text-scotia-grey-500">{s.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[15px] font-bold text-scotia-grey-900">${s.price.toFixed(2)}</p>
                  <p className={`text-[13px] font-semibold ${s.change >= 0 ? 'text-green-600' : 'text-scotia-red'}`}>
                    {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} ({s.changePercent >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%)
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── StockDetail ──────────────────────────────────────────────────────────────

function StockDetail({ symbol, onBack, onBuySell }) {
  const { tradingHoldings } = useApp();
  const [timeframe, setTimeframe] = useState('1D');
  const s = STOCK_DATA[symbol] ?? STOCK_DATA.AAPL;
  const isPositive = s.change >= 0;
  const color = isPositive ? '#4CAF50' : '#E31837';
  const holding = tradingHoldings.find(h => h.symbol === symbol);

  const chartData = useMemo(
    () => generateChartData(symbol, s.price, s.changePercent, timeframe),
    [symbol, s.price, s.changePercent, timeframe]
  );

  const minP = Math.min(...chartData.map(d => d.price));
  const maxP = Math.max(...chartData.map(d => d.price));
  const domain = [minP * 0.998, maxP * 1.002];

  return (
    <div className="pb-6">
      <div className="px-5 py-3 flex items-center justify-between bg-white border-b border-scotia-grey-100">
        <button onClick={onBack} className="p-1 bg-transparent border-none cursor-pointer"><ChevronLeft size={22} className="text-scotia-grey-700" /></button>
        <div className="text-center">
          <p className="text-[16px] font-bold text-scotia-grey-900">{symbol}</p>
          <p className="text-[11px] text-scotia-grey-500">{s.name}</p>
        </div>
        <button className="p-1 bg-transparent border-none cursor-pointer"><Star size={20} className="text-scotia-grey-400" /></button>
      </div>

      <div className="px-5 py-4 bg-white border-b border-scotia-grey-100">
        <p className="text-[32px] font-bold text-scotia-grey-900 mb-1">${s.price.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          {isPositive ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-scotia-red" />}
          <span className={`text-[15px] font-semibold`} style={{ color }}>
            {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)} ({s.changePercent >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%) Today
          </span>
        </div>
        {holding && (
          <div className="mt-2 pt-2 border-t border-scotia-grey-100 flex justify-between text-[12px]">
            <span className="text-scotia-grey-500">You own <b className="text-scotia-grey-900">{holding.shares} shares</b></span>
            <span className="text-scotia-grey-500">Avg cost <b className="text-scotia-grey-900">${holding.avgCost.toFixed(2)}</b></span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="px-4 pt-4 pb-2 bg-white mb-2">
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id={`grad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="i" hide />
            <YAxis domain={domain} hide />
            <Tooltip
              formatter={(v) => [`$${v.toFixed(2)}`, symbol]}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #eee' }}
              itemStyle={{ color: '#424242' }}
            />
            <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill={`url(#grad-${symbol})`} dot={false} activeDot={{ r: 4, fill: color }} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex gap-1.5 mt-3">
          {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(tf => (
            <button key={tf} onClick={() => setTimeframe(tf)}
              className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold border-none cursor-pointer transition-colors ${timeframe === tf ? 'bg-scotia-red text-white' : 'bg-scotia-grey-100 text-scotia-grey-600'}`}>
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="px-5 py-4 bg-white mb-2">
        <h3 className="text-[15px] font-bold text-scotia-grey-900 mb-3">Key Statistics</h3>
        <div className="grid grid-cols-2 gap-2">
          {[['Open', `$${s.open.toFixed(2)}`], ['High', `$${s.high.toFixed(2)}`], ['Low', `$${s.low.toFixed(2)}`], ['Volume', s.volume], ['Market Cap', `$${s.marketCap}`], ['P/E Ratio', s.pe]].map(([label, val]) => (
            <div key={label} className="bg-scotia-grey-50 rounded-xl p-3">
              <p className="text-[11px] text-scotia-grey-500 mb-0.5">{label}</p>
              <p className="text-[14px] font-semibold text-scotia-grey-900">{val}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 bg-white mb-4">
        <h3 className="text-[15px] font-bold text-scotia-grey-900 mb-2">About {symbol}</h3>
        <p className="text-[13px] text-scotia-grey-600 leading-relaxed">{s.about}</p>
      </div>

      <div className="px-5 flex gap-3">
        <button onClick={() => onBuySell('buy')} className="flex-1 bg-scotia-red text-white py-3.5 rounded-xl font-semibold text-[15px] border-none cursor-pointer hover:bg-scotia-red-dark transition-colors">
          Buy {symbol}
        </button>
        <button onClick={() => onBuySell('sell')} className="flex-1 bg-white border-2 border-scotia-grey-200 text-scotia-grey-900 py-3.5 rounded-xl font-semibold text-[15px] cursor-pointer hover:bg-scotia-grey-50 transition-colors">
          Sell
        </button>
      </div>
    </div>
  );
}

// ─── SearchStocks ─────────────────────────────────────────────────────────────

function SearchStocks({ onSelectStock }) {
  const [query, setQuery] = useState('');
  const all = Object.entries(STOCK_DATA).map(([symbol, s]) => ({ symbol, ...s }));
  const filtered = query ? all.filter(s => s.symbol.toLowerCase().includes(query.toLowerCase()) || s.name.toLowerCase().includes(query.toLowerCase())) : all;
  const gainers = [...all].filter(s => s.change > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 3);
  const etfs = [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF',           price: 445.30, change: 1.20, changePercent: 0.27 },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust',           price: 378.65, change: 2.15, changePercent: 0.57 },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market', price: 235.80, change: 0.85, changePercent: 0.36 },
  ];

  const StockRow = ({ symbol, name, price, change, changePercent }) => (
    <button onClick={() => onSelectStock(symbol)}
      className="w-full bg-white border border-scotia-grey-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-scotia-grey-50 transition-colors cursor-pointer">
      <div className="text-left">
        <p className="text-[15px] font-bold text-scotia-grey-900">{symbol}</p>
        <p className="text-[12px] text-scotia-grey-500">{name}</p>
      </div>
      <div className="text-right">
        <p className="text-[15px] font-bold text-scotia-grey-900">${price.toFixed(2)}</p>
        <p className={`text-[13px] font-semibold ${change >= 0 ? 'text-green-600' : 'text-scotia-red'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
        </p>
      </div>
    </button>
  );

  return (
    <div className="px-4 py-5 space-y-5">
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-scotia-grey-400" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search stocks, ETFs..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-scotia-grey-200 rounded-xl text-[14px] placeholder:text-scotia-grey-400 focus:outline-none focus:border-scotia-red" />
      </div>
      <div>
        <h2 className="text-[16px] font-bold text-scotia-grey-900 mb-3">{query ? 'Results' : 'Popular Stocks'}</h2>
        <div className="space-y-2">{filtered.map(s => <StockRow key={s.symbol} {...s} />)}</div>
      </div>
      {!query && (
        <>
          <div>
            <h2 className="text-[16px] font-bold text-scotia-grey-900 mb-3">Top Gainers Today</h2>
            <div className="space-y-2">{gainers.map(s => <StockRow key={s.symbol} {...s} />)}</div>
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-scotia-grey-900 mb-3">Popular ETFs</h2>
            <div className="space-y-2">{etfs.map(s => <StockRow key={s.symbol} {...s} />)}</div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── ActivityTab ─────────────────────────────────────────────────────────────

const ACCOUNT_LABELS = { chequing: 'Chequing (7286)', savings: 'Savings (4518)', tfsa: 'TFSA (2183)' };

function ActivityTab() {
  const { tradeHistory } = useApp();

  if (tradeHistory.length === 0) {
    return (
      <div className="px-4 py-16 text-center space-y-2">
        <Activity size={36} className="text-scotia-grey-200 mx-auto" />
        <p className="text-[15px] font-semibold text-scotia-grey-700">No activity yet</p>
        <p className="text-[13px] text-scotia-grey-400">Your trades and orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-8 space-y-3">
      <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">Trade history</p>
      <div className="bg-white rounded-2xl shadow-sm border border-scotia-grey-100 overflow-hidden divide-y divide-scotia-grey-100">
        {tradeHistory.map(trade => {
          const isBuy = trade.type === 'buy';
          const time = trade.date instanceof Date
            ? trade.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '';
          const dateStr = trade.date instanceof Date
            ? trade.date.toLocaleDateString([], { month: 'short', day: 'numeric' })
            : '';
          return (
            <div key={trade.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isBuy ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isBuy
                    ? <TrendingUp size={15} className="text-green-600" />
                    : <TrendingDown size={15} className="text-scotia-red" />
                  }
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-scotia-grey-900">
                    {isBuy ? 'Bought' : 'Sold'} {trade.quantity} × {trade.symbol}
                  </p>
                  <p className="text-[11px] text-scotia-grey-400">
                    {ACCOUNT_LABELS[trade.account] ?? trade.account} · {dateStr} {time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[14px] font-bold ${isBuy ? 'text-scotia-red' : 'text-green-600'}`}>
                  {isBuy ? '-' : '+'}${trade.total.toFixed(2)}
                </p>
                <p className="text-[11px] text-scotia-grey-400">@ ${trade.price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── AccountTab ──────────────────────────────────────────────────────────────

function AccountTab() {
  const { balances } = useApp();

  const steps = [
    { label: 'Open your account', done: true },
    { label: 'Add buying power from chequing', done: balances.chequing > 0 },
    { label: 'Search for your first stock', done: false },
    { label: 'Place your first trade', done: false },
  ];

  return (
    <div className="px-4 pt-5 pb-8 space-y-4">
      {/* Account card */}
      <div className="bg-white rounded-2xl shadow-sm border border-scotia-grey-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-scotia-grey-100">
          <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">Your account</p>
        </div>
        <div className="divide-y divide-scotia-grey-100">
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[14px] text-scotia-grey-600">Account type</span>
            <span className="text-[14px] font-semibold text-scotia-grey-900">Cash Account</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[14px] text-scotia-grey-600">Account number</span>
            <span className="text-[14px] font-semibold text-scotia-grey-900">SST-00142</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[14px] text-scotia-grey-600">Buying power</span>
            <span className="text-[14px] font-semibold text-scotia-grey-900">
              ${balances.chequing.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[14px] text-scotia-grey-600">Portfolio value</span>
            <span className="text-[14px] font-semibold text-scotia-grey-900">$0.00</span>
          </div>
        </div>
      </div>

      {/* Getting started checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-scotia-grey-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-scotia-grey-100">
          <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">Getting started</p>
        </div>
        <div className="divide-y divide-scotia-grey-100">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-green-500' : 'bg-scotia-grey-100'}`}>
                {step.done
                  ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span className="text-[10px] font-bold text-scotia-grey-400">{i + 1}</span>
                }
              </div>
              <span className={`text-[14px] ${step.done ? 'text-scotia-grey-400 line-through' : 'text-scotia-grey-900'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* What you can do */}
      <div className="bg-white rounded-2xl shadow-sm border border-scotia-grey-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-scotia-grey-100">
          <p className="text-[11px] font-semibold text-scotia-grey-500 uppercase tracking-wide">What you can do</p>
        </div>
        <div className="divide-y divide-scotia-grey-100">
          {[
            { title: 'Buy & sell stocks', desc: 'Trade Canadian and US equities commission-free.' },
            { title: 'Browse ETFs', desc: 'Diversify instantly with a single purchase.' },
            { title: 'Set limit orders', desc: 'Buy or sell only at the price you choose.' },
          ].map((item) => (
            <div key={item.title} className="px-4 py-3">
              <p className="text-[14px] font-semibold text-scotia-grey-900">{item.title}</p>
              <p className="text-[12px] text-scotia-grey-500 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-scotia-grey-400 text-center leading-relaxed px-2">
        Scotia Smart Trading is provided by The Bank of Nova Scotia. Trading involves risk. Only invest what you can afford.
      </p>
    </div>
  );
}

// ─── SmartTradingScreen ───────────────────────────────────────────────────────

export default function SmartTradingScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedStock, setSelectedStock] = useState(null);
  const [buySell, setBuySell] = useState(null);

  const navItems = [
    { id: 'portfolio', icon: BarChart3, label: 'Portfolio' },
    { id: 'activity',  icon: Activity,  label: 'Activity' },
    { id: 'search',    icon: Search,    label: 'Search' },
    { id: 'account',   icon: Wallet,    label: 'Account' },
  ];

  return (
    <div className="h-full bg-scotia-grey-50 flex flex-col overflow-hidden">
      <div className="bg-scotia-red text-white px-5 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/advice')} className="p-1 -ml-1 bg-transparent border-none cursor-pointer text-white"><ChevronLeft size={22} /></button>
          <span className="text-[17px] font-semibold">Scotia Smart Trading</span>
          <button className="p-1 bg-transparent border-none cursor-pointer text-white"><Bell size={20} /></button>
        </div>
      </div>

      <div className="bg-white px-5 py-3 flex items-center justify-between border-b border-scotia-grey-100 flex-shrink-0 shadow-sm">
        <div>
          <p className="text-[12px] text-scotia-grey-700 font-medium">Scotia</p>
          <p className="text-[18px] font-bold text-scotia-red">Smart Trading</p>
        </div>
        <button className="p-2 bg-transparent border-none cursor-pointer"><Settings size={18} className="text-scotia-grey-600" /></button>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'portfolio' && !selectedStock && <PortfolioDashboard onSelectStock={setSelectedStock} onBuySell={(type, symbol) => setBuySell({ type, symbol })} />}
        {activeTab === 'search'    && !selectedStock && <SearchStocks onSelectStock={setSelectedStock} />}
        {activeTab === 'activity'  && !selectedStock && <ActivityTab />}
        {activeTab === 'account' && !selectedStock && <AccountTab />}
        {selectedStock && <StockDetail symbol={selectedStock} onBack={() => setSelectedStock(null)} onBuySell={type => setBuySell({ type, symbol: selectedStock })} />}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-scotia-grey-200 px-4 py-2 flex items-center justify-around z-20">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => { setActiveTab(id); setSelectedStock(null); }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg border-none bg-transparent cursor-pointer transition-colors ${activeTab === id ? 'text-scotia-red' : 'text-scotia-grey-500'}`}>
            <Icon size={22} /><span className="text-[11px] font-medium">{label}</span>
          </button>
        ))}
      </div>

      {buySell && <BuySellModal type={buySell.type} symbol={buySell.symbol} onClose={() => setBuySell(null)} />}
    </div>
  );
}
