import React from "react";
import DashboardNavbar from "~/components/DashboardNavbar";

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header>
        <DashboardNavbar />
      </header>
      <main className="flex-auto w-screen bg-neutral-200"></main>
    </div>
  );
};

export default DashboardLayout;
