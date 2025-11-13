'use client';

import GlobalInput from '@/components/global/GlobalInput';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';

const BranchAtmSearch = ({ onSearch, loading, filters, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  // Toggle function for filters (allows checking/unchecking)
  const handleToggle = (type) => {
    onFilterChange({
      ...filters,
      [type]: !filters[type],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input and Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-grow w-full">
            <GlobalInput
              // Label hidden on main search bar, similar to image
              label="Enter Zip Code or City"
              placeholder="Enter Zip Code or City, State"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            type="submit"
            loading={loading}
            size="default"
            className="w-full sm:w-auto h-12 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Filter Buttons (Branches / ATMs) - Styled like the image */}
      <div className="flex space-x-6 mt-4 pt-2">
        <button
          onClick={() => handleToggle('branches')}
          className="flex items-center space-x-2 text-sm font-medium transition-colors"
        >
          <div
            className={`w-4 h-4 rounded-full border-2 transition-colors ${
              filters.branches
                ? 'bg-blue-600 border-blue-600'
                : 'border-gray-400'
            }`}
          >
            {filters.branches && (
              <div className="w-2 h-2 rounded-full bg-white mx-auto mt-[2px]" />
            )}
          </div>
          <span
            className={filters.branches ? 'text-gray-900' : 'text-gray-600'}
          >
            Branches
          </span>
        </button>

        <button
          onClick={() => handleToggle('atms')}
          className="flex items-center space-x-2 text-sm font-medium transition-colors"
        >
          <div
            className={`w-4 h-4 rounded-full border-2 transition-colors ${
              filters.atms ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
            }`}
          >
            {filters.atms && (
              <div className="w-2 h-2 rounded-full bg-white mx-auto mt-[2px]" />
            )}
          </div>
          <span className={filters.atms ? 'text-gray-900' : 'text-gray-600'}>
            ATMs
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default BranchAtmSearch;
