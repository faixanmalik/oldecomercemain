import React from "react";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={`text-sm font-bold mb-2 text-neutral-600 ${className}`}>
      {children}
    </h2>
  );
};

export default Title;