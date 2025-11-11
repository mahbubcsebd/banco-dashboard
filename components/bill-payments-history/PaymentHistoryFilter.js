'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';
import Button from '../login/Button';

const billerOptions = [
  { value: 'All', label: 'All Billers' },
  { value: 'HSBC Corp', label: 'HSBC Corp' },
  { value: 'Utility Co.', label: 'Utility Co.' },
  { value: 'Internet Provider', label: 'Internet Provider' },
  { value: 'Water Co', label: 'Water Co' },
];

const PaymentHistoryFilter = ({
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
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Date From, Date To, Biller, Search Button */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Date From */}
          <div className="relative">
            <GlobalInput
              label="Date From *"
              type="text"
              placeholder="mm/dd/yyyy"
              value={filters.dateFrom}
              onChange={(e) => handleChange('dateFrom', e.target.value)}
              className="pr-10"
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

          {/* Biller Select */}
          <GlobalSelect
            label="Biller"
            placeholder="Select"
            value={filters.biller}
            onChange={(value) => handleChange('biller', value)}
            options={billerOptions}
          />

          {/* Search Button */}
          <Button
            variant="primary"
            type="submit"
            loading={isSearching}
            size="default"
            className="w-full h-10 md:h-12"
          >
            Search
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentHistoryFilter;
