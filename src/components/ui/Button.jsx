import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-scotia-red text-white hover:bg-scotia-red-dark active:scale-[0.96]',
  secondary: 'bg-white text-scotia-grey-700 border border-scotia-grey-200 hover:bg-scotia-grey-50',
  ghost: 'bg-transparent text-scotia-grey-400 hover:text-scotia-grey-700',
  danger: 'bg-scotia-red text-white hover:bg-scotia-red-dark',
};

export default function Button({ variant = 'primary', fullWidth = false, loading = false, disabled = false, children, className = '', ...props }) {
  return (
    <button
      className={`
        rounded-xl py-3 px-6 font-semibold text-[15px] transition-all duration-150 cursor-pointer
        ${variants[variant]}
        ${fullWidth ? 'w-full py-4' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin mx-auto" />
      ) : (
        children
      )}
    </button>
  );
}
