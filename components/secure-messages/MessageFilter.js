'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const statusOptions = [
  { value: 'Inbox', label: 'Inbox' },
  { value: 'Sent', label: 'Sent' },
  { value: 'Unread', label: 'Unread' },
  { value: 'Read', label: 'Read' },
];

const categoryOptions = [
  { value: 'All Categories', label: 'All Categories' },
  { value: 'Loan', label: 'Loan' },
  { value: 'Account Inquiry', label: 'Account Inquiry' },
  { value: 'Profile Update', label: 'Profile Update' },
  { value: 'Notification', label: 'Notification' },
];

const dateRangeOptions = [
  { value: 'Select', label: 'Select' },
  { value: 'Last 7 Days', label: 'Last 7 Days' },
  { value: 'Last 30 Days', label: 'Last 30 Days' },
  { value: 'Last Year', label: 'Last Year' },
];

const MessageFilter = ({ initialFilters, onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    onClearFilters();
    setFilters({
      status: 'Inbox',
      category: 'All Categories',
      dateRange: 'Select',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
        {/* Status */}
        <GlobalSelect
          label="Status"
          placeholder="Inbox"
          value={filters.status}
          onChange={(value) => handleChange('status', value)}
          options={statusOptions}
        />

        {/* Category */}
        <GlobalSelect
          label="Category"
          placeholder="All Categories"
          value={filters.category}
          onChange={(value) => handleChange('category', value)}
          options={categoryOptions}
        />

        {/* Date Range */}
        <GlobalSelect
          label="Date Range"
          placeholder="Select"
          value={filters.dateRange}
          onChange={(value) => handleChange('dateRange', value)}
          options={dateRangeOptions}
        />

        <div className="col-span-2 md:col-span-1">
          <Button
            variant="primary"
            onClick={handleClear}
            size="default"
            className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white h-10 md:h-12"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageFilter;
