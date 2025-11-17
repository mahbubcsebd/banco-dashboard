'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Button from '../login/Button';

// Mock options for the number of signatories
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

  // Function to update a specific account's parameter
  const handleParamChange = (accountNumber, field, value) => {
    setParams((prev) =>
      prev.map((p) =>
        p.account === accountNumber ? { ...p, [field]: value } : p
      )
    );
  };

  // Handle Radio Button Toggle
  const handleMultipleSignatoriesToggle = (accountNumber, currentValue) => {
    const newValue = !currentValue;
    handleParamChange(accountNumber, 'requiresMultiple', newValue);
    // If setting to FALSE, reset signers to 1
    if (!newValue) {
      handleParamChange(accountNumber, 'numSigners', 1);
    } else {
      // If setting to TRUE, ensure signers is at least 2
      const currentAccount = params.find((p) => p.account === accountNumber);
      if (currentAccount.numSigners < 2) {
        handleParamChange(accountNumber, 'numSigners', 2);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation (ensuring numSigners is > 1 if requiredMultiple is true)
    const valid = params.every((p) => !p.requiresMultiple || p.numSigners > 1);

    if (valid) {
      onSubmit(params);
    } else {
      alert(
        'Error: If multiple signatories are required, the number of signatories must be 2 or more.'
      );
    }
  };

  // Memoize the mapping to prevent unnecessary re-renders
  const signersMap = useMemo(
    () =>
      signatoryOptions.reduce((acc, opt) => {
        acc[opt.value] = opt.label;
        return acc;
      }, {}),
    []
  );

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
          <span>Account Number</span>
          <span>Type of Account</span>
          <span className="text-center">Multiple Signatories Required</span>
          <span className="text-right pr-6">Number of Signatories</span>
        </div>

        {/* Account List */}
        <div className="divide-y divide-gray-100">
          {params.map((account, index) => {
            // Filter options to enforce minimum 2 if multiple signers are required
            const availableSigners = account.requiresMultiple
              ? signatoryOptions.filter((opt) => opt.value >= 2)
              : signatoryOptions;

            return (
              <motion.div
                key={account.account}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`grid grid-cols-4 py-3 items-center transition-colors duration-200 hover:bg-gray-50`}
              >
                {/* 1. Account Number */}
                <span className="text-sm font-medium text-gray-900">
                  {account.account}
                </span>

                {/* 2. Type of Account */}
                <span className="text-sm text-gray-700">{account.type}</span>

                {/* 3. Multiple Signatories Required (Radio Button Toggle) */}
                <div className="flex justify-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-colors duration-200 ${
                      account.requiresMultiple
                        ? 'border-orange-500'
                        : 'border-gray-400'
                    }`}
                    onClick={() =>
                      handleMultipleSignatoriesToggle(
                        account.account,
                        account.requiresMultiple
                      )
                    }
                  >
                    {account.requiresMultiple && (
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mx-auto mt-[2px]" />
                    )}
                  </div>
                </div>

                {/* 4. Number of Signatories (Dropdown) */}
                <div className="flex justify-end">
                  <select
                    value={account.numSigners}
                    onChange={(e) =>
                      handleParamChange(
                        account.account,
                        'numSigners',
                        Number(e.target.value)
                      )
                    }
                    // Disable if only one signer is required and we don't allow multiple
                    // Note: The screenshot implies the dropdown is always enabled,
                    // but the available options change based on the radio button.
                    className={`w-20 p-2 border rounded-lg text-sm transition-all ${
                      account.requiresMultiple
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {availableSigners.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Save Button (Orange Theme) */}
        <div className="flex justify-center pt-6">
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            size="lg"
            className="w-full sm:w-auto text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md"
          >
            Save
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ApprovalsParameters;
