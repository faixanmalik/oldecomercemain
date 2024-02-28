import React from "react";

export default function OutlinedButtonSmall({
  disabled = false,
  children,
  onClick,
}: {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="select-none rounded-lg border border-gray-900 
      px-2.5 py-1 text-center align-middle font-sans text-xs font-bold
    text-gray-900 transition-all hover:opacity-75 focus:ring 
    focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none
      disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
      {children}
    </button>
  );
}
