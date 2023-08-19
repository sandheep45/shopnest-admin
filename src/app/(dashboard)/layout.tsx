import React from 'react';

import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/Topbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 flex bg-[#f5f8fa] dark:bg-[#151521] transition-all duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <TopBar />
        <main className="flex flex-1 p-5 bg-gray-200 dark:bg-[#151521]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
