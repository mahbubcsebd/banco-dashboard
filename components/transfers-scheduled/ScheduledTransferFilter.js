'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button'; // Assuming this Button component is available

const transferTypeOptions = [
  { value: 'All', label: 'All Transfer Types' },
  { value: 'Between Accounts at Finxact', label: 'Internal Transfers' },
  { value: 'To Other Local Banks', label: 'Local Bank Transfers' },
  { value: 'Bill Payment', label: 'Bill Payments' },
  { value: 'P2P Payments', label: 'P2P Payments' },
];

const accountOptions = [
  { value: 'All', label: 'All Accounts' },
  { value: 'CHK 110001002321', label: 'Checking Account ($5,234.50)' },
  { value: 'SAV 210001002331', label: 'Savings Account ($12,450.00)' },
  { value: 'SAV 210001002441', label: 'Savings Plus ($8,900.25)' },
];

const ScheduledTransferFilter = ({
  initialFilters,
  onFilterChange,
  onBack,
}) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 mx-auto"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Upcoming Transfers
      </h3>

      <div className="space-y-6">
        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlobalSelect
            label="Transfer Type"
            placeholder="Select"
            value={filters.transferType}
            onChange={(value) => handleChange('transferType', value)}
            options={transferTypeOptions}
          />

          <GlobalSelect
            label="From Account"
            placeholder="Select"
            value={filters.fromAccount}
            onChange={(value) => handleChange('fromAccount', value)}
            options={accountOptions}
          />
        </div>

        {/* Back Button */}
        <div className="pt-2 max-w-sm">
          <Button
            variant="primary"
            onClick={onBack}
            size="default"
            className="w-full text-sm"
          >
            Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduledTransferFilter;
