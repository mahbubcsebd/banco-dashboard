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

  useEffect(() => setSelectedAccount(initialSelection), [initialSelection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAccount) onSubmit(selectedAccount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8 max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* DESKTOP HEADER */}
        <div className="hidden sm:grid grid-cols-4 font-semibold text-gray-600 border-b pb-2 text-sm uppercase">
          <span>Account</span>
          <span>Name</span>
          <span>Currency</span>
          <span className="text-center">Payroll</span>
        </div>

        <div className="divide-y sm:divide-gray-100 space-y-3 md:space-y-0">
          {accounts.map((a, index) => {
            const active = selectedAccount === a.account;

            return (
              <motion.div
                key={a.account}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, delay: index * 0.04 }}
                onClick={() => setSelectedAccount(a.account)}
                className={`
                  cursor-pointer transition-all
                  sm:grid sm:grid-cols-4 sm:items-center sm:py-3
                  px-4 py-4 rounded-xl sm:rounded-none
                  ${active ? 'bg-orange-50' : 'hover:bg-gray-50'}

                  /* MOBILE CARD LOOK */
                  sm:shadow-none sm:border-none
                  shadow-sm border border-gray-100 sm:shadow-transparent sm:border-transparent
                `}
              >
                {/* MOBILE CARD BODY */}
                <div className="sm:hidden flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100">
                    <div
                      className={`w-3 h-3 rounded-full border-2 flex items-center justify-center
                        ${active ? 'border-orange-500' : 'border-gray-400'}
                      `}
                    >
                      {active && (
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">
                      {a.account}
                    </div>
                    <div className="text-xs text-gray-500">{a.name}</div>

                    <div className="text-xs text-gray-400 mt-1">
                      Currency: {a.currency}
                    </div>
                  </div>

                  <div className="font-semibold text-orange-500 text-sm">
                    {active ? 'Selected' : ''}
                  </div>
                </div>

                {/* DESKTOP ROW BODY */}
                <div className="hidden sm:block text-sm font-medium text-gray-900">
                  {a.account}
                </div>
                <div className="hidden sm:block text-sm text-gray-700">
                  {a.name}
                </div>
                <div className="hidden sm:block text-sm text-gray-700">
                  {a.currency}
                </div>

                {/* DESKTOP RADIO */}
                <div className="hidden sm:flex justify-center">
                  <div
                    className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all
                      ${active ? 'border-orange-500' : 'border-gray-400'}
                    `}
                  >
                    {active && (
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            // size="md"
            className="text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md"
          >
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PayrollSelection;
