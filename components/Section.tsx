import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

const section: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {children}
    </div>
  );
};

export default section;
