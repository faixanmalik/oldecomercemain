export default function TextButton({
  children,
  disabled = false,
  onClick,
  className = "",
}: {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`font-sans text-sm text-center text-blue-700 align-middle transition-all 
      rounded-lg select-none hover:underline active:bg-gray-900/20 disabled:pointer-events-none
       disabled:opacity-50 disabled:shadow-none ${className}`}
      type="button"
    >
      {children}
    </button>
  );
}
