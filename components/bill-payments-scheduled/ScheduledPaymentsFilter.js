'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button'; // Assuming Button component is available

const statusOptions = [
  { value: 'All', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Expired', label: 'Expired' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const accountOptions = [
  { value: 'All', label: 'All Accounts' },
  { value: '110001002321', label: 'CHK 110001002321' },
  { value: '210001002551', label: 'SAV 210001002551' },
  { value: '210001002441', label: 'SAV 210001002441' },
  { value: '210001002331', label: 'SAV 210001002331' },
];

const ScheduledPaymentsFilter = ({
  initialFilters,
  onFilterChange,
  onNewPayment,
}) => {
  const [filters, setFilters] = useState(initialFilters);

  // Debounced input change for search (optional, but good for performance)
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    // If it's a select field, filter immediately
    if (field !== 'search') {
      onFilterChange(newFilters);
    }
  };

  // Debounced version for the search input
  const debouncedSearch = debounce((value) => {
    onFilterChange({ ...filters, search: value });
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    handleInputChange('search', value);
    debouncedSearch(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Upcoming Payments
        </h2>
        <Button
          variant="primary"
          onClick={onNewPayment}
          size="default"
          className="flex items-center space-x-2"
        >
          + New Payment
        </Button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end p-4 border border-gray-200 rounded-lg bg-white">
        <GlobalSelect
          label="Payment Status"
          placeholder="Select Status"
          value={filters.status}
          onChange={(value) => handleInputChange('status', value)}
          options={statusOptions}
        />

        <GlobalSelect
          label="From Account"
          placeholder="Select Account"
          value={filters.fromAccount}
          onChange={(value) => handleInputChange('fromAccount', value)}
          options={accountOptions}
        />

        <div className="col-span-1 md:col-span-2">
          <GlobalInput
            label="Search"
            placeholder="Search by Payee or Account"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduledPaymentsFilter;
