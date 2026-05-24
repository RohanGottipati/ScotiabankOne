const styles = {
  active: 'bg-scotia-red text-white',
  completed: 'bg-scotia-green text-white',
  pending: 'bg-scotia-red text-white',
  new: 'bg-scotia-red text-white',
  warning: 'bg-scotia-amber text-white',
};

export default function Badge({ variant = 'active', children }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
}
