'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const transactionTypeOptions = [
  { value: 'All', label: 'All Transaction Types' },
  {
    value: 'Between Accounts at Finxact',
    label: 'Between my Accounts at Finxact',
  }, // Image's default text
  { value: 'To Other Local Banks', label: 'To Other Local Banks' },
  { value: 'Bill Payments', label: 'Bill Payments' },
  { value: 'P2P Payments', label: 'P2P Payments' },
];

const HistoryFilterForm = ({
  initialFilters,
  onSearch,
  isSearching = false,
}) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Date From, Date To, Transaction Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date From (using GlobalInput with Calendar icon placeholder) */}
          <div className="relative">
            <GlobalInput
              label="Date From *"
              type="text" // Using text to display mm/dd/yyyy format
              placeholder="mm/dd/yyyy"
              value={filters.dateFrom}
              onChange={(e) => handleChange('dateFrom', e.target.value)}
              className="pr-10" // Make space for icon
            />
            <Calendar className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
          </div>

          {/* Date To */}
          <div className="relative">
            <GlobalInput
              label="Date To *"
              type="text"
              placeholder="mm/dd/yyyy"
              value={filters.dateTo}
              onChange={(e) => handleChange('dateTo', e.target.value)}
              className="pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -mt-1 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
          </div>

          {/* Transaction Type */}
          <GlobalSelect
            label="Transaction Type"
            placeholder="Select type"
            value={filters.transactionType}
            onChange={(value) => handleChange('transactionType', value)}
            options={transactionTypeOptions}
          />
        </div>

        {/* Row 2: Amount From, Amount To, Search Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Amount From */}
          <GlobalInput
            label="Amount From"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={filters.amountFrom}
            onChange={(e) => handleChange('amountFrom', e.target.value)}
          />

          {/* Amount To */}
          <GlobalInput
            label="Amount To"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={filters.amountTo}
            onChange={(e) => handleChange('amountTo', e.target.value)}
          />

          {/* Search Button (Takes up the last column) */}
          <Button
            variant="primary"
            type="submit"
            loading={isSearching}
            size="default"
            className="w-full h-10 md:h-12" // Adjusted height for better alignment with inputs
          >
            Search
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default HistoryFilterForm;
