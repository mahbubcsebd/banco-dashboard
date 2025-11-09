// app/dashboard/accounts/[id]/statement/page.jsx
'use client';

import HeaderTop from '@/components/global/HeaderTop';
import { accounts } from '@/data/mockData';
import { motion } from 'framer-motion';
import { ChevronDown, Download, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const StatementPage = () => {
  const params = useParams();
  const accountId = parseInt(params.id);
  const account = accounts.find((acc) => acc.id === accountId);

  const [selectedAccount, setSelectedAccount] = useState(
    account?.accountNumber || ''
  );
  const [selectedYear, setSelectedYear] = useState('2025');

  if (!account) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <p className="text-center text-gray-500">Account not found</p>
      </div>
    );
  }

  const statements = [
    { month: 'October 2025', date: '2025-10-31' },
    { month: 'September 2025', date: '2025-09-30' },
    { month: 'August 2025', date: '2025-08-31' },
    { month: 'July 2025', date: '2025-07-31' },
  ];

  return (
    <div className="">
      {/* Header */}
      <HeaderTop
        title="Account Statements"
        text="View and download your account statements"
        link="/dashboard/accounts"
        linkText="Back to Accounts"
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 mb-6 border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          {/* Account Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Account <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.accountNumber}>
                    {acc.type} {acc.accountNumber} USD {acc.balance.toFixed(2)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Year Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Year <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filter Button */}
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Filter
          </button>
        </div>
      </motion.div>

      {/* Statements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {statements.map((statement, index) => (
          <motion.div
            key={statement.month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {statement.month}
                </h3>
                <p className="text-sm text-gray-500">Account Statement</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all font-medium">
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatementPage;
