'use client';

import { motion } from 'framer-motion';

const CheckStatusResults = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-6xl mx-auto mt-8"
    >
      {/* Table Header - Matches the screenshot style */}
      <div className="grid grid-cols-3 gap-4 px-4 pb-2 border-b border-gray-200 text-sm font-bold text-gray-900 mb-4">
        <div>Check Number</div>
        <div className="text-center md:text-left">Description</div>
        <div className="text-right">AmountDate</div>
      </div>

      {/* Table Body / Empty State */}
      <div className="space-y-2">
        {!data ? (
          // Initial state or no search performed yet - keeps the area clean or can show a message
          <div className="py-8 text-center text-gray-400 text-sm italic">
            No records to display.
          </div>
        ) : data.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No check found with this number.
          </div>
        ) : (
          data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-4 px-4 py-3 bg-white border border-gray-100 rounded-lg shadow-sm items-center hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900">
                {item.checkNumber}
              </div>

              <div className="text-sm text-gray-600 text-center md:text-left">
                <div className="font-medium">{item.description}</div>
                <div className="text-xs text-gray-400">{item.status}</div>
              </div>

              <div className="text-sm text-right">
                <div className="font-bold text-gray-900">{item.amount}</div>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default CheckStatusResults;
