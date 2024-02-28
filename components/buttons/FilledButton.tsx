export default function FilledButton({
  children,
  onClick,
  disabled = false,
  bgClass,
  className = "",
}: {
  bgClass?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={!bgClass ? {
        backgroundImage:
          "linear-gradient(180deg, rgb(38 38 38) 0%, rgba(64, 64, 64, 0.9) 50%, rgb(38 38 38) 100%)",
      } : {}}
      className={`select-none rounded-lg ${bgClass}
      py-1 px-2 text-center align-middle font-sans text-xs border-2 border-neutral-800
      hover:border-neutral-900 focus:border-neutral-900 active:border-neutral-900
      font-medium text-white shadow-none shadow-neutral-900/10
      transition-all hover:shadow-sm hover:shadow-neutral-900/20
      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]
      active:shadow-none disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap
      disabled:shadow-none ${className}`}
      type="button"
    >
      {children}
    </button>
  );
}
