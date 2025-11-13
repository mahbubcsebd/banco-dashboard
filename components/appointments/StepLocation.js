'use client';

import GlobalInput from '@/components/global/GlobalInput';
import Button from '@/components/login/Button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react'; // Added Loader2 import
import { useState } from 'react';

// Utility component to render individual branch/ATM info
const BranchItem = ({ branch, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="border-b border-gray-100 py-4 hover:bg-gray-50 transition-colors cursor-pointer px-3"
    onClick={() => onSelect(branch)}
  >
    <div
      className={`text-sm font-semibold ${
        branch.type === 'ATM' ? 'text-blue-600' : 'text-gray-900'
      }`}
    >
      Name: {branch.name} {branch.type === 'ATM' && '(ATM)'}
    </div>
    <div className="text-sm text-gray-600">Address: {branch.address}</div>
  </motion.div>
);

const StepLocation = ({ onNext, branchData }) => {
  const [searchInput, setSearchInput] = useState(''); // Holds the text in the input field
  const [searchQuery, setSearchQuery] = useState(''); // Holds the query used for actual filtering (only set on submit)
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setResults([]);
      setSearchQuery('');
      return;
    }

    const query = searchInput.trim().toLowerCase();
    setSearchQuery(query); // Set the query for display/logic
    setIsSearching(true);

    // Simulate API search filtering (Executed ONLY on form submit)
    setTimeout(() => {
      // --- 🎯 FIX: Data Filtering Logic (Partial Match) ---
      const filtered = branchData.filter((b) => {
        const address = b.address.toLowerCase();
        const name = b.name.toLowerCase();

        // Check if query is included in address or name
        return address.includes(query) || name.includes(query);
      });

      setResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    // Proceed to the next step upon selection
    onNext({ location: branch });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Location Selection
      </h3>

      {/* Search Form (Triggers handleSearch ONLY on submit) */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 items-end"
      >
        <div className="flex-1 w-full max-w-sm">
          <GlobalInput
            label="City, State or Zip Code"
            required
            placeholder="Enter city, state or zip code"
            // 🎯 FIX: Update searchInput state immediately on key press
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          loading={isSearching}
          size="default"
          className="w-full md:w-auto h-12 bg-orange-500 hover:bg-orange-600 text-white"
        >
          Search
        </Button>
      </form>

      {/* Search Results */}
      {isSearching && (
        <div className="text-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500 mx-auto" />
        </div>
      )}

      {!isSearching && searchQuery && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="border border-gray-200 rounded-lg"
        >
          {results.length > 0 ? (
            <div className="divide-y divide-gray-100 max-h-[50vh] overflow-y-auto">
              {results.map((branch) => (
                <BranchItem
                  key={branch.id}
                  branch={branch}
                  onSelect={handleBranchSelect}
                />
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500">
              No locations found matching "{searchQuery}".
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepLocation;
