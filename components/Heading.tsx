import React from "react";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`text-xl font-bold text-neutral-700 ${className}`}>
      {children}
    </h1>
  );
};

export default Heading;
