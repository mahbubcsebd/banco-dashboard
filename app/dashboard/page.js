'use client';

import AccountsGrid from '@/components/dashboard/AccountsGrid';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import MobileNav from '@/components/layout/MobileNav';
import { userData } from '@/data/mockData';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Page Content */}
        <main className="">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-[20px] lg:text-2xl md:text-[28px] text-[#71717A] mb-1 lg:mb-2">
              Welcome Back,{' '}
              <span className=" font-semibold text-[#18181B]">
                {userData.name}
              </span>
            </h1>
            <p className="text-sm md:text-base text-[#71717A]">
              Manage your accounts and transactions
            </p>
          </motion.div>

          {/* Quick Actions */}
          <div className="mb-6 md:mb-8">
            <QuickActions />
          </div>
          {/* Corporate Actions */}
          {/* <div className="mb-6 md:mb-8">
            <CorporateActions />
          </div> */}
          {/* Accounts Section */}
          <div className="mb-6 md:mb-8">
            <AccountsGrid />
          </div>
          {/* Accounts Section */}
          {/* <div className="mb-6 md:mb-8">
            <UserGrid />
          </div> */}

          {/* Recent Transactions */}
          <div>
            <RecentTransactions />
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
