import { ReactNode } from "react";

const Text = ({ children, as: Component = 'p', className = "text-neutral-500" }: { children: ReactNode, as?: any, className?: string }) => {
  return <Component className={`text-sm md:text-xs ${className}`}>{children}</Component>;
};

export default Text;
