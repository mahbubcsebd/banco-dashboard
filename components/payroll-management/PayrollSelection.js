'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '../login/Button';

const PayrollSelection = ({
  accounts,
  initialSelection,
  onSubmit,
  isSubmitting = false,
}) => {
  const [selectedAccount, setSelectedAccount] = useState(initialSelection);

  // Update selectedAccount if initialSelection changes (e.g., if data is fetched later)
  useEffect(() => {
    setSelectedAccount(initialSelection);
  }, [initialSelection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAccount && onSubmit) {
      onSubmit(selectedAccount);
    } else {
      alert('Please select an account.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Table/List Header */}
        <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2 text-sm uppercase">
          <span>Account</span>
          <span>Name</span>
          <span>Currency</span>
          <span className="text-center">Payroll</span>
        </div>

        {/* Account List */}
        <div className="divide-y divide-gray-100">
          {accounts.map((account, index) => {
            const isSelected = selectedAccount === account.account;

            return (
              <motion.div
                key={account.account}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`grid grid-cols-4 py-3 items-center transition-colors duration-200 ${
                  isSelected ? 'bg-orange-50/50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAccount(account.account)}
              >
                {/* Account Number */}
                <span className="text-sm font-medium text-gray-900">
                  {account.account}
                </span>
                {/* Name */}
                <span className="text-sm text-gray-700">{account.name}</span>
                {/* Currency */}
                <span className="text-sm text-gray-700">
                  {account.currency}
                </span>

                {/* Payroll Radio Button */}
                <div className="flex justify-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-colors duration-200 ${
                      isSelected ? 'border-orange-500' : 'border-gray-400'
                    }`}
                    // Ensure the inner selection state is visually correct
                    onClick={() => setSelectedAccount(account.account)}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mx-auto mt-[2px]" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Submit Button (Orange Theme) */}
        <div className="flex justify-start pt-6">
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="lg"
            className="w-full sm:w-auto text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PayrollSelection;
