import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { hasTfsa } = useApp();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(hasTfsa ? '/moment' : '/open-tfsa', { replace: true });
    }, 1800);
    return () => clearTimeout(t);
  }, [hasTfsa, navigate]);

  return (
    <div className="w-full h-full bg-scotia-red flex flex-col items-center justify-center gap-6">
      <img src="/icon.webp" alt="Scotiabank" className="w-20 h-20 object-contain" />
      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
