'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '../login/Button';

const signatoryOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const ApprovalsParameters = ({
  initialParams,
  onSubmit,
  isSubmitting = false,
}) => {
  const [params, setParams] = useState(initialParams);

  const handleParamChange = (accountNumber, field, value) => {
    setParams((prev) =>
      prev.map((p) =>
        p.account === accountNumber ? { ...p, [field]: value } : p
      )
    );
  };

  const toggleMultipleSignatories = (acc, current) => {
    const updated = !current;
    handleParamChange(acc, 'requiresMultiple', updated);

    if (!updated) handleParamChange(acc, 'numSigners', 1);
    else {
      const accData = params.find((p) => p.account === acc);
      if (accData.numSigners < 2) handleParamChange(acc, 'numSigners', 2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = params.every((p) => !p.requiresMultiple || p.numSigners > 1);
    if (valid) onSubmit(params);
    else
      alert('If multiple signatories are required, minimum signers must be 2.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8 max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* DESKTOP HEADER */}
        <div className="hidden sm:grid grid-cols-4 font-semibold text-gray-600 border-b pb-2 text-sm uppercase">
          <span>Account Number</span>
          <span>Account Type</span>
          <span className="text-center">Multiple Required</span>
          <span className="text-right pr-6">Signatories</span>
        </div>

        <div className="divide-y sm:divide-gray-100 space-y-3 md:space-y-0">
          {params.map((acc, index) => {
            const allow = acc.requiresMultiple
              ? signatoryOptions.filter((o) => o.value >= 2)
              : signatoryOptions;

            const active = acc.requiresMultiple;

            return (
              <motion.div
                key={acc.account}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, delay: index * 0.04 }}
                onClick={() =>
                  toggleMultipleSignatories(acc.account, acc.requiresMultiple)
                }
                className={`
                  cursor-pointer transition-all
                  sm:grid sm:grid-cols-4 sm:items-center sm:py-3
                  px-4 py-4 rounded-xl sm:rounded-none
                  ${active ? 'bg-orange-50' : 'hover:bg-gray-50'}
                  sm:shadow-none sm:border-none
                  shadow-sm border border-gray-100 sm:shadow-transparent sm:border-transparent
                `}
              >
                {/* MOBILE CARD BODY */}
                <div className="sm:hidden flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {acc.account}
                      </div>
                      <div className="text-xs text-gray-500">{acc.type}</div>
                    </div>

                    {/* Mobile rounded radio-like checkbox */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMultipleSignatories(
                          acc.account,
                          acc.requiresMultiple
                        );
                      }}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer
                        ${active ? 'border-orange-500' : 'border-gray-400'}
                      `}
                    >
                      {active && (
                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Mobile dropdown */}
                  <select
                    value={acc.numSigners}
                    onChange={(e) =>
                      handleParamChange(
                        acc.account,
                        'numSigners',
                        Number(e.target.value)
                      )
                    }
                    className={`w-full p-2 border rounded-lg text-sm transition-all
                      ${
                        active
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 bg-white'
                      }
                    `}
                  >
                    {allow.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DESKTOP ROW */}
                <div className="hidden sm:block text-sm font-medium text-gray-900">
                  {acc.account}
                </div>
                <div className="hidden sm:block text-sm text-gray-700">
                  {acc.type}
                </div>

                {/* Desktop checkbox */}
                <div className="hidden sm:flex justify-center">
                  <div
                    onClick={() =>
                      toggleMultipleSignatories(
                        acc.account,
                        acc.requiresMultiple
                      )
                    }
                    className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 cursor-pointer
                      ${active ? 'border-orange-500' : 'border-gray-400'}
                    `}
                  >
                    {active && (
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                    )}
                  </div>
                </div>

                {/* Desktop dropdown */}
                <div className="hidden sm:flex justify-end">
                  <select
                    value={acc.numSigners}
                    onChange={(e) =>
                      handleParamChange(
                        acc.account,
                        'numSigners',
                        Number(e.target.value)
                      )
                    }
                    className={`w-20 p-2 border rounded-lg text-sm transition-all
                      ${
                        active
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 bg-white'
                      }
                    `}
                  >
                    {allow.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
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
            className="text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md"
          >
            Save
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ApprovalsParameters;
