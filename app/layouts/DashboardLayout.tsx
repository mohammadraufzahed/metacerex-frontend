import React from "react";
import DashboardNavbar from "~/components/DashboardNavbar";
import DashboardSidebar from "~/components/DashboardSidebar";

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header>
        <DashboardNavbar />
      </header>
      <main className="flex-auto flex flex-row w-screen bg-neutral-200">
        <DashboardSidebar />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
