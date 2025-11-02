'use client';

import { useState } from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'md:pl-20' : 'md:pl-60'}
        `}
      >
        {/* Header */}
        <Header
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          onMobileMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="p-4 md:p-6 pb-24 md:pb-6 max-w-[1600px] mx-auto overflow-y-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav onMenuClick={() => setMobileSidebarOpen(true)} />
    </div>
  );
}
