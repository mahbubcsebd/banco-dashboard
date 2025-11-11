'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobalInput from '../global/GlobalInput';
import GlobalSelect from '../global/GlobalSelect';

const categoryOptions = [
  { value: 'All', label: 'All Categories' },
  { value: 'Utilities', label: 'Utilities' },
  { value: 'Bank/Finance', label: 'Bank/Finance' },
  { value: 'Telecom', label: 'Telecom' },
  { value: 'Other', label: 'Other' },
];

const TemplateFilter = ({ initialFilters, onFilterChange }) => {
  const [filters, setFilters] = useState(initialFilters);

  // Debounce utility function
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleFilterUpdate = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Debounced search for performance
  const debouncedSearch = debounce((value) => {
    onFilterChange({ ...filters, search: value });
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
    debouncedSearch(value);
  };

  const handleCategoryChange = (value) => {
    handleFilterUpdate({ ...filters, category: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Saved Billers
      </h2>

      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end p-4 border border-gray-200 rounded-lg bg-white">
        <GlobalSelect
          label="Biller Category"
          placeholder="Select"
          value={filters.category}
          onChange={handleCategoryChange}
          options={categoryOptions}
        />

        <div className="col-span-1 md:col-span-2">
          <GlobalInput
            label="Search"
            placeholder="Search by Name or Reference Number"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateFilter;
