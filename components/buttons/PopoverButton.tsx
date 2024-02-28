import React from "react";

const PopoverButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: any;
}) => {
  return (
    <button
      className={`text-xs text-left
      text-gray-500 align-top p-2 rounded-lg 
      hover:bg-neutral-200 text-neutral-600" ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PopoverButton;
