'use client';

import GlobalSelect from '@/components/global/GlobalSelect';
import HeaderTop from '@/components/global/HeaderTop';
import { accounts, accountStatements } from '@/data/mockData';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';

const StatementsPage = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredStatements, setFilteredStatements] = useState([]);

  // Account options
  const accountOptions = useMemo(() => {
    return accounts.map((acc) => ({
      value: acc.accountNumber,
      label: `${acc.type} ${acc.accountNumber}`,
    }));
  }, []);

  // Year options dynamically from data
  const availableYears = useMemo(() => {
    if (!selectedAccount) return [];
    const statements = accountStatements[selectedAccount] || [];
    const years = [...new Set(statements.map((s) => s.year))];
    return years.map((year) => ({ value: year, label: year }));
  }, [selectedAccount]);

  // Handle account change
  const handleAccountChange = (value) => {
    setSelectedAccount(value);
    setSelectedYear('');
    setFilteredStatements([]);
  };

  // Handle year change
  const handleYearChange = (value) => {
    setSelectedYear(value);
    if (selectedAccount) {
      const statements = accountStatements[selectedAccount] || [];
      const filtered = statements.filter((s) => s.year === value);
      setFilteredStatements(filtered);
    }
  };

  // Filter manually (optional)
  const handleFilter = () => {
    if (!selectedAccount || !selectedYear) {
      alert('Please select both account and year');
      return;
    }
    const statements = accountStatements[selectedAccount] || [];
    const filtered = statements.filter((s) => s.year === selectedYear);
    setFilteredStatements(filtered);
  };

  // Selected account details
  const selectedAccountDetails = useMemo(() => {
    return accounts.find((acc) => acc.accountNumber === selectedAccount);
  }, [selectedAccount]);

  return (
    <div>
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
        className="bg-white rounded-xl p-4 md:p-6 mb-6 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <GlobalSelect
            label="Select Account"
            placeholder="Select an account"
            required
            value={selectedAccount}
            onChange={handleAccountChange}
            options={accountOptions}
          />

          <GlobalSelect
            label="Select Year"
            placeholder="Select a year"
            required
            value={selectedYear}
            onChange={handleYearChange}
            options={availableYears}
            disabled={!selectedAccount}
          />

          <button
            onClick={handleFilter}
            disabled={!selectedAccount || !selectedYear}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium h-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Filter
          </button>
        </div>
      </motion.div>

      {/* Account Info */}
      {/* <AnimatePresence>
        {selectedAccountDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 mb-6 border border-orange-200"
          >
            <div>
              <p className="text-sm text-orange-600 font-medium mb-1">
                Selected Account
              </p>
              <p className="text-lg font-bold text-gray-900">
                {selectedAccountDetails.accountNumber}
              </p>
              <p className="text-sm text-gray-600">
                {selectedAccountDetails.accountTitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Statements */}
      <AnimatePresence mode="wait">
        {filteredStatements.length > 0 ? (
          <motion.div
            key="statements-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredStatements.map((statement, index) => (
              <motion.div
                key={statement.month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="p-5 md:p-6 border-b border-gray-100 bg-gradient-to-br from-orange-50 to-orange-100/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {statement.month}
                      </h3>
                      <p className="text-sm text-gray-500">Account Statement</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <button
                    onClick={() =>
                      alert(`Downloading statement for ${statement.month}`)
                    }
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium text-sm shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 bg-white rounded-xl border border-gray-200"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedAccount
                ? 'No Statements Available'
                : 'Select an Account'}
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              {selectedAccount
                ? `There are no statements available for the selected year.`
                : 'Please select an account to view statements.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatementsPage;
