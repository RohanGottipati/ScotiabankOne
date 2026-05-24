export default function ConfirmationAnimation() {
  return (
    <div className="check-circle w-20 h-20 rounded-full border-3 border-scotia-green flex items-center justify-center">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          className="checkmark-path"
          d="M10 20 L17 27 L30 14"
          stroke="#2E7D32"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
