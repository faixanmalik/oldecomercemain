export default function OutlinedButton({
  children,
  onClick,
  disabled = false,
  props,
  className,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  props?: any;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-xs text-left font-semibold align-top border 
      py-1 shadow-sm shadow-black/50 p-2 rounded-lg
      disabled:opacity-50 disabled:cursor-not-allowed
       hover:bg-neutral-100 text-neutral-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
