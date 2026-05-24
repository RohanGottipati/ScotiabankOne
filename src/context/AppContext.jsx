import { createContext, useContext, useState } from 'react';
import { BALANCES, MOMENTS_HISTORY, TOTAL_FOUND_THIS_YEAR } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [balances, setBalances] = useState(BALANCES);
  const [momentConfirmed, setMomentConfirmed] = useState(false);
  const [history, setHistory] = useState(MOMENTS_HISTORY);
  const [totalFoundThisYear, setTotalFoundThisYear] = useState(TOTAL_FOUND_THIS_YEAR);

  const confirmMoment = (amount) => {
    setBalances(prev => ({
      ...prev,
      chequing: prev.chequing - amount,
      tfsa: prev.tfsa + amount,
      netWorth: prev.netWorth,
    }));

    setHistory(prev =>
      prev.map(m =>
        m.id === 'hist-001' ? { ...m, status: 'completed' } : m
      )
    );

    setTotalFoundThisYear(prev => prev + amount);
    setMomentConfirmed(true);
  };

  return (
    <AppContext.Provider value={{
      balances,
      momentConfirmed,
      history,
      totalFoundThisYear,
      confirmMoment,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
