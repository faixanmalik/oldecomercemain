import React from "react";
import { ReactNode } from "react";
import ShopifyHeader from "./Header";
import Sidebar from "./Sidebar";
import { SaveChangesProvider } from "@/lib/providers/SaveChangesProvider";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <SaveChangesProvider>
      <div className="w-full">
        <ShopifyHeader />
        <div className="flex min-h-screen pt-14">
          {/* Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="w-[100vw] ml-auto min-h-full md:w-[75vw] lg:w-full lg:ml-60 bg-[#f1f1f1]">
            {/* Main Content Area */}
            {children}
          </div>
        </div>
      </div>
    </SaveChangesProvider>
  );
};

export default Dashboard;
